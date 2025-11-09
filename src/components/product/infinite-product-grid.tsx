
'use client';

import { useState, useEffect } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts } from '@/app/actions';
import { ProductGrid } from './product-grid';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const PRODUCTS_PER_PAGE = 25; // Updated to 25
const MAX_PRODUCTS = 75; // Cap at 75

export function InfiniteProductGrid({ initialProducts, category }: {
  initialProducts: {
    products: AppProduct[];
    hasMore: boolean;
    total: number;
  };
  category?: string;
}) {
  const [products, setProducts] = useState(initialProducts.products);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialProducts.hasMore && initialProducts.products.length < MAX_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreProducts = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    const { products: newProducts, hasMore: newHasMore } = await fetchProducts({
      page: nextPage,
      limit: PRODUCTS_PER_PAGE,
      category,
    });
    
    setProducts((prev) => {
        const updatedProducts = [...prev, ...newProducts];
        if (updatedProducts.length >= MAX_PRODUCTS) {
            setHasMore(false);
            return updatedProducts.slice(0, MAX_PRODUCTS);
        }
        setHasMore(newHasMore);
        return updatedProducts;
    });

    setPage(nextPage);
    setIsLoading(false);
  };
  
  useEffect(() => {
    // Reset products when category or initial products change
    setProducts(initialProducts.products);
    setPage(1);
    setHasMore(initialProducts.hasMore && initialProducts.products.length < MAX_PRODUCTS);
  }, [category, initialProducts]);

  return (
    <div>
      <ProductGrid products={products} />
      {hasMore && (
        <div className="mt-8 flex justify-center">
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
