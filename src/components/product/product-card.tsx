
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { AppProduct } from '@/lib/products';
import { Card, CardContent } from '@/components/ui/card';
import { AddToCartButton } from './add-to-cart-button';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BLUR_DATA_URL } from '@/lib/constants';

type ProductCardProps = {
  product: AppProduct;
  onQuickView: (product: AppProduct) => void;
};

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView(product);
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <CardContent className="flex flex-1 flex-col p-0">
        <div className="group relative">
          <Link href={`/products/${product.slug}`}>
            <div className="relative aspect-square w-full overflow-hidden bg-white md:aspect-[4/3]">
              <Image
                src={product.images[0].url}
                alt={product.images[0].altText}
                fill
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                data-ai-hint="product image"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </Link>
          <div className="absolute left-2 top-2 hidden rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 md:block">
            ID: {product.id}
          </div>
          <div className="absolute right-2 top-2 hidden opacity-0 transition-opacity group-hover:opacity-100 md:flex md:gap-2">
            <AddToCartButton 
                product={product} 
                variant="secondary"
                className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <h3 className="flex-grow text-sm font-semibold leading-tight font-headline md:text-base">
            <Link href={`/products/${product.slug}`} className="transition-colors hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-bold text-primary md:text-xl">PKR {product.price}</p>
            <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full"
                aria-label="Product preview"
                onClick={handleQuickViewClick}
            >
                <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
