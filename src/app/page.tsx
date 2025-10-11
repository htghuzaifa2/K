
import { ProductGrid } from '@/components/product/product-grid';
import { getProducts } from '@/lib/products';
import { Suspense } from 'react';
import Hero from '@/components/hero';
import { fetchProducts } from '@/app/actions';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';

const PRODUCTS_PER_PAGE = 25;

export default async function Home() {
  const initialProducts = await fetchProducts({ page: 1, limit: PRODUCTS_PER_PAGE });

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Our Products
        </h2>
        <Suspense fallback={<p>Loading products...</p>}>
          <InfiniteProductGrid initialProducts={initialProducts} />
        </Suspense>
      </div>
    </div>
  );
}
