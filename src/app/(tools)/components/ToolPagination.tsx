
'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/tools.module.css';

interface ToolPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ToolPagination({ currentPage, totalPages }: ToolPaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/tools?page=${page}`);
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
