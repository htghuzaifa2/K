
'use client';

import { getProducts } from '@/lib/products';
import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import Hero from '@/components/hero';
import { InfiniteWindowedGrid } from '@/components/product/infinite-windowed-grid';
import { fetchProducts } from './actions';
import type { AppProduct } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ScrollRestorer } from '@/components/scroll-restorer';

// Fisher-Yates shuffle algorithm
function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default function Home() {
  const [allProducts, setAllProducts] = useState<AppProduct[]>([]);
  const [initialProducts, setInitialProducts] = useState<AppProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gridState, setGridState] = useState<{ products: AppProduct[], startIndexInAll: number, page: number, hasMore: boolean }>({
    products: [],
    startIndexInAll: 0,
    page: 1,
    hasMore: true,
  });

  const gridRef =  useRef<{ loadPrevious: () => Promise<void> }>(null);
  const hasLoadedInitialProducts = useRef(false);

  useEffect(() => {
    async function loadInitial() {
      if (hasLoadedInitialProducts.current) return;
      hasLoadedInitialProducts.current = true;
      
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      const shuffled = shuffle(fetchedProducts);
      const initial = await fetchProducts({ allProducts: shuffled, page: 1, limit: 25 });
      
      setAllProducts(shuffled);
      setInitialProducts(initial.products);
      
      setGridState({
        products: initial.products,
        startIndexInAll: 0,
        page: 1,
        hasMore: initial.hasMore,
      });

      setIsLoading(false);
    }
    loadInitial();
  }, []);
  
  const handleLoadPrevious = useCallback(async () => {
    if (gridRef.current) {
        setIsLoading(true);
        await gridRef.current.loadPrevious();
        setIsLoading(false);
    }
  }, []);
  
  const handleGridStateChange = useCallback((newState: { products: AppProduct[], startIndexInAll: number, page: number, hasMore: boolean, isLoading: boolean }) => {
    setGridState({
      products: newState.products,
      startIndexInAll: newState.startIndexInAll,
      page: newState.page,
      hasMore: newState.hasMore,
    });
    if (isLoading !== newState.isLoading) {
      setIsLoading(newState.isLoading);
    }
  }, [isLoading]);

  if (isLoading && initialProducts.length === 0) {
    return (
       <div>
        <Hero />
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
            Featured Products
          </h2>
          <div className="flex justify-center items-center py-8">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Loading Products...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ScrollRestorer sessionKey="homepage-scroll" />
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>

         {gridState.startIndexInAll > 0 && (
           <div className="flex justify-center mb-6">
            <Button
                onClick={handleLoadPrevious}
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
        )}

        <Suspense fallback={<p>Loading products...</p>}>
          <InfiniteWindowedGrid
            ref={gridRef}
            allProducts={allProducts}
            initialProducts={initialProducts}
            onStateChange={handleGridStateChange}
          />
        </Suspense>
      </div>
    </div>
  );
}
