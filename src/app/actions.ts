
'use server';

import type { AppProduct } from '@/lib/products';
import { getProducts, getProductsByCategory } from '@/lib/products';

// Fisher-Yates shuffle algorithm
function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export async function fetchProducts({
  page = 1,
  limit = 8,
  category,
  shuffle: doShuffle = false,
}: {
  page?: number;
  limit?: number;
  category?: string;
  shuffle?: boolean;
}) {
  let allProducts = category ? await getProductsByCategory(category) : await getProducts();

  if (doShuffle) {
    allProducts = shuffle(allProducts);
  }

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
            !categoryProducts.some(cp => cp.id === p.id) &&
            p.id !== currentProductId
        );
        
        const shuffledOthers = otherProducts.sort(() => 0.5 - Math.random());
        
        const needed = limit - related.length;
        related.push(...shuffledOthers.slice(0, needed));
    }
    
    return related.slice(0, limit);
}
