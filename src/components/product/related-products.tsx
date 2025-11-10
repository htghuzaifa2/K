
import { type AppProduct } from '@/lib/products';
import { ProductCard } from './product-card';
import { QuickView } from './quick-view';
import { fetchRandomProducts } from '@/app/actions';
import { ProductGridSkeleton } from './product-grid-skeleton';
import { ClientOnlyRelatedProducts } from './client-only-related-products';

type RelatedProductsProps = {
  currentProductId: string;
};

const RECOMMENDATION_COUNT = 4;

export async function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const relatedProductsList = await fetchRandomProducts(currentProductId, RECOMMENDATION_COUNT);

  if (relatedProductsList.length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
        <ClientOnlyRelatedProducts products={relatedProductsList} />
      </div>
    </>
  );
}
