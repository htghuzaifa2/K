
'use client';

import { APP_NAME } from '@/lib/constants';
import { useParams } from 'next/navigation';
import { getAllCategories } from '@/lib/products';
import { CategoryClientPage } from './client-page';
import { useEffect, useState } from 'react';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

export const runtime = 'edge';

function formatCategoryTitle(slug: string): string {
    return decodeURIComponent(slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [isValidCategory, setIsValidCategory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (category) {
      const decodedCategory = decodeURIComponent(category);
      const allCategories = getAllCategories();
      const categoryExists = allCategories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());
      
      setIsValidCategory(categoryExists);

      if (categoryExists) {
        const formattedTitle = formatCategoryTitle(decodedCategory);
        setTitle(formattedTitle);
        document.title = `${formattedTitle} | ${APP_NAME}`;
      }
      setIsLoading(false);
    }
  }, [category]);
    
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ProductGridSkeleton />
      </div>
    );
  }

  if (!isValidCategory) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
        <p className="text-muted-foreground mt-2">The category you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
      <CategoryClientPage category={decodeURIComponent(category)} />
    </div>
  );
}
