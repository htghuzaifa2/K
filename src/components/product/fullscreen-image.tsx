'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';

type FullscreenImageProps = {
  imageUrl: string | null;
  onOpenChange: (open: boolean) => void;
};

export function FullscreenImage({ imageUrl, onOpenChange }: FullscreenImageProps) {
  return (
    <Dialog open={!!imageUrl} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen max-h-screen w-screen max-w-full border-0 bg-black/80 p-4 backdrop-blur-sm">
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
