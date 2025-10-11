
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { AppProduct } from '@/lib/products';
import { fetchProducts } from '@/app/actions';
import { ProductGrid } from './product-grid';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  const [showLoadPrevious, setShowLoadPrevious] = useState(false);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const { ref: bottomRef, inView: bottomInView } = useInView({ threshold: 0 });

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY.current && currentScrollY > 200 && startIndexInAll > 0) {
      setShowLoadPrevious(true);
    } else {
      setShowLoadPrevious(false);
    }
    lastScrollY.current = currentScrollY;
  }, [startIndexInAll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    const { products: newProducts, hasMore: newHasMore } = await fetchProducts({ allProducts, page: nextPage, limit: BATCH_SIZE });
    
    setProducts(prev => {
        const uniqueNewProducts = newProducts.filter(np => !prev.some(p => p.id === np.id));
        let updatedProducts = [...prev, ...uniqueNewProducts];
        if (updatedProducts.length > MAX_PRODUCTS_IN_DOM && newHasMore) {
            const toRemove = updatedProducts.length - MAX_PRODUCTS_IN_DOM;
            
            const firstKeptElement = gridRef.current?.children[0]?.children[toRemove];
            const oldOffsetTop = (firstKeptElement as HTMLElement)?.offsetTop ?? 0;

            updatedProducts = updatedProducts.slice(toRemove);
            setStartIndexInAll(prevIdx => prevIdx + toRemove);

            requestAnimationFrame(() => {
                if (gridRef.current?.children[0]?.children[0]) {
                    const newOffsetTop = (gridRef.current.children[0].children[0] as HTMLElement)?.offsetTop ?? 0;
                    const scrollAdjustment = newOffsetTop - oldOffsetTop;
                    if(scrollAdjustment > 0){
                        window.scrollBy(0, -scrollAdjustment);
                    }
                }
            });
        }
        return updatedProducts;
    });
    
    setPage(nextPage);
    setHasMore(newHasMore);
    setIsLoading(false);

  }, [isLoading, hasMore, page, allProducts]);

  const loadPreviousProducts = useCallback(async () => {
      if (isLoading || startIndexInAll === 0) return;

      setIsLoading(true);
      const newStartIndex = Math.max(0, startIndexInAll - BATCH_SIZE);
      const productsToPrepend = allProducts.slice(newStartIndex, startIndexInAll);

      setProducts(prev => {
          const uniqueProductsToPrepend = productsToPrepend.filter(p => !prev.some(pp => pp.id === p.id));
          let updatedProducts = [...uniqueProductsToPrepend, ...prev];
          if (updatedProducts.length > MAX_PRODUCTS_IN_DOM) {
               updatedProducts = updatedProducts.slice(0, MAX_PRODUCTS_IN_DOM);
          }
          return updatedProducts;
      });

      setStartIndexInAll(newStartIndex);
      setIsLoading(false);
      setShowLoadPrevious(false);
  }, [isLoading, startIndexInAll, allProducts]);

  useEffect(() => {
    if (bottomInView && !isLoading) {
      loadMoreProducts();
    }
  }, [bottomInView, isLoading, loadMoreProducts]);

  return (
    <div>
       <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 transition-all duration-300">
         <Button
            onClick={loadPreviousProducts}
            className={cn(
                'transition-all duration-300 shadow-lg',
                showLoadPrevious ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20 pointer-events-none'
            )}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : (
                'Load Previous'
            )}
        </Button>
      </div>

      <div ref={gridRef}>
        <ProductGrid products={products} />
      </div>

      <div ref={bottomRef} className="h-1" />

      {isLoading && hasMore && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="mr-2 h-8 w-8 animate-spin" />
          <span>Loading More Products...</span>
        </div>
      )}
    </div>
  );
}
