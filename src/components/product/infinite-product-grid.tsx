
'use client';

import { useState, useEffect } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts } from '@/app/actions';
import { ProductGrid } from './product-grid';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const PRODUCTS_PER_PAGE = 25;

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

  const loadMoreProducts = async () => {
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


  return (
    <div>
      <ProductGrid products={products} />
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMoreProducts} disabled={isLoading}>
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
