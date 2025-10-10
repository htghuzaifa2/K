
import { getAllCategories } from '@/lib/products';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const categoryImages: Record<string, { src: string; hint: string }> = {
  'lawn-suits': { src: 'https://picsum.photos/seed/lawn/600/400', hint: 'summer fabric' },
  'bridal-dresses': { src: 'https://picsum.photos/seed/bridal/600/400', hint: 'wedding dress' },
  'women': { src: 'https://picsum.photos/seed/womenfashion/600/400', hint: 'female fashion' },
  // Add other categories here if needed
};

function getCategoryImage(category: string) {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  return categoryImages[normalizedCategory] || { src: 'https://picsum.photos/seed/default/600/400', hint: 'fashion style' };
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-foreground font-headline">
        Shop by Category
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => {
          const { src, hint } = getCategoryImage(category);
          const categoryName = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          const categorySlug = encodeURIComponent(category);
          
          return (
            <Link key={category} href={`/products/category/${categorySlug}`} passHref>
              <Card className="group relative block overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-xl">
                <div className="relative aspect-video w-full">
                  <Image
                    src={src}
                    alt={categoryName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    data-ai-hint={hint}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-2xl font-bold text-white font-headline tracking-wide">
                    {categoryName}
                  </h2>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
