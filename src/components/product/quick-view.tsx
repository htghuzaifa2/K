
'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { AppProduct, ProductImage } from '@/lib/products';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AddToCartButton } from './add-to-cart-button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { ScrollArea } from '../ui/scroll-area';
import { BLUR_DATA_URL } from '@/lib/constants';

function CarouselImage({ img, index }: { img: ProductImage, index: number }) {
  return (
    <div className="relative aspect-square">
      <Image
        src={img.url}
        alt={img.altText}
        fill
        className="object-cover rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        data-ai-hint="product image"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
    </div>
  )
}

type QuickViewProps = {
  product: AppProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  if (!product) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-4">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <CarouselImage img={img} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          <div className="flex flex-col p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline mb-2">{product.name}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-grow pr-4 -mr-4">
              <div className="space-y-4">
                <p className="text-2xl font-bold text-primary">{`PKR ${product.price}`}</p>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </ScrollArea>
            <div className="mt-6 flex flex-col gap-2">
               <AddToCartButton product={product} size="lg" className="w-full">
                  Add to Cart
                </AddToCartButton>
              <Button asChild variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                <Link href={`/products/${product.slug}`}>View Full Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
