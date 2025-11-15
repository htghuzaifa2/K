
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { getAllCategories } from '@/lib/products';
import { CategoryClientPage } from './client-page';

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

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryName = formatCategoryTitle(params.category);
  const description = `Shop for the best ${categoryName} online in Pakistan at ${APP_NAME}. Find great deals and quality products.`;

  return {
    title: `${categoryName} | ${APP_NAME}`,
    description: description.slice(0, 150),
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category);
  const allCats = getAllCategories();
    
  if (!allCats.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
    notFound();
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

// This function can be uncommented if you are not using the edge runtime.
// Cloudflare Pages requires edge runtime for dynamic routes, and generateStaticParams
// is not fully compatible with it in all Next.js versions.
// export async function generateStaticParams() {
//   const categories = getAllCategories();
//   return categories.map((category) => ({
//     category: encodeURIComponent(category),
//   }));
// }
