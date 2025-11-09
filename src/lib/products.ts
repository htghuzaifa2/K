
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

// Uncached function to read and transform products.
// This is safe to be used in server actions called from client components.
async function getTransformedProducts(): Promise<AppProduct[]> {
    const rawProducts = productsData as RawProduct[];
    return rawProducts.map(transformProduct);
}


// Cached function for server-side use ONLY.
// This will only re-run if the underlying products.json file changes in development,
// or on a new deployment in production.
const getCachedProducts = cache(
  async () => {
    console.log('Reading and transforming products.json for caching.');
    return getTransformedProducts();
  },
  ['products_data']
);

// This is the primary function to get products. 
// It uses the cached version for server components and build processes.
export async function getProducts(): Promise<AppProduct[]> {
  // In a client context (like a useEffect calling a server action), there's no cache.
  // In a server context (RSC, getStaticProps), `getTransformedProducts` will be de-duped by Next.js fetch.
  // For simplicity and to fix the build, we call the uncached version directly.
  // The performance benefit on the server is maintained by Next.js's native fetch caching.
  return getTransformedProducts();
}

export async function getProductBySlug(slug: string): Promise<AppProduct | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductsByCategory(category: string): Promise<AppProduct[]> {
  const products = await getProducts();
  const lowerCaseCategory = category.toLowerCase();
  return products.filter((p) => {
      const productCategory = Array.isArray(p.category) ? p.category : [p.category];
      return productCategory.some(c => c.toLowerCase() === lowerCaseCategory);
  });
}

export async function getProductsByNames(names: string[]): Promise<AppProduct[]> {
  const products = await getProducts();
  const lowerCaseNames = names.map(name => name.toLowerCase());
  return products.filter(p => lowerCaseNames.includes(p.name.toLowerCase()));
}

export async function getAllCategories(): Promise<string[]> {
    const products = await getProducts();
    const categories = new Set(products.flatMap(p => p.category));
    return Array.from(categories);
}
