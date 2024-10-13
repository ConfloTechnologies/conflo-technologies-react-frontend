import React, { forwardRef } from 'react';

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    itemTitle: string;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({
                                                                    itemsPerPage,
                                                                    totalItems,
                                                                    currentPage,
                                                                    onPageChange,
                                                                    itemTitle
                                                                }, ref) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <>
            <div ref={ref} >


        <nav
            aria-label="Pagination"
            className="fixed mt-10 inset-x-0 bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 sm:px-6"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                        {   (currentPage - 1) * itemsPerPage + 1}
                    </span>
                    {' '}to{' '}
                    <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, totalItems)}
                    </span>
                    {' '} of {' '}
                    <span className="font-medium">
                        {totalItems}
                    </span> 
                    {' '}
                    {itemTitle}
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages} 
                        className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Next
                    </button>
                </>
            </div>
        </nav>
            </div>
        </>
    );
});

export default Pagination;
