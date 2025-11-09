
'use client';

import { Suspense } from 'react';
import Hero from '@/components/hero';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from './actions';
import type { AppProduct } from '@/lib/products';

type HomePageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function Home({ searchParams }: HomePageProps) {

  // The initial products are now fetched on the server via the loader
  // and passed to the client component. This is much faster.
  const initialProducts = JSON.parse(searchParams?.initialProducts as string || '{"products":[],"hasMore":true}');

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Featured Products
        </h2>
        <Suspense fallback={<p>Loading products...</p>}>
          <InfiniteProductGrid initialProducts={initialProducts} />
        </Suspense>
      </div>
    </div>
  );
}
