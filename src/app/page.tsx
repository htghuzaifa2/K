
'use client';

import { Suspense, useEffect, useState } from 'react';
import Hero from '@/components/hero';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from './actions';
import type { AppProduct } from '@/lib/products';
import { ScrollRestorer } from '@/components/scroll-restorer';

export default function Home() {
  const [initialProducts, setInitialProducts] = useState<{ products: AppProduct[], hasMore: boolean, total: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts({ page: 1, limit: 25, shuffle: true });
        setInitialProducts(data);
      } catch (error) {
        console.error("Failed to fetch initial products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <ScrollRestorer sessionKey="home_scroll" />
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<p>Loading products...</p>}>
          {isLoading || !initialProducts ? (
            <p>Loading products...</p>
          ) : (
            <InfiniteProductGrid initialProducts={initialProducts} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
