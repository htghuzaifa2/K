'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { AppProduct, ProductImage } from '@/lib/products';
import { Button } from './ui/button';
import Link from 'next/link';
import { AddToCartButton } from './product/add-to-cart-button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ScrollArea } from './ui/scroll-area';
import { BLUR_DATA_URL } from '@/lib/constants';

function CarouselImage({ img, index }: { img: ProductImage, index: number }) {
  return (
    <div className="relative aspect-square">
      <Image
        src={img.url}
        alt={img.altText}
        fill
        className="object-contain rounded-md"
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
       <DialogContent className="max-w-4xl p-0 h-[90vh] flex flex-col sm:grid sm:grid-cols-2 sm:h-[600px] sm:max-h-[90vh] sm:gap-0">
          <div className="p-6 flex items-center justify-center">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <CarouselImage img={img} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          </div>
          <div className="flex flex-col p-6 border-t sm:border-t-0 sm:border-l bg-secondary/50 overflow-hidden">
            <DialogHeader className="mb-4 text-left flex-shrink-0">
              <DialogTitle className="text-2xl font-headline">{product.name}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-grow pr-4 -mr-4 mb-4">
              <div className="space-y-4">
                <p className="text-3xl font-bold text-primary">{`PKR ${product.price}`}</p>
                <p className="text-muted-foreground text-sm">{product.description}</p>
              </div>
            </ScrollArea>
            <div className="mt-auto pt-4 flex flex-col gap-3 flex-shrink-0">
               <AddToCartButton product={product} size="lg" className="w-full">
                  Add to Cart
                </AddToCartButton>
              <Button asChild variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                <Link href={`/products/${product.slug}`}>View Full Details</Link>
              </Button>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
