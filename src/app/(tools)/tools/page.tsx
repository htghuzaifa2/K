
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTools, type Tool } from '@/lib/tool-data';
import { performSearch } from '@/lib/search-utils';
import ToolSearch from '../components/ToolSearch';
import ToolCard from '../components/ToolCard';
import ToolPagination from '../components/ToolPagination';
import styles from '../styles/tools.module.css';

const ITEMS_PER_PAGE = 20;

export default function ToolsPage() {
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
    <>
      <header className={styles.hero}>
        <h1>Developer & Designer Tools</h1>
        <p>A curated collection of handy utilities to streamline your workflow.</p>
        <div className={styles.searchContainer}>
          <ToolSearch onSearch={setQuery} />
        </div>
      </header>

      {currentTools.length > 0 ? (
        <>
          <div className={styles.grid}>
            {currentTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          {totalPages > 1 && (
            <ToolPagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      ) : (
         <div className={styles.noResults}>
          <h2>No tools found</h2>
          <p>Try adjusting your search query.</p>
        </div>
      )}
    </>
  );
}
