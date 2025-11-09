
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { performSearch } from '@/lib/search-utils';
import { useDebounce } from 'use-debounce';
import styles from '../styles/blogs.module.css';
import type { BlogPost } from '@/lib/blog-data';
import BlogCard from './BlogCard';
import BlogPagination from './BlogPagination';

interface BlogSearchProps {
  allPosts: BlogPost[];
  itemsPerPage: number;
}

export default function BlogSearch({ allPosts, itemsPerPage }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const filteredPosts = useMemo(() => {
    if (!debouncedQuery) return allPosts;
    return performSearch(debouncedQuery, allPosts);
  }, [debouncedQuery, allPosts]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
    }
  }, [page]);
  
  return (
    <>
      <input
        className={styles.searchInput}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for posts by title..."
      />

      <main className={styles.main}>
        {currentPosts.length > 0 ? (
            <>
            <div className={styles.grid}>
                {currentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
                ))}
            </div>
            {totalPages > 1 && (
                <BlogPagination currentPage={page} totalPages={totalPages} />
            )}
            </>
        ) : (
            <div className={styles.noResults}>
            <h2>No posts found</h2>
            <p>Try adjusting your search query.</p>
            </div>
        )}
      </main>
    </>
  );
}
