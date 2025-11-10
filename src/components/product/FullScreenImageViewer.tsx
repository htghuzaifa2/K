
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { ProductImage } from '@/lib/products';
import { BLUR_DATA_URL } from '@/lib/constants';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import useEmblaCarousel, { type EmblaCarouselType } from 'embla-carousel-react';

type FullScreenImageViewerProps = {
  images: ProductImage[];
  startIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FullScreenImageViewer({ images, startIndex, open, onOpenChange }: FullScreenImageViewerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: startIndex });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  useEffect(() => {
    if (open && emblaApi) {
        emblaApi.scrollTo(startIndex, true);
    }
  }, [open, startIndex, emblaApi]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="p-0 border-0 bg-black/90 w-screen h-screen max-w-none flex items-center justify-center"
      >
        <VisuallyHidden asChild>
            <DialogTitle>Full-screen Product Image Viewer</DialogTitle>
        </VisuallyHidden>

        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
            <div className="flex h-full">
                {images.map((image, index) => (
                    <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center">
                         <Image
                            src={image.url}
                            alt={image.altText}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            data-ai-hint="product image"
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                        />
                    </div>
                ))}
            </div>
        </div>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
