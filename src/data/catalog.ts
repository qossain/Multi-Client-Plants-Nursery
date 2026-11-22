import catalog from '@client-products';
import { client } from '../../core/client';

export type Category = {
  slug: string;
  title: string;
  coverImage: string;
  images: string[];
  description: string;
  basePrice: number;
  heroDesktop?: string;
  heroMobile?: string;
};

export type Plant = {
  slug: string;
  name: string;
  category: string;
  image: string;
  price?: number;
  maxPrice?: number;
  hideExampleActivity?: boolean;
  estimatedPrice?: boolean;
  originalImage?: string;
  additionalImages?: string[];
  photoVariants?: { image: string; detail: string; price?: number }[];
  detail?: string;
  example?: boolean;
};

export const heroPhoto = client.shareImage;
export const heroPhotoMobile = client.heroMobile;
export const categories: Category[] = catalog.categories;
export const plants: Plant[] = catalog.plants;

export const categoryFor = (slug: string) => categories.find((category) => category.slug === slug);
export const isShrub = (plant: Plant) => client.shrubs.includes(plant.slug);
export const plantsFor = (slug: string) => plants.filter((plant) => slug === 'shrubs' ? plant.category === slug || isShrub(plant) : plant.category === slug);
export const priceLabel = (amount: number, maxPrice?: number) => client.currencyPrefix + new Intl.NumberFormat(client.priceLocale).format(amount) + (maxPrice != null ? ' to ' + client.currencyPrefix + new Intl.NumberFormat(client.priceLocale).format(maxPrice) : '');
