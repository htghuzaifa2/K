'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts as serverFetchProducts } from '@/app/actions';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'framer-motion';

const BATCH_SIZE = 8;

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  const [isLoading, setIsLoading] = useState(true); // Start with loading true for initial fetch
  const ref = useRef(null);
  const isInView = useInView(ref);

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const newProducts = await serverFetchProducts({ page: page + 1, limit: BATCH_SIZE });
    
    if (newProducts.length > 0) {
      setProducts((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);
    }
    
    if (newProducts.length < BATCH_SIZE) {
      setHasMore(false);
    }

    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    async function getInitialProducts() {
        setIsLoading(true);
        const initialProducts = await serverFetchProducts({ page: 1, limit: BATCH_SIZE });
        setProducts(initialProducts);
        if (initialProducts.length < BATCH_SIZE) {
          setHasMore(false);
        }
        setIsLoading(false);
    }
    getInitialProducts();
  }, []);

  useEffect(() => {
    // Only trigger loadMore if it's not the initial load
    if (isInView && !isLoading) {
      loadMoreProducts();
    }
  }, [isInView, isLoading, loadMoreProducts]);

  return (
    <div className="min-h-[100vh]">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div ref={ref} className="mt-8 h-10 w-full">
        {hasMore && (
          <ProductGridSkeleton />
        )}
      </div>
       {!hasMore && products.length > 0 && (
         <p className="mt-8 text-center text-muted-foreground">You&apos;ve reached the end!</p>
       )}
    </div>
  );
}
