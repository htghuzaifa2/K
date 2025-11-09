
'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/blogs.module.css';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/blogs?page=${page}`);
    }
  };

  return (
    <nav className={styles.pagination}>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        &larr;
      </button>
      <span>
        {currentPage}
      </span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        &rarr;
      </button>
    </nav>
  );
}
