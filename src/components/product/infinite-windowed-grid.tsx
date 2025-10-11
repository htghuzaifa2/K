
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts } from '@/app/actions';
import { ProductGrid } from './product-grid';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const BATCH_SIZE = 25;
const MAX_PRODUCTS = 55; // Roughly 2 batches (25*2) + some buffer

type InfiniteWindowedGridProps = {
  initialProducts: AppProduct[];
  allProducts: AppProduct[];
};

export function InfiniteWindowedGrid({ initialProducts, allProducts }: InfiniteWindowedGridProps) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(allProducts.length > BATCH_SIZE);
  
  const [startIndex, setStartIndex] = useState(0);

  const { ref: topRef, inView: topInView } = useInView();
  const { ref: bottomRef, inView: bottomInView } = useInView();

  const loadMoreProducts = useCallback(async (direction: 'next' | 'prev') => {
    if (isLoading) return;
    setIsLoading(true);

    if (direction === 'next' && hasMore) {
        const nextPage = page + 1;
        const { products: newProducts, hasMore: newHasMore } = await fetchProducts({ allProducts, page: nextPage, limit: BATCH_SIZE });

        setProducts(prev => {
            const combined = [...prev, ...newProducts];
            if (combined.length > MAX_PRODUCTS) {
                const unloadedCount = combined.length - MAX_PRODUCTS;
                setStartIndex(prevIndex => prevIndex + unloadedCount);
                return combined.slice(unloadedCount);
            }
            return combined;
        });

        setPage(nextPage);
        setHasMore(newHasMore);

    } else if (direction === 'prev' && startIndex > 0) {
        const newStartIndex = Math.max(0, startIndex - BATCH_SIZE);
        const productsToPrepend = allProducts.slice(newStartIndex, startIndex);
        
        setProducts(prev => {
            const combined = [...productsToPrepend, ...prev];
            const newEndIndex = newStartIndex + combined.length;
            if(newEndIndex > startIndex + MAX_PRODUCTS) {
                 const sliceIndex = newEndIndex - (startIndex + MAX_PRODUCTS);
                 return combined.slice(0, combined.length - sliceIndex);
            }
            return combined;

        });
        setStartIndex(newStartIndex);
    }

    // A small delay to allow UI to update before resetting loading state
    setTimeout(() => setIsLoading(false), 100);
  }, [isLoading, hasMore, allProducts, page, startIndex]);

  useEffect(() => {
    if (bottomInView && !isLoading && hasMore) {
      loadMoreProducts('next');
    }
  }, [bottomInView, isLoading, hasMore, loadMoreProducts]);

  useEffect(() => {
    if (topInView && !isLoading && startIndex > 0) {
      loadMoreProducts('prev');
    }
  }, [topInView, isLoading, startIndex, loadMoreProducts]);

  return (
    <div>
      <div ref={topRef} style={{ height: 1 }} />
      <ProductGrid products={products} />
      <div ref={bottomRef} style={{ height: 1 }} />
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <span>Loading Products...</span>
        </div>
      )}
    </div>
  );
}
