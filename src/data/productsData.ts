import productsDataJson from './productsData.json';

export interface Product {
  id: number;
  name: string;
  image: string | string[]; // Updated to support multiple images
  category: string;
  description: string;
  minOrder: string;
  price: string;
  purity?: string;
  stoneType?: string;
  features?: string[];
  availableSizes?: string;
  sku?: string;
  makingCharges?: string;
  wastage?: string;
  weightRange?: string;
  seoDescription?: string;
}

export const productsData: Product[] = productsDataJson;
