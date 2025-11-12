
'use client';

import { Suspense } from 'react';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { useProducts } from '@/hooks/use-products';

export default function AllProductsPage() {
  const { products, hasMore, isLoading, loadMoreProducts } = useProducts({ limit: 25 });

  return (
    <div className="container mx-auto px-4 py-8 sm_px-6 lg_px_8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
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
  );
}
