
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { QuickView } from './quick-view';
import { motion, AnimatePresence } from 'framer-motion';

const WINDOW_SIZE = 25;
const MAX_DOM_NODES = 75; // 3 windows

type WindowedProductGridProps = {
  allProducts: AppProduct[];
};

export function WindowedProductGrid({ allProducts }: WindowedProductGridProps) {
  const [displayedProducts, setDisplayedProducts] = useState<AppProduct[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<AppProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [endIndex, setEndIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  
  const [showLoadPrevious, setShowLoadPrevious] = useState(false);

  const restoreState = useCallback(() => {
    const scrollY = sessionStorage.getItem('featuredScrollY');
    const visibleIds = sessionStorage.getItem('featuredVisibleIds');
    
    if (visibleIds) {
      const ids = visibleIds.split(',');
      const restoredProducts = ids.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as AppProduct[];
      
      const lastRestoredId = ids[ids.length - 1];
      const newEndIndex = allProducts.findIndex(p => p.id === lastRestoredId) + 1;
      const newStartIndex = Math.max(0, newEndIndex - restoredProducts.length);

      setDisplayedProducts(restoredProducts);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);

      if (scrollY) {
         // Needs a slight delay to allow DOM to update
        setTimeout(() => window.scrollTo(0, parseInt(scrollY, 10)), 0);
      }
      
      return true;
    }
    return false;
  }, [allProducts]);

  useEffect(() => {
    const restored = restoreState();
    if (!restored) {
      setDisplayedProducts(allProducts.slice(0, WINDOW_SIZE));
      setEndIndex(WINDOW_SIZE);
      setStartIndex(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts, restoreState]);

  useEffect(() => {
    const handleScroll = () => {
       sessionStorage.setItem('featuredScrollY', window.scrollY.toString());
       if (startIndex > 0) {
         if (window.scrollY < lastScrollY.current && window.scrollY > 100) {
            setShowLoadPrevious(true);
         } else {
            setShowLoadPrevious(false);
         }
       } else {
         setShowLoadPrevious(false);
       }
       lastScrollY.current = window.scrollY;
    };
    const handleBeforeUnload = () => {
      const visibleIds = displayedProducts.map(p => p.id).join(',');
      sessionStorage.setItem('featuredVisibleIds', visibleIds);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [displayedProducts, startIndex]);
  
  const handleLoadMore = () => {
    setIsLoading(true);
    
    setTimeout(() => {
        let newEnd = Math.min(endIndex + WINDOW_SIZE, allProducts.length);
        let newProducts;
        let newStart = startIndex;

        if (newEnd - newStart > MAX_DOM_NODES) {
            newStart = newEnd - MAX_DOM_NODES;
        }
        
        newProducts = allProducts.slice(newStart, newEnd);
        
        setStartIndex(newStart);
        setEndIndex(newEnd);
        setDisplayedProducts(newProducts);
        setIsLoading(false);
    }, 200); // Debounce
  };

  const handleLoadPrevious = () => {
    if (startIndex === 0) return;

    const newStart = Math.max(0, startIndex - WINDOW_SIZE);
    const newEnd = Math.min(newStart + MAX_DOM_NODES, endIndex);

    const newProducts = allProducts.slice(newStart, newEnd);
    
    const currentScrollY = window.scrollY;
    
    // Get the height of the current first row of products
    let oldFirstRowHeight = 0;
    if (gridRef.current && gridRef.current.children.length > 0) {
        oldFirstRowHeight = (gridRef.current.children[0] as HTMLElement).offsetHeight;
    }

    setStartIndex(newStart);
    setEndIndex(newEnd);
    setDisplayedProducts(newProducts);

    // After render, adjust scroll position to account for the newly prepended items.
    requestAnimationFrame(() => {
        if (gridRef.current) {
            const firstRow = gridRef.current.children[0];
            if (firstRow) {
                // Approximate the height of the newly added row
                const newRowHeight = (firstRow as HTMLElement).offsetHeight;
                const gap = 24; // from gap-6
                
                // Adjust scroll position to keep the user's view stable.
                const scrollAdjustment = newRowHeight + gap - oldFirstRowHeight;
                window.scrollTo(0, currentScrollY + scrollAdjustment);
            }
        }
    });
  };


  const hasMore = endIndex < allProducts.length;

  return (
    <>
      <AnimatePresence>
        {showLoadPrevious && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="sticky top-16 z-40 flex justify-center py-2 bg-background/80 backdrop-blur-sm"
          >
            <Button onClick={handleLoadPrevious} variant="default">
                Load Previous {WINDOW_SIZE}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div ref={gridRef} className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence>
        {displayedProducts.map((product) => (
          <motion.div
             key={product.id}
             layout
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
           >
            <ProductCard product={product} onQuickView={setQuickViewProduct} />
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
      
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={handleLoadMore} disabled={isLoading}>
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

      <QuickView 
        product={quickViewProduct} 
        open={!!quickViewProduct}
        onOpenChange={(isOpen) => !isOpen && setQuickViewProduct(null)}
      />
    </>
  );
}
