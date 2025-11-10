
'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTools, type Tool } from '@/lib/tool-data';
import { performSearch } from '@/lib/search-utils';
import ToolSearch from './components/ToolSearch';
import ToolCard from './components/ToolCard';
import ToolPagination from './components/ToolPagination';
import { Skeleton } from '@/components/ui/skeleton';

const ITEMS_PER_PAGE = 20;

function ToolsList() {
  const [allTools] = useState(() => getTools());
  const [query, setQuery] = useState('');
  
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const filteredTools = useMemo(() => {
    if (!query) return allTools;
    return performSearch(query, allTools);
  }, [query, allTools]);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const currentTools = filteredTools.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="space-y-8">
      <ToolSearch onSearch={setQuery} />
        {currentTools.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {currentTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-12">
                <ToolPagination currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold">No tools found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
          </div>
        )}
    </div>
  );
}

function ToolsPageSkeleton() {
    return (
        <div className="space-y-8">
            <Skeleton className="h-10 w-full max-w-lg mx-auto" />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-video w-full rounded-xl" />
                ))}
            </div>
        </div>
    );
}

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center py-16 border-b">
        <h1 className="text-5xl font-extrabold text-primary tracking-tight">The Modern Toolkit</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A curated suite of utilities designed to accelerate your creative workflow.</p>
      </header>
      <main className="py-8">
         <Suspense fallback={<ToolsPageSkeleton />}>
            <ToolsList />
         </Suspense>
      </main>
    </div>
  );
}
