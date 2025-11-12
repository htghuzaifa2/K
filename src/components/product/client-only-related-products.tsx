
'use client';

import { ProductGrid } from './product-grid';
import { useProducts } from '@/hooks/use-products';
import { ProductGridSkeleton } from './product-grid-skeleton';

const RECOMMENDATION_COUNT = 4;

export function ClientOnlyRelatedProducts() {
  const { products, isLoading } = useProducts({ limit: RECOMMENDATION_COUNT, shuffle: true });

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
        <ProductGridSkeleton />
      </div>
    );
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
