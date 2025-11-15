
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { performSearch } from '@/lib/search-utils';
import { useDebounce } from 'use-debounce';
import type { BlogPost } from '@/lib/blog-data';
import BlogCard from './BlogCard';
import BlogPagination from './BlogPagination';
import { ProductGridSkeleton } from '@/components/product/product-grid-skeleton';

interface BlogSearchProps {
  allPosts: BlogPost[];
  itemsPerPage: number;
}

export default function BlogSearch({ allPosts, itemsPerPage }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (allPosts.length > 0) {
      setIsLoading(false);
    }
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (!debouncedQuery) return allPosts;
    return performSearch(debouncedQuery, allPosts);
  }, [debouncedQuery, allPosts]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (isLoading) {
    return <ProductGridSkeleton />;
  }
  
  return (
    <div className="space-y-8">
      <input
        className="mx-auto block w-full max-w-lg rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for posts by title..."
      />

      <div>
        {currentPosts.length > 0 ? (
            <>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {currentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="mt-12">
                    <BlogPagination currentPage={page} totalPages={totalPages} />
                </div>
            )}
            </>
        ) : (
            <div className="text-center py-16">
            <h2 className="text-xl font-semibold">No posts found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
            </div>
        )}
      </div>
    </div>
  );
}
