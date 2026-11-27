import { existsSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { heroVariants, productCardVariants, themeKeys } from './variants/manifest.mjs';

export function loadClient(slug) {
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('CLIENT must be a client slug containing lowercase letters, numbers and hyphens.');
  }
  const directory = resolve('clients', slug);
  let config, catalog, reviews, services;
  try {
    config = JSON.parse(readFileSync(resolve(directory, 'config.json'), 'utf8'));
    catalog = JSON.parse(readFileSync(resolve(directory, 'products.json'), 'utf8'));
    reviews = JSON.parse(readFileSync(resolve(directory, 'reviews.json'), 'utf8'));
    services = JSON.parse(readFileSync(resolve(directory, 'services.json'), 'utf8'));
  } catch (error) {
    throw new Error(`Cannot read client ${slug}: ${error.message}`);
  }
  if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error(`Client ${slug}: config.json must be an object.`);
  const copyKeys = Object.keys(JSON.parse(readFileSync(resolve('scripts/client-template/config.json'), 'utf8')).copy);
  if (!config.copy || typeof config.copy !== 'object' || Array.isArray(config.copy) || copyKeys.some((key) => typeof config.copy[key] !== 'string' || !config.copy[key].trim())) throw new Error(`Client ${slug}: copy is missing required labels.`);
  if (!realpathSync(directory).startsWith(realpathSync(resolve('clients')) + sep)) throw new Error(`Client ${slug}: client folder must be inside clients.`);
  for (const key of ['name', 'fullName', 'shortName', 'brandName', 'brandTitle', 'brandSubtitle', 'footerSubtitle', 'footerDescription', 'phone', 'whatsapp', 'displayPhone', 'orderMessage', 'heroMessage', 'site', 'homeTitle', 'homeDescription', 'heroTitle', 'heroEmphasis', 'heroDescription', 'heroDesktop', 'heroMobile', 'shareImage', 'logo', 'favicon', 'theme', 'layout', 'hero', 'productCard']) {
    if (typeof config[key] !== 'string' || !config[key].trim()) throw new Error(`Client ${slug}: ${key} must be a nonempty string.`);
  }
  if (!config.orderMessage.includes('{product}')) throw new Error(`Client ${slug}: orderMessage must contain {product}.`);
  for (const key of ['email', 'address', 'locality', 'region', 'country', 'maps', 'instagram', 'facebook', 'visitLabel', 'storyLocation', 'storyFact', 'currencyPrefix', 'priceLocale']) {
    if (typeof config[key] !== 'string') throw new Error(`Client ${slug}: ${key} must be a string.`);
  }
  try { new Intl.NumberFormat(config.priceLocale); } catch { throw new Error(`Client ${slug}: invalid price locale.`); }
  for (const key of ['maps', 'instagram', 'facebook']) {
    if (config[key]) {
      try { if (new URL(config[key]).protocol !== 'https:') throw new Error(); }
      catch { throw new Error(`Client ${slug}: ${key} must be an HTTPS URL.`); }
    }
  }
  if (config.tiktok != null && config.tiktok !== '') {
    try { if (typeof config.tiktok !== 'string' || new URL(config.tiktok).protocol !== 'https:') throw new Error(); }
    catch { throw new Error(`Client ${slug}: tiktok must be an HTTPS URL.`); }
  }
  if (config.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) throw new Error(`Client ${slug}: invalid email.`);
  if (!themeKeys.includes(config.theme)) throw new Error(`Client ${slug}: unknown theme ${config.theme}.`);
  if (!['legacy', 'catalog', 'working-row-preview'].includes(config.layout)) throw new Error(`Client ${slug}: unknown layout ${config.layout}.`);
  if (config.layout === 'working-row-preview' && process.env.VERCEL_ENV === 'production' && config.allowPreviewProduction !== true) throw new Error(`Client ${slug}: the unfinished Working Row preview cannot be deployed to production.`);
  if (config.layout === 'working-row-preview' && (!config.workingRow || !config.business || typeof config.business.whatsappConfirmed !== 'boolean' || ['ground', 'ink', 'deep', 'hessian', 'accent', 'tape', 'lightAccent'].some((key) => !/^#[0-9a-f]{6}$/i.test(config.workingRow[key] || '')) || ['specimenName', 'exploreLabel', 'sectionNote', 'sectionTitle', 'tagLabel', 'enquiryLabel'].some((key) => typeof config.workingRow[key] !== 'string' || !config.workingRow[key].trim()))) throw new Error(`Client ${slug}: invalid Working Row preview settings.`);
  if (config.layout === 'working-row-preview' && ['stockStatus', 'stockLastUpdated', 'responseTimePromise'].some((key) => {
    const field = config.business[key];
    return !field || typeof field.confirmed !== 'boolean' || (field.value !== null && typeof field.value !== 'string');
  })) throw new Error(`Client ${slug}: invalid owner-confirmed fields.`);
  if (!Object.hasOwn(heroVariants, config.hero)) throw new Error(`Client ${slug}: unknown hero ${config.hero}.`);
  if (!Object.hasOwn(productCardVariants, config.productCard)) throw new Error(`Client ${slug}: unknown product card ${config.productCard}.`);
  if (!/^\+\d{7,15}$/.test(config.phone) || !/^\d{7,15}$/.test(config.whatsapp)) throw new Error(`Client ${slug}: phone and WhatsApp must use international digits.`);
  try {
    let site = new URL(config.site);
    if (site.hostname.endsWith('.invalid') && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
      if (!/^[a-z0-9.-]+$/i.test(host)) throw new Error();
      site = new URL(`https://${host}`);
      config.site = site.origin;
    }
    if (site.protocol !== 'https:' || site.username || site.password || site.pathname !== '/' || site.search || site.hash) throw new Error();
    if (process.env.VERCEL_ENV === 'production' && site.hostname.endsWith('.invalid')) throw new Error();
  } catch {
    throw new Error(`Client ${slug}: site must be an HTTPS origin; a production build requires a real domain.`);
  }
  for (const key of ['sections', 'featured', 'shrubs', 'awards']) {
    if (!Array.isArray(config[key]) || config[key].some((value) => typeof value !== 'string' || !value)) throw new Error(`Client ${slug}: ${key} must be an array of nonempty strings.`);
  }
  if (new Set(config.sections).size !== config.sections.length || config.sections.some((id) => !['hero', 'about', 'categories', 'services', 'featured', 'testimonials', 'contact'].includes(id))) throw new Error(`Client ${slug}: invalid or duplicate section.`);
  if (!Number.isInteger(config.founded) || config.founded < 0 || config.founded > new Date().getUTCFullYear() || (config.sections.includes('about') && config.founded === 0)) throw new Error(`Client ${slug}: founded must be a valid year when the about section is enabled.`);
  for (const key of ['reviewCount', 'clientCount']) {
    if (!Number.isSafeInteger(config[key]) || config[key] < 0) throw new Error(`Client ${slug}: ${key} must be a nonnegative integer.`);
  }
  if (!catalog || !Array.isArray(catalog.categories) || !Array.isArray(catalog.plants)) throw new Error(`Client ${slug}: products.json must contain categories and plants arrays.`);
  if (!Array.isArray(reviews) || !Array.isArray(services)) throw new Error(`Client ${slug}: reviews and services must be arrays.`);
  const imageRoot = resolve(directory, 'images');
  if (!existsSync(imageRoot)) throw new Error(`Client ${slug}: images folder is missing.`);
  const realImageRoot = realpathSync(imageRoot);
  if (!realImageRoot.startsWith(realpathSync(directory) + sep)) throw new Error(`Client ${slug}: images must be inside the client folder.`);
  const asset = (value) => {
    if (typeof value !== 'string' || !/^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(value) || value.split('/').includes('..')) throw new Error(`Client ${slug}: missing or invalid image ${value}.`);
    const file = resolve(imageRoot, value.slice(1));
    if (!existsSync(file) || !statSync(file).isFile() || !realpathSync(file).startsWith(realImageRoot + sep)) throw new Error(`Client ${slug}: missing or invalid image ${value}.`);
  };
  for (const image of [config.heroDesktop, config.heroMobile, config.shareImage, config.logo, config.favicon]) asset(image);
  const ids = new Set();
  for (const category of catalog.categories) {
    if (!category || typeof category.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.slug) || ids.has(category.slug) || typeof category.title !== 'string' || !category.title || typeof category.description !== 'string' || !Array.isArray(category.images)) throw new Error(`Client ${slug}: invalid or duplicate category.`);
    ids.add(category.slug);
    asset(category.coverImage);
    if (category.heroDesktop) asset(category.heroDesktop);
    if (category.heroMobile) asset(category.heroMobile);
    for (const image of category.images) asset(image);
  }
  const plantIds = new Set();
  for (const plant of catalog.plants) {
    if (!plant || typeof plant.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(plant.slug) || plantIds.has(plant.slug) || typeof plant.name !== 'string' || !plant.name || !ids.has(plant.category)) throw new Error(`Client ${slug}: invalid or duplicate plant.`);
    plantIds.add(plant.slug);
    if (plant.price != null && (typeof plant.price !== 'number' || !Number.isFinite(plant.price) || plant.price < 0)) throw new Error(`Client ${slug}: invalid price for ${plant.slug}.`);
    if (plant.maxPrice != null && (typeof plant.maxPrice !== 'number' || !Number.isFinite(plant.maxPrice) || plant.maxPrice < 0 || (plant.price != null && plant.maxPrice < plant.price))) throw new Error(`Client ${slug}: invalid maximum price for ${plant.slug}.`);
    if ((plant.additionalImages != null && !Array.isArray(plant.additionalImages)) || (plant.photoVariants != null && (!Array.isArray(plant.photoVariants) || plant.photoVariants.length === 0 || plant.photoVariants.some((photo) => !photo || typeof photo.image !== 'string' || (photo.price != null && (typeof photo.price !== 'number' || !Number.isFinite(photo.price) || photo.price < 0)))))) throw new Error(`Client ${slug}: invalid image list for ${plant.slug}.`);
    asset(plant.image);
    for (const image of [plant.originalImage, ...(plant.additionalImages ?? []), ...(plant.photoVariants ?? []).map((photo) => photo.image)].filter(Boolean)) asset(image);
  }
  for (const id of config.featured) if (!plantIds.has(id)) throw new Error(`Client ${slug}: unknown featured plant ${id}.`);
  for (const review of reviews) if (!review || ['name', 'initials', 'category', 'source', 'summary'].some((key) => typeof review[key] !== 'string')) throw new Error(`Client ${slug}: invalid review.`);
  for (const service of services) {
    if (!service || ['title', 'description', 'image', 'link', 'action'].some((key) => typeof service[key] !== 'string' || !service[key])) throw new Error(`Client ${slug}: invalid service.`);
    asset(service.image);
    try {
      const url = new URL(service.link, 'https://local.invalid');
      if (url.protocol !== 'https:' || url.username || url.password || (service.link.startsWith('/') && url.origin !== 'https://local.invalid')) throw new Error();
    } catch { throw new Error(`Client ${slug}: invalid service link.`); }
  }
  return { config, directory };
}
