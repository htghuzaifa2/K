
import { getProducts } from '@/lib/products';
import type { NextRequest } from 'next/server';
import { fetchProducts } from './actions';

// Fisher-Yates shuffle algorithm
function shuffle(array: any[]) {
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

export default async function loader(request: NextRequest) {
  const allProducts = await getProducts();
  const shuffled = shuffle(allProducts);
  
  // Directly slice the first page of products from the shuffled array
  const start = 0;
  const limit = 12;
  const end = start + limit;
  const products = shuffled.slice(start, end);
  const hasMore = shuffled.length > end;
  
  const initial = { products, hasMore };

  const url = request.nextUrl;
  url.searchParams.set('initialProducts', JSON.stringify(initial));
  return Response.redirect(url);
}
