import { getBlogPosts } from '@/lib/blog-data';
import BlogSearch from '../components/BlogSearch';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ITEMS_PER_PAGE = 20;

function BlogPageSkeleton() {
  return (
    <div className="space-y-8">
        <Skeleton className="h-10 w-full max-w-lg mx-auto" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <Skeleton className="h-6 w-full rounded-md" />
              </div>
            ))}
        </div>
    </div>
  )
}

export default function BlogsPage() {
  const allPosts = getBlogPosts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center py-16 border-b">
        <h1 className="text-5xl font-extrabold text-primary tracking-tight">Insights & Ideas</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Your source for tech trends, expert tutorials, and design inspiration.</p>
      </header>
      <main className="py-8">
        <Suspense fallback={<BlogPageSkeleton />}>
          <BlogSearch allPosts={allPosts} itemsPerPage={ITEMS_PER_PAGE} />
        </Suspense>
      </main>
    </div>
  );
}
