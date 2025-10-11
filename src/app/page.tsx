
import { Suspense } from 'react';
import Hero from '@/components/hero';
import { fetchShuffledProducts } from '@/app/actions';
import { WindowedProductGrid } from '@/components/product/windowed-product-grid';


export default async function Home() {
  const allProducts = await fetchShuffledProducts();

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<p>Loading products...</p>}>
          <WindowedProductGrid allProducts={allProducts} />
        </Suspense>
      </div>
    </div>
  );
}
