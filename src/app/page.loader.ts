
import { getProducts } from '@/lib/products';
import { fetchProducts } from './actions';
import type { NextRequest } from 'next/server';

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
  const initial = await fetchProducts({ allProducts: shuffled, page: 1, limit: 12 });

  const url = request.nextUrl;
  url.searchParams.set('initialProducts', JSON.stringify(initial));
  return Response.redirect(url);
}
