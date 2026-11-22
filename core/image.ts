import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export function responsiveImage(image: string) {
  if (!image.startsWith('/plant-images/')) return image;
  const optimized = image.replace('/plant-images/', '/plant-images/optimized/');
  return existsSync(resolve('clients', process.env.CLIENT!, 'images', optimized.slice(1))) ? optimized : image;
}
