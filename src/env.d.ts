declare module '@client-products' {
  const catalog: { categories: import('./data/catalog').Category[]; plants: import('./data/catalog').Plant[] };
  export default catalog;
}
