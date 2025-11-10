'use client';

import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { ProductImage } from '@/lib/products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BLUR_DATA_URL } from '@/lib/constants';
import { Card, CardContent } from '../ui/card';

type FullScreenImageViewerProps = {
  images: ProductImage[];
  startIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FullScreenImageViewer({ images, startIndex, open, onOpenChange }: FullScreenImageViewerProps) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 bg-transparent w-screen h-screen max-w-none flex items-center justify-center">
        <Carousel
          opts={{
            startIndex: startIndex,
            loop: true,
          }}
          className="w-full h-full max-w-5xl max-h-[90vh]"
        >
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={img.url}
                    alt={img.altText}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    data-ai-hint="product image"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-[-50px]" />
          <CarouselNext className="right-2 md:right-[-50px]" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
