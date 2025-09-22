
'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useEffect, useState, type ComponentProps } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type FullscreenImageProps = {
  images: string[];
  startIndex: number | null;
  onOpenChange: (open: boolean) => void;
};

export function FullscreenImage({ images, startIndex, onOpenChange }: FullscreenImageProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (startIndex !== null) {
      setCurrent(startIndex);
      if (api) {
        api.scrollTo(startIndex, true);
      }
    }
  }, [startIndex, api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const isOpen = startIndex !== null;
  
  if (!isOpen) {
    return null;
  }

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen max-h-screen w-screen max-w-full border-0 bg-black/80 p-0 text-white backdrop-blur-sm">
        <VisuallyHidden>
            <DialogTitle>Fullscreen Product Image</DialogTitle>
            <DialogDescription>
                A larger view of the product image. Use arrow buttons or dots to navigate. Press escape to close.
            </DialogDescription>
        </VisuallyHidden>
        
        <div className="relative h-full w-full">
            <Carousel 
                setApi={setApi} 
                className="h-full w-full"
                opts={{
                    loop: true,
                    startIndex: startIndex ?? 0,
                }}
            >
                <CarouselContent className="h-full">
                    {images.map((img, index) => (
                        <CarouselItem key={index} className="h-full">
                            <div className="relative h-full w-full flex items-center justify-center">
                                <Image
                                    src={img}
                                    alt={`Fullscreen product view ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
                {images.length > 1 && (
                    <>
                        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white" />
                        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                            {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={cn(
                                'h-2 w-2 rounded-full transition-all bg-white/50',
                                current === index ? 'w-4 bg-white' : 'hover:bg-white/75'
                                )}
                                aria-label={`Go to image ${index + 1}`}
                            />
                            ))}
                        </div>
                    </>
                )}
            </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
