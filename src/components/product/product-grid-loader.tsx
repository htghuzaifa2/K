'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts as serverFetchProducts } from '@/app/actions';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ProductGrid } from './product-grid';

const BATCH_SIZE = 25;

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: BATCH_SIZE }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductGridLoader() {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = page + 1;
    const newProducts = await serverFetchProducts({ page: nextPage, limit: BATCH_SIZE });
    
    if (newProducts.length > 0) {
      setProducts(prev => [...prev, ...newProducts]);
      setPage(nextPage);
    }
    
    if (newProducts.length < BATCH_SIZE) {
      setHasMore(false);
    }

    setIsLoading(false);
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setIsLoading(true);
      const initialProducts = await serverFetchProducts({ page: 1, limit: BATCH_SIZE });
      setProducts(initialProducts);
      setHasMore(initialProducts.length === BATCH_SIZE);
      setPage(1);
      setIsLoading(false);
    };
    fetchInitialProducts();
  }, []);
  

  if (isLoading && products.length === 0) {
    return (
      <div className="min-h-screen">
        <ProductGridSkeleton />
      </div>
    );
  }

  return (
    <div>
      <ProductGrid products={products} />
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMoreProducts} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
