
'use server';

import type { AppProduct } from '@/lib/products';
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
  return {
    products,
    hasMore: allProducts.length > end,
  };
}


export async function fetchAllProductsForSearch() {
  return getProducts();
}

export async function fetchRelatedProductsData(category: string, currentProductId: string, limit: number) {
    const categoryProducts = await getProductsByCategory(category);
    let related = categoryProducts.filter(p => p.id !== currentProductId);

    if (related.length < limit) {
        const allProducts = await getProducts();
        const otherProducts = allProducts.filter(p => 
            p.category.toLowerCase() !== category.toLowerCase() && 
            p.id !== currentProductId
        );
        
        const shuffledOthers = otherProducts.sort(() => 0.5 - Math.random());
        
        const needed = limit - related.length;
        related.push(...shuffledOthers.slice(0, needed));
    }
    
    return related.slice(0, limit);
}
