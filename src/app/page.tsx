
'use client';

import { Suspense } from 'react';
import Hero from '@/components/hero';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { getProducts } from '@/lib/products';
import { ClientProductGrid } from '@/components/product/client-product-grid';

export default function Home() {
  const allProducts = getProducts();
  const featuredProducts = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 8);

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h1>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ClientProductGrid initialProducts={featuredProducts} />
        </Suspense>
      </div>
    </div>
  );
}
