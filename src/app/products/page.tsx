'use client';

import { Suspense, useEffect, useState } from 'react';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from '@/app/actions';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { ScrollRestorer } from '@/components/scroll-restorer';
import { AppProduct } from '@/lib/products';

export default function AllProductsPage() {
  const [initialProducts, setInitialProducts] = useState<{ products: AppProduct[], hasMore: boolean, total: number } | null>(null);

  useEffect(() => {
    fetchProducts({ page: 1, limit: 25 }).then(data => {
      setInitialProducts(data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ScrollRestorer sessionKey="all_products_scroll" />
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        {initialProducts ? (
          <InfiniteProductGrid initialProducts={initialProducts} />
        ) : (
          <ProductGridSkeleton />
        )}
      </Suspense>
    </div>
  );
}
