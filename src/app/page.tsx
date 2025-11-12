
import { Suspense } from 'react';
import Hero from '@/components/hero';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { fetchProducts } from './actions';

async function FeaturedProducts() {
  const { products } = await fetchProducts({ limit: 8, shuffle: true });
  return <ProductGrid products={products} />;
}

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </div>
  );
}
