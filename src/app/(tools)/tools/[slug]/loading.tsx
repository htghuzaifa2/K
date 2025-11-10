
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose dark:prose-invert mx-auto max-w-4xl">
            <Skeleton className="h-6 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-2" />
            
            <div className="space-y-4 my-8">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
            </div>

            <Skeleton className="h-32 w-full mt-8 border-2 border-dashed border-border rounded-xl" />
        </div>
    </div>
  );
}
