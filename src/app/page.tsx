import Hero from '@/components/hero';
import { ProductGridLoader } from '@/components/product/product-grid-loader';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          New Arrivals
        </h2>
        <Suspense fallback={<p>Loading products...</p>}>
          <ProductGridLoader />
        </Suspense>
      </div>
    </div>
  );
}
