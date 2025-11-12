
'use client';

import { Suspense, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { useProducts } from '@/hooks/use-products';
import { getAllCategories } from '@/lib/products';

export const runtime = 'edge';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

function formatCategoryTitle(slug: string): string {
    return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  const [isValidCategory, setIsValidCategory] = useState<boolean | null>(null);

  const { products, hasMore, isLoading, loadMoreProducts } = useProducts({ 
    limit: 25, 
    category: decodedCategory 
  });
  
  useEffect(() => {
    async function validateCategory() {
      const allCats = await getAllCategories();
      const isValid = allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());
      setIsValidCategory(isValid);
    }
    validateCategory();
  }, [decodedCategory]);

  if (isValidCategory === false) {
    notFound();
  }

  const title = formatCategoryTitle(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
       <Suspense fallback={<ProductGridSkeleton />}>
          {isLoading && products.length === 0 ? (
            <ProductGridSkeleton />
          ) : (
            <InfiniteProductGrid
              initialProducts={{ products, hasMore, total: 0 }}
              loadMoreProducts={loadMoreProducts}
              category={decodedCategory}
            />
          )}
      </Suspense>
    </div>
  );
}
