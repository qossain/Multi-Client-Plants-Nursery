import { defineConfig } from 'astro/config';

if (process.env.VERCEL_ENV === 'production') {
  throw new Error('Abdulrehman site is an unfinished local scaffold and cannot be deployed to production.');
}

export default defineConfig({ output: 'static' });
