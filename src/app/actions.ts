
'use server';

import { getProducts, getProductsByCategory } from '@/lib/products';
import type { AppProduct } from '@/lib/products';

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array: AppProduct[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export async function fetchShuffledProducts() {
  const allProducts = await getProducts();
  return shuffle(allProducts);
}

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
