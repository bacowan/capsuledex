interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 px-4 md:px-6 py-4">
      <button
        disabled={currentPage <= 1}
        className="h-8 w-8 flex items-center justify-center rounded-lg border border-edge text-fg-muted text-sm hover:bg-subtle disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Previous page"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={
            page === currentPage
              ? "h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium bg-brand text-white cursor-pointer"
              : "h-8 w-8 flex items-center justify-center rounded-lg border border-edge text-sm text-fg-secondary hover:bg-subtle cursor-pointer"
          }
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage >= totalPages}
        className="h-8 w-8 flex items-center justify-center rounded-lg border border-edge text-fg-muted text-sm hover:bg-subtle disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Next page"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
