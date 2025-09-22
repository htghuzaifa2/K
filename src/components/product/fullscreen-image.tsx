'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type FullscreenImageProps = {
  imageUrl: string | null;
  onOpenChange: (open: boolean) => void;
};

export function FullscreenImage({ imageUrl, onOpenChange }: FullscreenImageProps) {
  return (
    <Dialog open={!!imageUrl} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen max-h-screen w-screen max-w-full border-0 bg-black/80 p-4 backdrop-blur-sm">
        <VisuallyHidden>
            <DialogTitle>Fullscreen Product Image</DialogTitle>
            <DialogDescription>
                A larger view of the product image. Press escape to close.
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
      </DialogContent>
    </Dialog>
  );
}
