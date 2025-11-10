'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { ProductImage } from '@/lib/products';
import { BLUR_DATA_URL } from '@/lib/constants';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type FullScreenImageViewerProps = {
  images: ProductImage[];
  startIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FullScreenImageViewer({ images, startIndex, open, onOpenChange }: FullScreenImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, open]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!open || !images[currentIndex]) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 bg-black/90 w-screen h-screen max-w-none flex items-center justify-center">
        <VisuallyHidden asChild>
            <DialogTitle>Full-screen Product Image Viewer</DialogTitle>
        </VisuallyHidden>

        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
                <Image
                    key={currentIndex}
                    src={images[currentIndex].url}
                    alt={images[currentIndex].altText}
                    fill
                    className="object-contain animate-fade-in-up"
                    sizes="100vw"
                    data-ai-hint="product image"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                />
            </div>
        </div>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
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
