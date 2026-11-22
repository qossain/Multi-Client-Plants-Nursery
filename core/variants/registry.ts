import HeroLegacy from './Hero.Legacy.astro';
import HeroRareAroids from './Hero.RareAroids.astro';
import HeroFamilyGardenCenter from './Hero.FamilyGardenCenter.astro';
import HeroUnkillableUrban from './Hero.UnkillableUrban.astro';
import HeroBiophilicCommercial from './Hero.BiophilicCommercial.astro';
import HeroDesertXeriscaping from './Hero.DesertXeriscaping.astro';
import ProductCardLegacy from './ProductCard.Legacy.astro';
import ProductCardRounded from './ProductCard.Rounded.astro';

export const heroes = {
  legacy: HeroLegacy,
  'rare-aroids': HeroRareAroids,
  'family-garden-center': HeroFamilyGardenCenter,
  'unkillable-urban': HeroUnkillableUrban,
  'biophilic-commercial': HeroBiophilicCommercial,
  'desert-xeriscaping': HeroDesertXeriscaping,
};
export const productCards = { legacy: ProductCardLegacy, rounded: ProductCardRounded };
