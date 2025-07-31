import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

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

export const fetchProductsData = async (): Promise<Product[]> => {
  const productsCollection = collection(db, 'products');
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id, // Use Firestore document ID as the unique identifier
    ...doc.data(),
  })) as unknown as Product[];
};
