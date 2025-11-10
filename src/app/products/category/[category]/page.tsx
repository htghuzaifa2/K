
import { getAllCategories, getProductsByCategory } from '@/lib/products';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { InfiniteWindowedGrid } from '@/components/product/infinite-windowed-grid';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { ScrollRestorer } from '@/components/scroll-restorer';
import { fetchProducts } from '@/app/actions';


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
  
  const allProductsForCategory = await getProductsByCategory(decodedCategory);
  const initialData = await fetchProducts({ allProducts: allProductsForCategory, page: 1, limit: 25 });


  const title = formatCategoryTitle(decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ScrollRestorer sessionKey={`category_${decodedCategory}_scroll`} />
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
        {title}
      </h1>
       <Suspense fallback={<ProductGridSkeleton />}>
        <InfiniteWindowedGrid 
          initialProducts={initialData.products}
          allProducts={allProductsForCategory}
          onStateChange={() => {}} 
        />
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
