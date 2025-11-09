
import { getAllCategories, getProductsByCategory } from '@/lib/products';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { fetchProducts } from '@/app/actions';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const allCategories = await getAllCategories();
  const decodedCategory = decodeURIComponent(params.category);
  
  if (!allCategories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
    notFound();
  }

  const initialProducts = await fetchProducts({ page: 1, limit: 12, category: decodedCategory });

  const title = decodedCategory
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
      <Suspense fallback={<p>Loading products...</p>}>
        <InfiniteProductGrid initialProducts={initialProducts} category={decodedCategory} />
      </Suspense>
    </div>
  );
}
