
'use client';

import { useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
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

type GridHandle = {
  loadPrevious: () => Promise<void>;
};

export const InfiniteWindowedGrid = forwardRef<GridHandle, InfiniteWindowedGridProps>(({ initialProducts, allProducts }, ref) => {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(allProducts.length > initialProducts.length);
  const [startIndexInAll, setStartIndexInAll] = useState(0);
  
  const gridRef = useRef<HTMLDivElement>(null);

  const { ref: bottomRef, inView: bottomInView } = useInView({ threshold: 0 });

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
      setPage(prev => Math.max(1, prev - (productsToPrepend.length / BATCH_SIZE) ));
      setIsLoading(false);
  }, [isLoading, startIndexInAll, allProducts]);

  useImperativeHandle(ref, () => ({
    loadPrevious: loadPreviousProducts
  }));

  useEffect(() => {
    if (bottomInView && !isLoading) {
      loadMoreProducts();
    }
  }, [bottomInView, isLoading, loadMoreProducts]);

  return (
    <div>
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
});

InfiniteWindowedGrid.displayName = 'InfiniteWindowedGrid';
