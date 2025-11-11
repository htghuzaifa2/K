
'use server';

import type { AppProduct } from '@/lib/products';
import { getProducts, getProductsByCategory } from '@/lib/products';
import productsSummaryData from '@/lib/products-summary.json';
import { performSearch } from '@/lib/search-utils';

type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: {
    url: string;
    altText: string;
  }
};


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

export async function fetchProductsSummary(currentProductId?: string, limit: number = 4) {
    let otherProducts = productsSummaryData;

    if (currentProductId) {
        otherProducts = productsSummaryData.filter(p => p.id !== currentProductId);
    }
    
    const shuffled = shuffle(otherProducts);
    const summaryList = shuffled.slice(0, limit);

    // We need to transform the summary into the shape expected by ProductCard
    return summaryList.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        images: [p.image],
        // Add dummy values for fields not in summary
        description: '',
        category: [],
    }));
}


export async function searchProducts(query: string): Promise<AppProduct[]> {
    if (!query) {
        return [];
    }
    const allProducts = await getProducts();
    // In `search-utils.ts` the `title` property is used for searching.
    // We map product `name` to `title` to make it compatible.
    const searchableProducts = allProducts.map(p => ({ ...p, title: p.name }));
    
    return performSearch(query, searchableProducts).slice(0, 50); // Return a max of 50 results
}
