
'use client';

import { Suspense } from 'react';
import { ClientProductList } from './client-product-list';
import { ProductGridSkeleton } from './product-grid-skeleton';

const RECOMMENDATION_COUNT = 4;

export function ClientOnlyRelatedProducts() {
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ClientProductList limit={RECOMMENDATION_COUNT} shuffle={true} />
      </Suspense>
    </div>
  );
}
