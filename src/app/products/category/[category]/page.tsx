
'use client';

import { Suspense, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { getAllCategories, getProductsByCategory } from '@/lib/products';
import { ClientProductGrid } from '@/components/product/client-product-grid';
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const runtime = 'edge';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

function formatCategoryTitle(slug: string): string {
    return decodeURIComponent(slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryName = formatCategoryTitle(params.category);
  const description = `Shop for the best ${categoryName} online in Pakistan at ${APP_NAME}. Find great deals and quality products.`;

  return {
    title: `${categoryName} | ${APP_NAME}`,
    description: description.slice(0, 150),
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [title, setTitle] = useState('');
  const [products, setProducts] = useState<Awaited<ReturnType<typeof getProductsByCategory>>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const decodedCategory = decodeURIComponent(params.category);
    const allCats = getAllCategories();
    
    if (!allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
      notFound();
    }

    const formattedTitle = formatCategoryTitle(decodedCategory);
    setTitle(formattedTitle);
    document.title = `${formattedTitle} | ${APP_NAME}`;

    const categoryProducts = getProductsByCategory(decodedCategory);
    setProducts(categoryProducts);
    setIsLoading(false);
  }, [params.category]);


  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
       <Suspense fallback={<ProductGridSkeleton />}>
          {isLoading ? <ProductGridSkeleton /> : <ClientProductGrid initialProducts={products} />}
      </Suspense>
    </div>
  );
}
