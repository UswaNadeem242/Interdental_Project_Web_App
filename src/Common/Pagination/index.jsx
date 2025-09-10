import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-end">
        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md"
        >
          {/* Prev button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-[#001D58] relative inline-flex items-center rounded-l-md rounded-lg px-2 py-2  inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                aria-current={pageNum === currentPage ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                  pageNum === currentPage
                    ? "z-10 rounded-lg bg-indigo-500 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    : "text-[#001D58] inset-ring inset-ring-gray-700 hover:bg-white/5 focus:outline-offset-0"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-blue-900 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}
