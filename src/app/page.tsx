
import { ProductGrid } from '@/components/product/product-grid';
import { getProducts } from '@/lib/products';
import { Suspense } from 'react';
import Hero from '@/components/hero';

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 10);

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<p>Loading products...</p>}>
          <ProductGrid products={featuredProducts} />
        </Suspense>
      </div>
    </div>
  );
}
