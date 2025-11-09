
import { Suspense } from 'react';
import { searchProducts } from '@/app/actions';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = searchParams;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        Search Results
      </h1>
      {query ? (
        <p className="mb-8 text-center text-muted-foreground">
          Showing results for: <span className="font-semibold text-foreground">&quot;{query}&quot;</span>
        </p>
      ) : (
        <p className="mb-8 text-center text-muted-foreground">
          Please enter a search term in the header to find products.
        </p>
      )}
      <Suspense fallback={<ProductGridSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}

async function SearchResults({ query }: { query?: string }) {
  if (!query) {
    return <div className="text-center">No products to display.</div>;
  }
  const products = await searchProducts(query);

  if (products.length === 0) {
    return <div className="text-center">No products found matching your search.</div>;
  }

  return <ProductGrid products={products} />;
}
