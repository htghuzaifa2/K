import type { Product } from '@/lib/types';
import productsData from './products.json';

// Simulate an async API call
async function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData as Product[]);
    }, 500); // 500ms delay
  });
}

export async function getProducts(): Promise<Product[]> {
  const products = await fetchProducts();
  // Sort by newest first
  return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getProductsByNames(names: string[]): Promise<Product[]> {
  const products = await getProducts();
  const lowerCaseNames = names.map(name => name.toLowerCase());
  return products.filter(p => lowerCaseNames.includes(p.name.toLowerCase()));
}

export async function getAllCategories(): Promise<string[]> {
    const products = await getProducts();
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories);
}
