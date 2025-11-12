
import { Suspense } from 'react';
import { ClientProductList } from '@/components/product/client-product-list';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

export default function AllProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        All Products
      </h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ClientProductList limit={25} />
      </Suspense>
    </div>
  );
}
