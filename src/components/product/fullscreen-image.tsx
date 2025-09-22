
'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';

type FullscreenImageProps = {
  images: string[];
  startIndex: number | null;
  onOpenChange: (open: boolean) => void;
};

export function FullscreenImage({ images, startIndex, onOpenChange }: FullscreenImageProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prevIndex) => (prevIndex! + 1) % images.length);
  }, [currentIndex, images.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex === null) return;
    setCurrentIndex((prevIndex) => (prevIndex! - 1 + images.length) % images.length);
  }, [currentIndex, images.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrevious]);

  const isOpen = currentIndex !== null;
  const imageUrl = isOpen ? images[currentIndex] : null;

  if (!isOpen) {
    return null;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen max-h-screen w-screen max-w-full border-0 bg-black/80 p-4 backdrop-blur-sm">
        <VisuallyHidden>
            <DialogTitle>Fullscreen Product Image</DialogTitle>
            <DialogDescription>
                A larger view of the product image. Use arrow buttons or dots to navigate. Press escape to close.
            </DialogDescription>
        </VisuallyHidden>
        
        {imageUrl && (
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt="Fullscreen product view"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        )}

        {images.length > 1 && (
            <>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white"
                    onClick={handlePrevious}
                >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous Image</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white"
                    onClick={handleNext}
                >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next Image</span>
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                    {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={cn(
                        'h-2 w-2 rounded-full transition-all bg-white/50',
                        currentIndex === index ? 'w-4 bg-white' : 'hover:bg-white/75'
                        )}
                        aria-label={`Go to image ${index + 1}`}
                    />
                    ))}
                </div>
            </>
        )}

      </DialogContent>
    </Dialog>
  );
}
