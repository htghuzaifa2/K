
import type { Product as RawProduct, ProductImage } from '@/lib/types';
import productsData from './products.json';

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


// Simulate an async API call
async function fetchProductsData(): Promise<RawProduct[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData as RawProduct[]);
    }, 100); // 100ms delay, faster than before
  });
}

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

export async function getProducts(): Promise<AppProduct[]> {
  const products = await fetchProductsData();
  return products.map(transformProduct);
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
