'use client';

import { getAllCategories } from '@/lib/products';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const categoryImages: Record<string, { src: string; hint: string }> = {
  'keyboards': { src: 'https://i.postimg.cc/KzNsv0Ws/Wireless-keyboard-KB036-for-laptop-and-mobile-smooth-silent-keys-available-in-Pakistan.png', hint: 'wireless keyboard' },
  'lawn-suits': { src: 'https://picsum.photos/seed/lawn/600/400', hint: 'summer fabric' },
  'bridal-dresses': { src: 'https://picsum.photos/seed/bridal/600/400', hint: 'wedding dress' },
  'women': { src: 'https://picsum.photos/seed/womenfashion/600/400', hint: 'female fashion' },
  'men': { src: 'https://picsum.photos/seed/menfashion/600/400', hint: 'male fashion' },
  'watches': { src: 'https://picsum.photos/seed/watches/600/400', hint: 'wrist watch' },
  'tech-products': { src: 'https://picsum.photos/seed/tech/600/400', hint: 'gadgets' },
};

function getCategoryImage(category: string) {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  return categoryImages[normalizedCategory] || { src: `https://picsum.photos/seed/${normalizedCategory}/600/400`, hint: 'fashion style' };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const cats = getAllCategories();
    setCategories(cats);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-foreground font-headline">
        All Categories
      </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const { src, hint } = getCategoryImage(category);
            const categoryName = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            const categorySlug = encodeURIComponent(category);
            
            return (
              <Link key={category} href={`/products/category/${categorySlug}`} passHref>
                <Card className="group relative block h-48 overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-xl">
                  <div className="relative h-full w-full">
                    <Image
                      src={src}
                      alt={categoryName}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      data-ai-hint={hint}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
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
