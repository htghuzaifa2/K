'use client';
import { getAllCategories, getProductsByCategory } from '@/lib/products';
import { Suspense, useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { InfiniteWindowedGrid } from '@/components/product/infinite-windowed-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { ScrollRestorer } from '@/components/scroll-restorer';
import { fetchProducts } from '@/app/actions';
import { AppProduct } from '@/lib/products';

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
  const [initialData, setInitialData] = useState<{products: AppProduct[], hasMore: boolean, total: number} | null>(null);
  const [allProductsForCategory, setAllProductsForCategory] = useState<AppProduct[] | null>(null);
  
  useEffect(() => {
    async function loadCategoryData() {
      const allCategories = await getAllCategories();
      const isValidCategory = allCategories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());

      if (!isValidCategory) {
        notFound();
      }
      
      const productsForCategory = await getProductsByCategory(decodedCategory);
      setAllProductsForCategory(productsForCategory);

      const initial = await fetchProducts({ allProducts: productsForCategory, page: 1, limit: 25 });
      setInitialData(initial);
    }
    loadCategoryData();
  }, [decodedCategory]);

  const title = formatCategoryTitle(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ScrollRestorer sessionKey={`category_${decodedCategory}_scroll`} />
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
       <Suspense fallback={<ProductGridSkeleton />}>
        {(initialData && allProductsForCategory) ? (
          <InfiniteWindowedGrid 
            initialProducts={initialData.products}
            allProducts={allProductsForCategory}
          />
        ) : <ProductGridSkeleton />}
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((category) => ({
        category: encodeURIComponent(category),
    }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const decodedCategory = decodeURIComponent(params.category);
  const title = formatCategoryTitle(decodedCategory);
  
  return {
    title: title,
    description: `Shop for ${title} on ${APP_NAME}. Best prices in Pakistan.`,
  };
}
