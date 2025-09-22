'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts as serverFetchProducts } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ProductGrid } from './product-grid';

const BATCH_SIZE = 25;

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
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

export function ProductGridLoader({ category }: { category?: string }) {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchAndSetProducts = useCallback(
    async (page: number, keepExisting = false) => {
      setIsLoading(true);
      const newProducts = await serverFetchProducts({ page, limit: BATCH_SIZE, category });

      setProducts((prev) => {
        const updatedProducts = keepExisting ? [...prev, ...newProducts] : newProducts;
        // Keep only the latest two batches (50 products)
        if (updatedProducts.length > BATCH_SIZE * 2) {
          return updatedProducts.slice(-BATCH_SIZE * 2);
        }
        return updatedProducts;
      });

      setHasMore(newProducts.length === BATCH_SIZE);
      setCurrentPage(page);
      setIsLoading(false);

      // Smooth scroll to the top of the grid
      if (gridRef.current && !keepExisting) {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [category]
  );

  useEffect(() => {
    // Fetch initial products
    fetchAndSetProducts(1, false);
  }, [fetchAndSetProducts, category]);

  const loadMoreProducts = () => {
    if (hasMore && !isLoading) {
      fetchAndSetProducts(currentPage + 1, true);
    }
  };

  const loadPreviousProducts = () => {
    if (currentPage > 1 && !isLoading) {
      fetchAndSetProducts(currentPage - 1, false);
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
    <div ref={gridRef}>
      {currentPage > 1 && (
        <div className="mb-8 flex justify-center">
          <Button onClick={loadPreviousProducts} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load Previous'}
          </Button>
        </div>
      )}
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
