'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { AppProduct } from '@/lib/products';
import { Card, CardContent } from '@/components/ui/card';
import { AddToCartButton } from './add-to-cart-button';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProductCardProps = {
  product: AppProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <Card className="flex flex-col flex-grow overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-xl">
        <CardContent className="p-0 flex flex-col flex-grow">
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
            <div className="absolute top-2 left-2 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
              ID: {product.id}
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Product preview"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold font-headline leading-tight flex-grow">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xl font-bold text-foreground">PKR {product.price}</p>
              <AddToCartButton product={product} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
