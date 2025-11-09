
import type { Product as RawProduct, ProductImage } from '@/lib/types';
import productsData from './products.json';
import { unstable_cache as cache } from 'next/cache';

// This is the shape of the product object used throughout the app.
export type AppProduct = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    category: string;
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
        category: Array.isArray(product.category) ? product.category[0] : product.category,
        images: product.images,
        longDescription: product.longDescription,
        specifications: product.specifications
    };
}

// Cached function to read and transform products.
// This will only re-run if the underlying products.json file changes in development,
// or on a new deployment in production.
const getTransformedProducts = cache(
  async () => {
    console.log('Reading and transforming products.json');
    const rawProducts = productsData as RawProduct[];
    return rawProducts.map(transformProduct);
  },
  ['products_data']
);

export async function getProducts(): Promise<AppProduct[]> {
  return await getTransformedProducts();
}

export async function getProductBySlug(slug: string): Promise<AppProduct | null> {
  const products = await getTransformedProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductsByCategory(category: string): Promise<AppProduct[]> {
  const products = await getTransformedProducts();
  const lowerCaseCategory = category.toLowerCase();
  return products.filter((p) => {
      const productCategory = Array.isArray(p.category) ? p.category : [p.category];
      return productCategory.some(c => c.toLowerCase() === lowerCaseCategory);
  });
}

export async function getProductsByNames(names: string[]): Promise<AppProduct[]> {
  const products = await getTransformedProducts();
  const lowerCaseNames = names.map(name => name.toLowerCase());
  return products.filter(p => lowerCaseNames.includes(p.name.toLowerCase()));
}

export async function getAllCategories(): Promise<string[]> {
    const products = await getTransformedProducts();
    const categories = new Set(products.flatMap(p => p.category));
    return Array.from(categories);
}
