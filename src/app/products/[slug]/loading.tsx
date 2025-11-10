
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

export default function Loading() {
  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Skeleton className="aspect-square w-full" />
            <div className="mt-4 flex justify-center gap-2">
              <Skeleton className="h-2 w-8" />
              <Skeleton className="h-2 w-2" />
              <Skeleton className="h-2 w-2" />
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-10 w-1/4" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
            </div>
            
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 flex-grow" />
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-12" />
            </div>

            <div className="space-y-4 pt-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Separator className="my-12" />
        <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
        <ProductGridSkeleton />
      </div>
    </>
  );
}
