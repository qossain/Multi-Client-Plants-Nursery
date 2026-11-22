import { heroVariants, productCardVariants } from './manifest.mjs';

const modules = import.meta.glob('./*.astro', { eager: true, import: 'default' });
export const heroes = Object.fromEntries(Object.entries(heroVariants).map(([key, file]) => [key, modules[`./${file}`]]));
export const productCards = Object.fromEntries(Object.entries(productCardVariants).map(([key, file]) => [key, modules[`./${file}`]]));
