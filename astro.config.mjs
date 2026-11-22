import { defineConfig } from 'astro/config';
import { resolve } from 'node:path';
import { loadClient } from './core/client-config.mjs';

const client = loadClient(process.env.CLIENT);

export default defineConfig({
  site: client.config.site,
  vite: { resolve: { alias: { '@client-products': resolve(client.directory, 'products.json') } } },
  output: 'static',
  compressHTML: true,
});
