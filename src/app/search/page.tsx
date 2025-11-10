
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/app/actions';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import type { AppProduct } from '@/lib/products';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const results = await searchProducts(query);
        setProducts(results);
      } catch (error) {
        console.error("Failed to search products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  if (loading) {
    return <ProductGridSkeleton />;
  }
  
  if (!query) {
    return <div className="text-center">Please enter a search term in the header to find products.</div>;
  }

  if (products.length === 0) {
    return <div className="text-center">No products found matching your search for <span className="font-semibold">&quot;{query}&quot;</span>.</div>;
  }

  return <ProductGrid products={products} />;
}

function SearchHeading() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    return (
        <>
            <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
                Search Results
            </h1>
            {query ? (
                <p className="mb-8 text-center text-muted-foreground">
                    Showing results for: <span className="font-semibold text-foreground">&quot;{query}&quot;</span>
                </p>
            ) : (
                 <p className="mb-8 text-center text-muted-foreground">
                    Enter a term in the search bar to begin.
                </p>
            )}
        </>
    )
}

export default function SearchPage() {
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Suspense fallback={<ProductGridSkeleton />}>
                <SearchHeading />
                <SearchResults />
            </Suspense>
        </div>
    );
}
