'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts as serverFetchProducts } from '@/app/actions';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

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
  const [isLoading, setIsLoading] = useState(false);

  const loadProducts = useCallback(async (pageToLoad: number) => {
    setIsLoading(true);
    const newProducts = await serverFetchProducts({ page: pageToLoad, limit: BATCH_SIZE });
    
    setProducts(newProducts);
    setPage(pageToLoad);
    
    // Simple check to see if there are more products
    const moreProductsCheck = await serverFetchProducts({ page: pageToLoad + 1, limit: 1 });
    setHasMore(moreProductsCheck.length > 0);
    
    setIsLoading(false);
    window.scrollTo(0, 0); // Scroll to top on page change
  }, []);

  useEffect(() => {
    loadProducts(1);
  }, [loadProducts]);

  const handlePrevious = () => {
    if (page > 1) {
      loadProducts(page - 1);
    }
  };

  const handleNext = () => {
    if (hasMore) {
      loadProducts(page + 1);
    }
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="min-h-screen">
        <ProductGridSkeleton />
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <Button onClick={handlePrevious} disabled={page <= 1 || isLoading}>
          Load Previous
        </Button>
        <Button onClick={handleNext} disabled={!hasMore || isLoading}>
          Load More
        </Button>
      </div>
    </div>
  );
}
