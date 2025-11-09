
'use client';

import { Suspense, useState, useEffect } from 'react';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from '@/app/actions';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import type { AppProduct } from '@/lib/products';

type InitialProductsState = {
  products: AppProduct[];
  hasMore: boolean;
  total: number;
} | null;

export default function AllProductsPage() {
  const [initialProducts, setInitialProducts] = useState<InitialProductsState>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitial() {
      try {
        const productsResult = await fetchProducts({ page: 1, limit: 25 });
        setInitialProducts(productsResult);
      } catch (error) {
        console.error("Failed to fetch initial products", error);
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        {loading || !initialProducts ? (
          <ProductGridSkeleton />
        ) : (
          <InfiniteProductGrid initialProducts={initialProducts} />
        )}
      </Suspense>
    </div>
  );
}
