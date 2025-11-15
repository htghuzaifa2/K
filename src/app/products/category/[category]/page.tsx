'use client';

import { APP_NAME } from '@/lib/constants';
import { notFound, useParams } from 'next/navigation';
import { getAllCategories } from '@/lib/products';
import { CategoryClientPage } from './client-page';
import { useEffect } from 'react';

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
  const decodedCategory = decodeURIComponent(category);
  const [allCats, setAllCats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categories = getAllCategories();
    setAllCats(categories);
    if (!categories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
        notFound();
    }
    document.title = `${formatCategoryTitle(decodedCategory)} | ${APP_NAME}`;
    setIsLoading(false);
  }, [decodedCategory]);
    
  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
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
