export interface ProductConfig {
  id: string;
  component: string;
}

export const productsConfig: ProductConfig[] = [
  {
    id: "automation-platform",
    component: "AutomationPlatformArticle",
  },
];

export const getProductById = (id: string): ProductConfig | undefined =>
  productsConfig.find((product) => product.id === id);
