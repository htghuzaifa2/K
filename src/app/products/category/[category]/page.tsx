
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { getAllCategories, getProductsByCategory } from '@/lib/products';

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

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  const allCats = getAllCategories();
  
  if (!allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
    notFound();
  }

  const title = formatCategoryTitle(decodedCategory);
  const products = getProductsByCategory(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
       <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category.toLowerCase()),
  }));
}
