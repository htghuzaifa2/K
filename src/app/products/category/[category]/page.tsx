
import { getAllCategories, getProductsByCategory } from '@/lib/products';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { InfiniteProductGrid } from '@/components/product/infinite-product-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

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


export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const decodedCategory = decodeURIComponent(params.category);
  const title = formatCategoryTitle(decodedCategory);
  
  return {
    title: title,
    description: `Shop for ${title} on ${APP_NAME}. Best prices in Pakistan.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  
  const allCategories = await getAllCategories();
  const isValidCategory = allCategories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase());

  if (!isValidCategory) {
    notFound();
  }
  
  const initialProducts = await getProductsByCategory(decodedCategory);

  const title = formatCategoryTitle(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
      <Suspense fallback={<ProductGridSkeleton />}>
          <InfiniteProductGrid initialProducts={{ products: initialProducts.slice(0, 25), hasMore: initialProducts.length > 25, total: initialProducts.length}} category={decodedCategory} />
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
