import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function loadClient(slug) {
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('CLIENT must be a client slug containing lowercase letters, numbers and hyphens.');
  }
  if (slug !== 'abdul-jabbar') throw new Error('Other clients are not yet supported: client content isolation is incomplete.');
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
  for (const key of ['name', 'fullName', 'shortName', 'brandName', 'brandTitle', 'brandSubtitle', 'footerSubtitle', 'footerDescription', 'phone', 'whatsapp', 'displayPhone', 'email', 'address', 'locality', 'region', 'country', 'maps', 'instagram', 'facebook', 'visitLabel', 'site', 'homeTitle', 'homeDescription', 'heroTitle', 'heroEmphasis', 'heroDescription', 'heroDesktop', 'heroMobile', 'shareImage', 'storyLocation', 'storyFact', 'theme', 'layout', 'hero', 'productCard']) {
    if (typeof config[key] !== 'string' || !config[key].trim()) throw new Error(`Client ${slug}: ${key} must be a nonempty string.`);
  }
  if (!['legacy', 'rare-aroids', 'family-garden-center', 'unkillable-urban', 'biophilic-commercial', 'desert-xeriscaping'].includes(config.theme)) throw new Error(`Client ${slug}: unknown theme ${config.theme}.`);
  if (!['legacy', 'catalog'].includes(config.layout)) throw new Error(`Client ${slug}: unknown layout ${config.layout}.`);
  if (!['legacy', 'rare-aroids', 'family-garden-center', 'unkillable-urban', 'biophilic-commercial', 'desert-xeriscaping'].includes(config.hero)) throw new Error(`Client ${slug}: unknown hero ${config.hero}.`);
  if (!['legacy', 'rounded'].includes(config.productCard)) throw new Error(`Client ${slug}: unknown product card ${config.productCard}.`);
  if (!/^\+\d{7,15}$/.test(config.phone) || !/^\d{7,15}$/.test(config.whatsapp)) throw new Error(`Client ${slug}: phone and WhatsApp must use international digits.`);
  try {
    if (new URL(config.site).protocol !== 'https:') throw new Error();
  } catch {
    throw new Error(`Client ${slug}: site must be an HTTPS URL.`);
  }
  for (const key of ['sections', 'featured', 'shrubs', 'awards']) {
    if (!Array.isArray(config[key]) || config[key].some((value) => typeof value !== 'string' || !value)) throw new Error(`Client ${slug}: ${key} must be an array of nonempty strings.`);
  }
  if (new Set(config.sections).size !== config.sections.length || config.sections.some((id) => !['hero', 'about', 'categories', 'services', 'featured', 'testimonials'].includes(id))) throw new Error(`Client ${slug}: invalid or duplicate section.`);
  if (!Number.isInteger(config.founded) || config.founded < 1 || config.founded > new Date().getUTCFullYear()) throw new Error(`Client ${slug}: founded must be a valid year.`);
  for (const key of ['reviewCount', 'clientCount']) {
    if (!Number.isSafeInteger(config[key]) || config[key] < 0) throw new Error(`Client ${slug}: ${key} must be a nonnegative integer.`);
  }
  if (!catalog || !Array.isArray(catalog.categories) || !Array.isArray(catalog.plants)) throw new Error(`Client ${slug}: products.json must contain categories and plants arrays.`);
  if (!Array.isArray(reviews) || !Array.isArray(services)) throw new Error(`Client ${slug}: reviews and services must be arrays.`);
  const asset = (value) => {
    if (typeof value !== 'string' || !/^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(value) || value.split('/').includes('..') || !existsSync(resolve(directory, 'images', value.slice(1)))) throw new Error(`Client ${slug}: missing or invalid image ${value}.`);
  };
  for (const image of [config.heroDesktop, config.heroMobile, config.shareImage]) asset(image);
  const ids = new Set();
  for (const category of catalog.categories) {
    if (!category || typeof category.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.slug) || ids.has(category.slug) || typeof category.title !== 'string' || !category.title || typeof category.description !== 'string' || !Array.isArray(category.images)) throw new Error(`Client ${slug}: invalid or duplicate category.`);
    ids.add(category.slug);
    asset(category.coverImage);
    for (const image of category.images) asset(image);
  }
  const plantIds = new Set();
  for (const plant of catalog.plants) {
    if (!plant || typeof plant.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(plant.slug) || plantIds.has(plant.slug) || typeof plant.name !== 'string' || !plant.name || !ids.has(plant.category)) throw new Error(`Client ${slug}: invalid or duplicate plant.`);
    plantIds.add(plant.slug);
    if (plant.price != null && (typeof plant.price !== 'number' || !Number.isFinite(plant.price) || plant.price < 0)) throw new Error(`Client ${slug}: invalid price for ${plant.slug}.`);
    for (const image of [plant.image, plant.originalImage, ...(plant.additionalImages ?? []), ...(plant.photoVariants ?? []).map((photo) => photo.image)].filter(Boolean)) asset(image);
  }
  for (const id of config.featured) if (!plantIds.has(id)) throw new Error(`Client ${slug}: unknown featured plant ${id}.`);
  for (const review of reviews) if (!review || ['name', 'initials', 'category', 'source', 'summary'].some((key) => typeof review[key] !== 'string')) throw new Error(`Client ${slug}: invalid review.`);
  for (const service of services) {
    if (!service || ['title', 'description', 'image', 'link', 'action'].some((key) => typeof service[key] !== 'string' || !service[key])) throw new Error(`Client ${slug}: invalid service.`);
    asset(service.image);
    if (!service.link.startsWith('/') && !/^https:\/\//.test(service.link)) throw new Error(`Client ${slug}: invalid service link.`);
  }
  return { config, directory };
}
