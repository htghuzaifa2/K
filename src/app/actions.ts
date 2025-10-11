
'use server';

import type { AppProduct } from '@/lib/products';
import { getProducts, getProductsByCategory } from '@/lib/products';

export async function fetchProducts({
  page = 1,
  limit = 8,
  category,
  allProducts: providedProducts,
}: {
  page?: number;
  limit?: number;
  category?: string;
  allProducts?: AppProduct[];
}) {
  const allProducts = providedProducts || (category ? await getProductsByCategory(category) : await getProducts());
  const start = (page - 1) * limit;
  const end = start + limit;
  const products = allProducts.slice(start, end);
  return {
    products,
    hasMore: allProducts.length > end,
    newHasMore: allProducts.length > end,
  };
}
