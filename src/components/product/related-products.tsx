
import { ProductGridSkeleton } from './product-grid-skeleton';
import { ClientOnlyRelatedProducts } from './client-only-related-products';

type RelatedProductsProps = {
  currentProductId: string;
};

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {

  return (
    <>
      <div>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
        <ClientOnlyRelatedProducts currentProductId={currentProductId} />
      </div>
    </>
  );
}
