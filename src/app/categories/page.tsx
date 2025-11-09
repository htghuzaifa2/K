
'use client';

import { getAllCategories } from '@/lib/products';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const categoryImages: Record<string, { src: string; hint: string }> = {
  'keyboards': { src: 'https://i.postimg.cc/KzNsv0-Ws/Wireless-keyboard-KB036-for-laptop-and-mobile-smooth-silent-keys-available-in-Pakistan.png', hint: 'wireless keyboard' },
  'lawn-suits': { src: 'https://picsum.photos/seed/lawn/600/400', hint: 'summer fabric' },
  'bridal-dresses': { src: 'https://picsum.photos/seed/bridal/600/400', hint: 'wedding dress' },
  'women': { src: 'https://picsum.photos/seed/womenfashion/600/400', hint: 'female fashion' },
};

function getCategoryImage(category: string) {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  return categoryImages[normalizedCategory] || { src: 'https://picsum.photos/seed/default/600/400', hint: 'fashion style' };
}

function CategorySkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="group relative block overflow-hidden rounded-lg shadow-sm">
                    <Skeleton className="aspect-video w-full" />
                </Card>
            ))}
        </div>
    );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-foreground font-headline">
        Shop by Category
      </h1>
      {loading ? (
        <CategorySkeleton />
      ) : (
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
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
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
      )}
    </div>
  );
}
