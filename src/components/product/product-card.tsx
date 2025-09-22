'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { AppProduct } from '@/lib/products';
import { Card, CardContent } from '@/components/ui/card';
import { AddToCartButton } from './add-to-cart-button';
import { motion } from 'framer-motion';

type ProductCardProps = {
  product: AppProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-xl">
        <CardContent className="p-0">
          <div className="group relative">
            <Link href={`/products/${product.slug}`}>
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  data-ai-hint="product image"
                />
              </div>
            </Link>
          </div>
          <div className="p-4">
            <h3 className="truncate text-lg font-semibold font-headline">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
              <AddToCartButton product={product} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
