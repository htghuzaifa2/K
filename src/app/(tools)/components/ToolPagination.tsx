
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ToolPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ToolPagination({ currentPage, totalPages }: ToolPaginationProps) {
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
    <nav className="flex items-center justify-center gap-2">
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        &larr;
        <span className="sr-only">Previous page</span>
      </button>
      <span className="flex h-10 items-center justify-center rounded-lg border border-primary bg-primary px-4 text-sm font-medium text-primary-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border bg-card transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        &rarr;
        <span className="sr-only">Next page</span>
      </button>
    </nav>
  );
}
