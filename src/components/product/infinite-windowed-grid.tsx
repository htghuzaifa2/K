
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts } from '@/app/actions';
import { ProductGrid } from './product-grid';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const BATCH_SIZE = 25;
const MAX_PRODUCTS_IN_DOM = 55;

type InfiniteWindowedGridProps = {
  initialProducts: AppProduct[];
  allProducts: AppProduct[];
};

export function InfiniteWindowedGrid({ initialProducts, allProducts }: InfiniteWindowedGridProps) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(allProducts.length > initialProducts.length);
  const [startIndexInAll, setStartIndexInAll] = useState(0);

  const { ref: topRef, inView: topInView } = useInView({ threshold: 0 });
  const { ref: bottomRef, inView: bottomInView } = useInView({ threshold: 0 });

  const loadMoreProducts = useCallback(async (direction: 'next' | 'prev') => {
    if (isLoading) return;
    
    if (direction === 'next' && hasMore) {
        setIsLoading(true);
        const nextPage = page + 1;
        const { products: newProducts, hasMore: newHasMore } = await fetchProducts({ allProducts, page: nextPage, limit: BATCH_SIZE });
        
        setProducts(prev => {
            const combined = [...prev, ...newProducts];
            const uniqueIds = new Set();
            const uniqueProducts = combined.filter(p => {
              if (uniqueIds.has(p.id)) {
                return false;
              }
              uniqueIds.add(p.id);
              return true;
            });

            let updatedProducts = uniqueProducts;
            if (updatedProducts.length > MAX_PRODUCTS_IN_DOM && newHasMore) {
                const toRemove = updatedProducts.length - MAX_PRODUCTS_IN_DOM;
                updatedProducts = updatedProducts.slice(toRemove);
                setStartIndexInAll(prevIdx => prevIdx + toRemove);
            }
            return updatedProducts;
        });
        
        setPage(nextPage);
        setHasMore(newHasMore);
        setIsLoading(false);

    } else if (direction === 'prev' && startIndexInAll > 0) {
        setIsLoading(true);
        const newStartIndex = Math.max(0, startIndexInAll - BATCH_SIZE);
        const productsToPrepend = allProducts.slice(newStartIndex, startIndexInAll);

        setProducts(prev => {
            const combined = [...productsToPrepend, ...prev];
            const uniqueIds = new Set();
            const uniqueProducts = combined.filter(p => {
              if (uniqueIds.has(p.id)) {
                return false;
              }
              uniqueIds.add(p.id);
              return true;
            });

            let updatedProducts = uniqueProducts;
            if (updatedProducts.length > MAX_PRODUCTS_IN_DOM) {
                 updatedProducts = updatedProducts.slice(0, MAX_PRODUCTS_IN_DOM);
            }
            return updatedProducts;
        });

        setStartIndexInAll(newStartIndex);
        setIsLoading(false);
    }
  }, [isLoading, hasMore, page, startIndexInAll, allProducts]);

  useEffect(() => {
    if (bottomInView && !isLoading) {
      loadMoreProducts('next');
    }
  }, [bottomInView, isLoading, loadMoreProducts]);

  useEffect(() => {
    if (topInView && !isLoading) {
      loadMoreProducts('prev');
    }
  }, [topInView, isLoading, loadMoreProducts]);

  return (
    <div>
      <div ref={topRef} className="h-1" />
      <ProductGrid products={products} />
      <div ref={bottomRef} className="h-1" />
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <span>Loading Products...</span>
        </div>
      )}
    </div>
  );
}
