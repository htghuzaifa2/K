
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getBlogPosts, type BlogPost } from '@/lib/blog-data';
import { performSearch } from '@/lib/search-utils';
import BlogSearch from '../components/BlogSearch';
import BlogCard from '../components/BlogCard';
import BlogPagination from '../components/BlogPagination';
import styles from '../styles/blogs.module.css';

const ITEMS_PER_PAGE = 20;

export default function BlogsPage() {
  const [allPosts] = useState(() => getBlogPosts());
  const [query, setQuery] = useState('');
  
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const filteredPosts = useMemo(() => {
    return performSearch(query, allPosts);
  }, [query, allPosts]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    // This is a client component, so we can safely access window
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <header className={styles.hero}>
        <h1>Our Blog</h1>
        <p>Articles, tutorials, and insights on the latest in technology.</p>
        <div className={styles.searchContainer}>
          <BlogSearch onSearch={setQuery} />
        </div>
      </header>

      {filteredPosts.length > 0 ? (
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
    </>
  );
}
