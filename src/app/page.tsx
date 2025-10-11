
import { getProducts } from '@/lib/products';
import { Suspense } from 'react';
import Hero from '@/components/hero';
import { InfiniteWindowedGrid } from '@/components/product/infinite-windowed-grid';
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


export default async function Home() {
  const allProducts = await getProducts();
  const shuffledProducts = shuffle(allProducts);
  const initialProducts = await fetchProducts({ allProducts: shuffledProducts, page: 1, limit: 25 });

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<p>Loading products...</p>}>
          <InfiniteWindowedGrid allProducts={shuffledProducts} initialProducts={initialProducts.products} />
        </Suspense>
      </div>
    </div>
  );
}

