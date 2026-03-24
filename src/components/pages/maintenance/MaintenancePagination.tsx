import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function MaintenancePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
          <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </p>

        <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>

      <div className="flex w-full items-center justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
