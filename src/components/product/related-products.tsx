
import { fetchProducts } from '@/app/actions';
import { ProductGrid } from './product-grid';
import { ProductGridSkeleton } from './product-grid-skeleton';
import { ClientProductList } from './client-product-list';

type RelatedProductsProps = {
  currentProductId?: string;
};

const RECOMMENDATION_COUNT = 4;

export async function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // We can still use server-side fetching here for initial load if we want,
  // but for consistency and to ensure it works on static hosts without issue,
  // let's use the same client-side component. We will adjust the component
  // to filter out the current product ID on the client.
  
  const { products: allProducts } = await fetchProducts({ shuffle: true });
  
  const relatedProducts = allProducts
    .filter(p => p.id !== currentProductId)
    .slice(0, RECOMMENDATION_COUNT);

  if (relatedProducts.length === 0) {
    return (
        <div className="text-center py-16">No related products found.</div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
      <ProductGrid products={relatedProducts} />
    </div>
  );
}
