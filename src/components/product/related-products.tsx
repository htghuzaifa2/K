
import { fetchProducts } from '@/app/actions';
import { ProductGrid } from './product-grid';
import { ProductGridSkeleton } from './product-grid-skeleton';

type RelatedProductsProps = {
  currentProductId?: string;
};

const RECOMMENDATION_COUNT = 4;

export async function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Fetch full product data, shuffle it, and filter out the current product.
  // This runs on the server.
  const { products: allProducts } = await fetchProducts({ shuffle: true });
  
  const relatedProducts = allProducts
    .filter(p => p.id !== currentProductId)
    .slice(0, RECOMMENDATION_COUNT);

  if (relatedProducts.length === 0) {
    return (
      <div>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
        <ProductGridSkeleton />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font-bold tracking-tight font-headline">You May Also Like</h2>
      <ProductGrid products={relatedProducts} />
    </div>
  );
}
