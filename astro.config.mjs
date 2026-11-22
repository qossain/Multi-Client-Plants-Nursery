import { defineConfig } from 'astro/config';
import { resolve } from 'node:path';
import { loadClient } from './core/client-config.mjs';

const client = loadClient(process.env.CLIENT);

export default defineConfig({
  site: client.config.site,
  publicDir: resolve(client.directory, 'images'),
  vite: { resolve: { alias: { '@client-products': resolve(client.directory, 'products.json'), '@client-reviews': resolve(client.directory, 'reviews.json'), '@client-services': resolve(client.directory, 'services.json'), '@client-config': resolve(client.directory, 'config.json') } } },
  output: 'static',
  compressHTML: true,
});
