
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from '../styles/blogs.module.css';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('page', String(page));
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    }
  };

  return (
    <nav className={styles.pagination}>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        &larr;
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        &rarr;
      </button>
    </nav>
  );
}
