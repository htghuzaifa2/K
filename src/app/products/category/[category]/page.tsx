
'use client';

import { getAllCategories, getProductsByCategory } from '@/lib/products';
import { Suspense, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { InfiniteWindowedGrid } from '@/components/product/infinite-windowed-grid';
import { fetchProducts } from '@/app/actions';
import type { AppProduct } from '@/lib/products';

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
  const [initialData, setInitialData] = useState<{products: AppProduct[] } | null>(null);
  const [allProductsForCategory, setAllProductsForCategory] = useState<AppProduct[] | null>(null);
  const [isValidCategory, setIsValidCategory] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const allCats = await getAllCategories();
        const isValid = allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());
        
        setIsValidCategory(isValid);

        if (!isValid) {
          setIsLoading(false);
          return;
        }
        
        const products = await getProductsByCategory(decodedCategory);
        setAllProductsForCategory(products);

        const initial = await fetchProducts({ allProducts: products, page: 1, limit: 25 });
        setInitialData(initial);

      } catch (error) {
        console.error("Failed to load category data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [decodedCategory]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
            {formatCategoryTitle(decodedCategory)}
        </h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (isValidCategory === false) {
    notFound();
  }

  const title = formatCategoryTitle(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
       <Suspense fallback={<p>Loading...</p>}>
          {isLoading || !initialData || !allProductsForCategory ? (
            <p>Loading...</p>
          ) : (
            <InfiniteWindowedGrid 
              initialProducts={initialData.products}
              allProducts={allProductsForCategory}
            />
          )}
      </Suspense>
    </div>
  );
}
