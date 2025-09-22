'use server';

import { getProducts, getProductsByCategory } from '@/lib/products';

export async function fetchProducts({
  page = 1,
  limit = 8,
  category,
}: {
  page?: number;
  limit?: number;
  category?: string;
}) {
  const allProducts = category ? await getProductsByCategory(category) : await getProducts();
  const start = (page - 1) * limit;
  const end = start + limit;
  const products = allProducts.slice(start, end);
  return products;
}
