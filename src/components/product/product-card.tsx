
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { AppProduct } from '@/lib/products';
import { Card, CardContent } from '@/components/ui/card';
import { AddToCartButton } from './add-to-cart-button';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
    <div className="flex flex-col">
      <Card className="flex flex-col flex-grow overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-xl">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="group relative">
            <Link href={`/products/${product.slug}`}>
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  data-ai-hint="product image"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            </Link>
            <div className="absolute top-2 left-2 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
              ID: {product.id}
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Product preview"
              onClick={handleQuickViewClick}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold font-headline leading-tight flex-grow">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xl font-bold text-primary">PKR {product.price}</p>
              <AddToCartButton product={product} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
