import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
            ))}
        </div>
    )
}
