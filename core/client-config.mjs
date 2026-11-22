import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function loadClient(slug) {
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('CLIENT must be a client slug containing lowercase letters, numbers and hyphens.');
  }
  if (slug !== 'abdul-jabbar') throw new Error('Other clients are not yet supported: client content isolation is incomplete.');
  const directory = resolve('clients', slug);
  let config;
  try {
    config = JSON.parse(readFileSync(resolve(directory, 'config.json'), 'utf8'));
    JSON.parse(readFileSync(resolve(directory, 'products.json'), 'utf8'));
  } catch (error) {
    throw new Error(`Cannot read client ${slug}: ${error.message}`);
  }
  for (const key of ['name', 'phone', 'whatsapp', 'site', 'theme', 'layout', 'hero', 'productCard']) {
    if (typeof config[key] !== 'string' || !config[key].trim()) throw new Error(`Client ${slug}: ${key} must be a nonempty string.`);
  }
  if (!/^\+\d{7,15}$/.test(config.phone) || !/^\d{7,15}$/.test(config.whatsapp)) throw new Error(`Client ${slug}: phone and WhatsApp must use international digits.`);
  try {
    if (new URL(config.site).protocol !== 'https:') throw new Error();
  } catch {
    throw new Error(`Client ${slug}: site must be an HTTPS URL.`);
  }
  if (!Array.isArray(config.sections) || config.sections.some((section) => typeof section !== 'string')) throw new Error(`Client ${slug}: sections must be an array of strings.`);
  return { config, directory };
}
