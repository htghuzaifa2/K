
import { Suspense } from 'react';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { fetchProducts } from '@/app/actions';

async function AllProducts() {
    const { products } = await fetchProducts({ limit: 50 });
    return <ProductGrid products={products} />
}

export default function AllProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm_px-6 lg_px_8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <AllProducts />
      </Suspense>
    </div>
  );
}
