
'use client';

import { Suspense, useEffect, useState } from 'react';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from '@/app/actions';
import type { AppProduct } from '@/lib/products';

export default function AllProductsPage() {
  const [initialProducts, setInitialProducts] = useState<{ products: AppProduct[], hasMore: boolean, total: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts({ page: 1, limit: 25 });
        setInitialProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        {isLoading || !initialProducts ? (
          <p>Loading...</p>
        ) : (
          <InfiniteProductGrid initialProducts={initialProducts} />
        )}
      </Suspense>
    </div>
  );
}
