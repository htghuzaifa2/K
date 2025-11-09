
'use client';

import { useState, useEffect } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts } from '@/app/actions';
import { ProductGrid } from './product-grid';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const PRODUCTS_PER_PAGE = 12;

type InfiniteProductGridProps = {
  initialProducts: {
    products: AppProduct[];
    hasMore: boolean;
  };
  category?: string;
};

export function InfiniteProductGrid({ initialProducts, category }: InfiniteProductGridProps) {
  const [products, setProducts] = useState(initialProducts.products);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialProducts.hasMore);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });

  const loadMoreProducts = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    const { products: newProducts, hasMore: newHasMore } = await fetchProducts({
      page: nextPage,
      limit: PRODUCTS_PER_PAGE,
      category,
    });
    setProducts((prev) => [...prev, ...newProducts]);
    setPage(nextPage);
    setHasMore(newHasMore);
    setIsLoading(false);
  };
  
  useEffect(() => {
    // Reset products when category changes
    setProducts(initialProducts.products);
    setPage(1);
    setHasMore(initialProducts.hasMore);
  }, [category, initialProducts]);

  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreProducts();
    }
  }, [inView, isLoading, loadMoreProducts]);


  return (
    <div>
      <ProductGrid products={products} />
      {hasMore && (
        <div ref={ref} className="mt-8 flex justify-center">
          <Button onClick={loadMoreProducts} disabled={isLoading} variant="outline">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
