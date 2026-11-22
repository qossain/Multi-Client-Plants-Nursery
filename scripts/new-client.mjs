import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeKeys } from '../core/variants/manifest.mjs';

const themes = themeKeys;
export async function createClient({ slug, name, phone, theme, layout }) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Slug must use lowercase letters, digits and single hyphens.');
  if (!name?.trim()) throw new Error('Name is required.');
  if (!/^\+\d{7,15}$/.test(phone)) throw new Error('Phone must use international format, for example +923126047941.');
  if (!themes.includes(theme)) throw new Error(`Theme must be one of: ${themes.join(', ')}.`);
  if (!['legacy', 'catalog'].includes(layout)) throw new Error('Layout must be legacy or catalog.');
  const template = resolve('scripts/client-template');
  const directory = resolve('clients', slug);
  await mkdir(directory);
  await cp(template, directory, { recursive: true, force: false, errorOnExist: true });
  await cp(resolve('core/assets/fonts'), resolve(directory, 'images/fonts'), { recursive: true });
  const config = JSON.parse(await readFile(resolve(directory, 'config.json'), 'utf8'));
  Object.assign(config, { name, fullName: name, shortName: name, brandName: name, brandTitle: name.toUpperCase(), phone, whatsapp: phone.slice(1), displayPhone: phone, site: `https://${slug}.example.invalid`, theme, layout, hero: theme, footerDescription: name, homeTitle: name, homeDescription: `Explore plants from ${name}.`, heroTitle: `Welcome to ${name}` });
  await writeFile(resolve(directory, 'config.json'), JSON.stringify(config, null, 2) + '\n');
  return directory;
}

async function main() {
  const input = createInterface({ input: stdin, output: stdout });
  try {
    const slug = (await input.question('Client slug: ')).trim();
    const name = (await input.question('Nursery name: ')).trim();
    const phone = (await input.question('Phone with country code (for example +923126047941): ')).trim();
    const theme = (await input.question(`Theme (${themes.join(', ')}): `)).trim();
    const layout = (await input.question('Layout (catalog or legacy): ')).trim();
    const directory = await createClient({ slug, name, phone, theme, layout });
    console.log(`Created ${directory}. Replace the placeholder domain and images, add products and review all content before publishing.`);
  } finally {
    input.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
