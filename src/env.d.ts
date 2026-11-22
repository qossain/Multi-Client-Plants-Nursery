declare module '@client-products' {
  const catalog: { categories: import('./data/catalog').Category[]; plants: import('./data/catalog').Plant[] };
  export default catalog;
}
declare module '@client-reviews' {
  const reviews: { name: string; initials: string; category: string; source: string; summary: string }[];
  export default reviews;
}
declare module '@client-config' {
  const config: import('../core/client').ClientConfig;
  export default config;
}
declare module '@client-services' {
  const services: { title: string; description: string; image: string; link: string; action: string }[];
  export default services;
}
