
import { Suspense } from 'react';
import Hero from '@/components/hero';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from './actions';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { ScrollRestorer } from '@/components/scroll-restorer';

// This is an async Server Component
export default async function Home() {
  // Fetch initial products on the server for a fast initial load.
  const initialProducts = await fetchProducts({ page: 1, limit: 25, shuffle: true });

  return (
    <div>
      <ScrollRestorer sessionKey="home_scroll" />
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <InfiniteProductGrid initialProducts={initialProducts} />
        </Suspense>
      </div>
    </div>
  );
}
