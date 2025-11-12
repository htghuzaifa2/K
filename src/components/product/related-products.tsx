
import { ProductGridSkeleton } from './product-grid-skeleton';
import { Suspense } from 'react';
import { ClientProductList } from './client-product-list';

type RelatedProductsProps = {
  currentProductId?: string;
};

const RECOMMENDATION_COUNT = 4;

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ClientProductList limit={RECOMMENDATION_COUNT} shuffle={true} currentProductId={currentProductId} />
      </Suspense>
    </div>
  );
}
