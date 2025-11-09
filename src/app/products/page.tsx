
import { Suspense } from 'react';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from '@/app/actions';

export default async function AllProductsPage() {
  const initialProducts = await fetchProducts({ page: 1, limit: 25 });

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <Suspense fallback={<p>Loading products...</p>}>
        <InfiniteProductGrid initialProducts={initialProducts} />
      </Suspense>
    </div>
  );
}
