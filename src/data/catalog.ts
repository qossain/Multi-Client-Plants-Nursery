import catalog from '@client-products';

export type Category = {
  slug: string;
  title: string;
  coverImage: string;
  images: string[];
  description: string;
  basePrice: number;
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

export const heroPhoto = '/hero-legacy-desktop.webp';
export const heroPhotoMobile = '/hero-rooftop-mobile.webp';
export const categories: Category[] = catalog.categories;
export const plants: Plant[] = catalog.plants;

export const categoryFor = (slug: string) => categories.find((category) => category.slug === slug);
export const isShrub = (plant: Plant) => ['outdoor-murraya', 'outdoor-duranta-gold', 'outdoor-ixora', 'outdoor-hibiscus', 'outdoor-oleander', 'outdoor-lantana', 'outdoor-pittosporum', 'outdoor-gardenia'].includes(plant.slug);
export const plantsFor = (slug: string) => plants.filter((plant) => slug === 'shrubs' ? isShrub(plant) : plant.category === slug);
export const priceLabel = (amount: number, maxPrice?: number) => 'Rs ' + new Intl.NumberFormat('en-PK').format(amount) + (maxPrice ? ' to Rs ' + new Intl.NumberFormat('en-PK').format(maxPrice) : '');
