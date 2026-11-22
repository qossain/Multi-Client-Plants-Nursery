declare module '@client-products' {
  const catalog: { categories: import('./data/catalog').Category[]; plants: import('./data/catalog').Plant[] };
  export default catalog;
}
declare module '@client-reviews' {
  const reviews: { name: string; initials: string; category: string; source: string; summary: string }[];
  export default reviews;
}
