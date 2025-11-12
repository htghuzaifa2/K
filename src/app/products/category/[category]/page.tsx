
'use client';

import { getAllCategories, getProductsByCategory } from '@/lib/products';
import { Suspense, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { InfiniteWindowedGrid } from '@/components/product/infinite-windowed-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { APP_NAME } from '@/lib/constants';
import { ScrollRestorer } from '@/components/scroll-restorer';
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

// This is a client-side rendered page
export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  const [initialData, setInitialData] = useState<{products: AppProduct[] } | null>(null);
  const [allProductsForCategory, setAllProductsForCategory] = useState<AppProduct[] | null>(null);
  const [isValidCategory, setIsValidCategory] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const allCats = await getAllCategories();
        const isValid = allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());
        
        if (!isMounted) return;
        setIsValidCategory(isValid);

        if (!isValid) {
          setIsLoading(false);
          return;
        }
        
        const products = await getProductsByCategory(decodedCategory);
        if (!isMounted) return;
        setAllProductsForCategory(products);

        const initial = await fetchProducts({ allProducts: products, page: 1, limit: 25 });
        if (!isMounted) return;
        setInitialData(initial);

      } catch (error) {
        console.error("Failed to load category data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadData();

    return () => {
      isMounted = false;
    };
  }, [decodedCategory]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ProductGridSkeleton />
      </div>
    );
  }

  if (isValidCategory === false) {
    notFound();
  }

  const title = formatCategoryTitle(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ScrollRestorer sessionKey={`category_${decodedCategory}_scroll`} />
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
       <Suspense fallback={<ProductGridSkeleton />}>
          {initialData && allProductsForCategory ? (
            <InfiniteWindowedGrid 
              initialProducts={initialData.products}
              allProducts={allProductsForCategory}
            />
          ) : <ProductGridSkeleton />}
      </Suspense>
    </div>
  );
}
