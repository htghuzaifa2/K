import type { Product as RawProduct, ProductImage } from '@/lib/types';
import productsData from './products.json';

// This is the shape of the product object used throughout the app.
export type AppProduct = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    category: string | string[];
    images: ProductImage[];
    longDescription?: string;
    specifications?: Record<string, string>;
};

function transformProduct(product: RawProduct): AppProduct {
    return {
        id: product.id.toString(),
        slug: product.slug,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        images: product.images,
        longDescription: product.longDescription,
        specifications: product.specifications
    };
}

// This is the primary function to get products. 
// It reads the local JSON file and transforms the data.
// NOTE: This is a direct synchronous function to avoid build issues with static hosting.
export function getProducts(): AppProduct[] {
    const rawProducts = Array.isArray(productsData) ? productsData : [];
    return rawProducts.map(transformProduct);
}

export function getProductBySlug(slug: string): AppProduct | null {
  const products = getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export function getProductsByCategory(category: string): AppProduct[] {
  const products = getProducts();
  const lowerCaseCategory = category.toLowerCase();
  return products.filter((p) => {
      const productCategory = Array.isArray(p.category) ? p.category : [p.category];
      return productCategory.some(c => c.toLowerCase() === lowerCaseCategory);
  });
}

export function getProductsByNames(names: string[]): AppProduct[] {
  const products = getProducts();
  const lowerCaseNames = names.map(name => name.toLowerCase());
  return products.filter(p => lowerCaseNames.includes(p.name.toLowerCase()));
}

export function getAllCategories(): string[] {
    const products = getProducts();
    const categories = new Set(products.flatMap(p => Array.isArray(p.category) ? p.category : [p.category]));
    return Array.from(categories);
}
