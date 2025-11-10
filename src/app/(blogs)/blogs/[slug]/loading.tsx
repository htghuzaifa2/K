
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose dark:prose-invert mx-auto max-w-4xl">
            <Skeleton className="h-6 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-48 mb-10" />

            <div className="space-y-6">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-full" />

                <Skeleton className="h-8 w-1/2 mt-8 mb-4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />

                <Skeleton className="h-48 w-full my-6 rounded-md" />
                
                <Skeleton className="h-8 w-1/2 mt-8 mb-4" />
                <div className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </div>
            </div>
        </div>
    </div>
  );
}
