import { ProductGrid } from '@/components/product/product-grid';
import { getProducts } from '@/lib/products';
import { Suspense } from 'react';
import Hero from '@/components/hero';

const PRODUCTS_PER_PAGE = 10;

export default async function Home() {
  const allProducts = await getProducts();
  const newArrivals = allProducts.slice(0, PRODUCTS_PER_PAGE);

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          New Arrivals
        </h2>
        <Suspense fallback={<p>Loading products...</p>}>
          <ProductGrid products={newArrivals} />
        </Suspense>
      </div>
    </div>
  );
}
