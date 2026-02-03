import Link from "next/link";
import { cn } from "@/lib/classnames";
import { buttonStyles } from "@/lib/theme";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

const range = (current: number, total: number) => {
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export function Pagination({ currentPage, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Link
        className={cn(buttonStyles.base, buttonStyles.ghost, currentPage === 1 && "pointer-events-none opacity-50")}
        href={buildHref(Math.max(currentPage - 1, 1))}
      >
        Prev
      </Link>
      {range(currentPage, totalPages).map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={cn(
            buttonStyles.base,
            page === currentPage ? buttonStyles.primary : buttonStyles.ghost,
            "h-9 w-9 rounded-full px-0"
          )}
        >
          {page}
        </Link>
      ))}
      <Link
        className={cn(
          buttonStyles.base,
          buttonStyles.ghost,
          currentPage === totalPages && "pointer-events-none opacity-50"
        )}
        href={buildHref(Math.min(currentPage + 1, totalPages))}
      >
        Next
      </Link>
    </nav>
  );
}
