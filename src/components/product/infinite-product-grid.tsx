
'use client';

import { useState, useEffect } from 'react';
import type { AppProduct } from '@/lib/products';
import { ProductGrid } from './product-grid';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function InfiniteProductGrid({
  initialProducts,
  loadMoreProducts,
  category,
}: {
  initialProducts: {
    products: AppProduct[];
    hasMore: boolean;
  };
  loadMoreProducts: () => Promise<void>;
  category?: string;
}) {
  const [products, setProducts] = useState(initialProducts.products);
  const [hasMore, setHasMore] = useState(initialProducts.hasMore);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProducts(initialProducts.products);
    setHasMore(initialProducts.hasMore);
  }, [initialProducts]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    await loadMoreProducts();
    setIsLoading(false);
  };
  
  return (
    <div>
      <ProductGrid products={products} />
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={handleLoadMore} disabled={isLoading} variant="outline">
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
