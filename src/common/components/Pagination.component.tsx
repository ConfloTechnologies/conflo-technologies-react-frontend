import React from 'react';

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <nav
            aria-label="Pagination"
            className="fixed ml-0 lg:ml-64 mt-10 inset-x-0 bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{' '}
                    to{' '}
                    <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{' '}
                    of <span className="font-medium">{totalItems}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                    Next
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
