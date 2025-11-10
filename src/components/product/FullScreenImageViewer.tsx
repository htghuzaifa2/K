'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { ProductImage } from '@/lib/products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BLUR_DATA_URL } from '@/lib/constants';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
      <DialogContent className="p-0 border-0 bg-black/90 w-screen h-screen max-w-none flex items-center justify-center">
        <VisuallyHidden asChild>
            <DialogTitle>Full-screen Product Image Viewer</DialogTitle>
        </VisuallyHidden>
        <Carousel
          opts={{
            startIndex: startIndex,
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-full">
            {images.map((img, index) => (
              <CarouselItem key={index} className="h-full flex items-center justify-center">
                <div className="relative w-full h-full max-h-screen p-4">
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
          <CarouselPrevious className="left-2 md:left-4 h-10 w-10 md:h-12 md:w-12" />
          <CarouselNext className="right-2 md:right-4 h-10 w-10 md:h-12 md:w-12" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
