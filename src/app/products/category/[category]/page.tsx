
'use client';

import { getAllCategories } from '@/lib/products';
import { Suspense, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from '@/app/actions';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import type { AppProduct } from '@/lib/products';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

type InitialProductsState = {
  products: AppProduct[];
  hasMore: boolean;
  total: number;
} | null;

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  const [initialProducts, setInitialProducts] = useState<InitialProductsState>(null);
  const [loading, setLoading] = useState(true);
  const [isValidCategory, setIsValidCategory] = useState(true);

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const allCategories = await getAllCategories();
        const valid = allCategories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());
        setIsValidCategory(valid);

        if (valid) {
          const productsResult = await fetchProducts({ page: 1, limit: 25, category: decodedCategory });
          setInitialProducts(productsResult);
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Failed to load category data", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [decodedCategory]);

  const title = decodedCategory
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (!isValidCategory) {
      return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        {loading || !initialProducts ? (
          <ProductGridSkeleton />
        ) : (
          <InfiniteProductGrid initialProducts={initialProducts} category={decodedCategory} />
        )}
      </Suspense>
    </div>
  );
}
