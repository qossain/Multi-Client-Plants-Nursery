import { defineConfig } from 'astro/config';
import { resolve } from 'node:path';
import { loadClient } from './core/client-config.mjs';

if (process.env.CLIENT && process.env.CLIENT !== 'usman') throw new Error('This application only builds usman.');
process.env.CLIENT = 'usman';
const client = loadClient('usman');

export default defineConfig({
  site: client.config.site,
  publicDir: resolve(client.directory, 'images'),
  vite: { resolve: { alias: { '@client-products': resolve(client.directory, 'products.json'), '@client-reviews': resolve(client.directory, 'reviews.json'), '@client-services': resolve(client.directory, 'services.json'), '@client-config': resolve(client.directory, 'config.json'), '@client-home-data': resolve(client.directory, 'homepage.json'), '@client-theme': resolve('core/themes', `${client.config.theme}.css`), '@client-home': resolve('core/layouts', client.config.layout === 'working-row-preview' ? 'WorkingRowPreview.astro' : 'LegacyHome.astro') } } },
  output: 'static',
  compressHTML: true,
});
