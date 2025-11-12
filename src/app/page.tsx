
'use client';

import { Suspense } from 'react';
import Hero from '@/components/hero';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { useProducts } from '@/hooks/use-products';

export default function Home() {
  const { products, hasMore, isLoading, loadMoreProducts } = useProducts({ limit: 25, shuffle: true });

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          {isLoading && products.length === 0 ? (
            <ProductGridSkeleton />
          ) : (
            <InfiniteProductGrid 
              initialProducts={{ products, hasMore, total: 0 }}
              loadMoreProducts={loadMoreProducts}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
