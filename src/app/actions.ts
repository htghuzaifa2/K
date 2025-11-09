
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
  limit = 25, // Updated limit to 25
  category,
  shuffle: doShuffle = false,
  allProducts: providedProducts,
}: {
  page?: number;
  limit?: number;
  category?: string;
  shuffle?: boolean;
  allProducts?: AppProduct[];
}) {
  let allProducts = providedProducts;

  if (!allProducts) {
    allProducts = category ? await getProductsByCategory(category) : await getProducts();
  }

  if (doShuffle) {
    allProducts = shuffle(allProducts);
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const products = allProducts.slice(start, end);
  
  return {
    products,
    hasMore: allProducts.length > end,
    total: allProducts.length,
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

export async function searchProducts(query: string): Promise<AppProduct[]> {
    const allProducts = await getProducts();
    if (!query) {
        return [];
    }

    const lowerCaseQuery = query.toLowerCase();

    // Rule 1: ID Search (string contains)
    const idResults = allProducts.filter(p => p.id.toString().includes(lowerCaseQuery));
    
    // Rule 2: Title Search
    let titleResults: AppProduct[] = [];

    // Tier A: Exact word match
    const queryWords = lowerCaseQuery.split(' ').filter(w => w);
    const exactWordMatches = allProducts.filter(p => {
      const titleWords = p.name.toLowerCase().split(' ');
      return queryWords.every(qw => titleWords.includes(qw));
    });
    titleResults.push(...exactWordMatches);


    // Tier B: Starts-with
    if (titleResults.length < 10) {
      const startsWithMatches = allProducts.filter(p => p.name.toLowerCase().startsWith(lowerCaseQuery));
      startsWithMatches.forEach(swm => {
        if(!titleResults.some(r => r.id === swm.id)) {
          titleResults.push(swm);
        }
      });
    }

    // Tier C: Includes
    if (titleResults.length < 10) {
        const includesResults = allProducts.filter(p => p.name.toLowerCase().includes(lowerCaseQuery));
        includesResults.forEach(ir => {
            if (!titleResults.some(r => r.id === ir.id)) {
                titleResults.push(ir);
            }
        });
    }

    // Combine results, giving priority to ID matches, then title matches
    const combinedResults = [...idResults];
    titleResults.forEach(tr => {
        if (!combinedResults.some(r => r.id === tr.id)) {
            combinedResults.push(tr);
        }
    });

    return combinedResults.slice(0, 50); // Return a max of 50 results
}
