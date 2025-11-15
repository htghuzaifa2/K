'use client';

import { APP_NAME } from '@/lib/constants';
import { notFound, useParams } from 'next/navigation';
import { getAllCategories } from '@/lib/products';
import { CategoryClientPage } from './client-page';
import { useEffect } from 'react';

function formatCategoryTitle(slug: string): string {
    return decodeURIComponent(slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const decodedCategory = decodeURIComponent(category);
  const allCats = getAllCategories();

  useEffect(() => {
    if (!allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
        notFound();
    }
    document.title = `${formatCategoryTitle(decodedCategory)} | ${APP_NAME}`;
  }, [allCats, decodedCategory]);
    
  if (!allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
    // This will be caught by useEffect, but it's good practice for the initial render
    return null; 
  }

  const title = formatCategoryTitle(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
      <CategoryClientPage category={decodedCategory} />
    </div>
  );
}
