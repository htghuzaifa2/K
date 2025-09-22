'use server';

import { getProducts } from '@/lib/products';

export async function fetchProducts({ page = 1, limit = 8 }: { page?: number, limit?: number }) {
  const allProducts = await getProducts();
  const start = (page - 1) * limit;
  const end = start + limit;
  const products = allProducts.slice(start, end);
  return products;
}
