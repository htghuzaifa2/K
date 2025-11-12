
'use client';

import { Suspense, useEffect, useState } from 'react';
import Hero from '@/components/hero';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from './actions';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { ScrollRestorer } from '@/components/scroll-restorer';
import { AppProduct } from '@/lib/products';

// This is a client-side rendered page
export default function Home() {
  const [initialProducts, setInitialProducts] = useState<{ products: AppProduct[], hasMore: boolean, total: number } | null>(null);

  useEffect(() => {
    // Fetch initial products on the client.
    fetchProducts({ page: 1, limit: 25, shuffle: true }).then(data => {
      setInitialProducts(data);
    });
  }, []);

  return (
    <div>
      <ScrollRestorer sessionKey="home_scroll" />
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          {initialProducts ? (
            <InfiniteProductGrid initialProducts={initialProducts} />
          ) : (
            <ProductGridSkeleton />
          )}
        </Suspense>
      </div>
    </div>
  );
}
