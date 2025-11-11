'use client';

import { type AppProduct } from '@/lib/products';
import { ProductGrid } from './product-grid';
import { ProductGridSkeleton } from './product-grid-skeleton';
import { useState, useEffect } from 'react';
import { fetchProductsSummary } from '@/app/actions';

const RECOMMENDATION_COUNT = 4;

// This component is specifically for use on pages that need to fetch related products on the client-side,
// like blog posts or tool pages, where server-side rendering of this section isn't the primary focus.
// It uses the lightweight products-summary.json for fast loading.
export function ClientOnlyRelatedProducts() {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const relatedProducts = await fetchProductsSummary(undefined, RECOMMENDATION_COUNT);
        setProducts(relatedProducts);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return null; 
  }

  return (
    <div>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
        <ProductGrid products={products} />
    </div>
  );
}
