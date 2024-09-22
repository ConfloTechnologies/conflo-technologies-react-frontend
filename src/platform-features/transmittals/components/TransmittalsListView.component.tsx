import React, { useState, useRef, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Pagination from '../../../common/components/Pagination.component';
import transmittals from '../../../mock-data/TransmittalsMockData';
import { Transmittal } from  '../../../types/transmittals';


const TransmittalsListView: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 50;
    const totalItems = transmittals.length;
    const lastPageIndex = currentPage * itemsPerPage;
    const firstPageIndex = lastPageIndex - itemsPerPage;
    const currentTransmittals = sortTransmittalsDescending(transmittals).slice(firstPageIndex, lastPageIndex);

    // Define the ref type as HTMLDivElement
    const tableContainerRef = useRef<HTMLDivElement>(null);

    // Function to sort transmittals in descending order
    function sortTransmittalsDescending(transmittals: Transmittal[]): Transmittal[] {
        return transmittals.sort((a, b) => b.id - a.id);
    }

    // Function to handle view transmittal click
    function handleViewTransmittalClick(id: number): void {
        console.log("Open View Meeting for Transmittal ID:", id);
    }

    // Function to handle page change
    function handlePageChange(newPage: number): void {
        console.log("Page change initiated to", newPage);
        setCurrentPage(newPage);
    }

    // Scroll to the first row of the table on page change
    function scrollToFirstRow(): void {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop = 0;
        }
    }

    useEffect(() => {
        scrollToFirstRow();
    }, [currentPage]);

    return (
        <>
            <div ref={tableContainerRef} className="h-full pb-16 sm:pb-4 sm:max-h-[500px] sm:overflow-y-auto">
                <table className="min-w-full rounded-corners">
                    <thead className="bg-gray-100 sm:sticky sm:top-0">
                    <tr>
                        <th
                            scope="col"
                            className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4 hidden sm:table-cell"
                        >
                            Transmittal #
                        </th>
                        <th
                            scope="col"
                            className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="py-2 text-left text-sm font-semibold text-gray-900 px-4 md:px-0"
                        >
                            Status
                        </th>
                        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                            Submission Date
                        </th>
                        <th
                            scope="col"
                            className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell"
                        >
                            Submitted By
                        </th>
                        <th
                            scope="col"
                            className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell"
                        >
                            Sent To
                        </th>
                        <th scope="col" className="relative py-2 px-4" />
                    </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                    {currentTransmittals.map((transmittal) => (
                        <tr key={transmittal.id}>
                            <td className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left hidden sm:table-cell">
                                {transmittal.id}
                            </td>
                            <td className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left">
                                {transmittal.title}
                            </td>
                            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0">
                                {transmittal.status}
                            </td>
                            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden md:table-cell">
                                {transmittal.createdDate}
                            </td>
                            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden xl:table-cell">
                                {transmittal.createdBy}
                            </td>
                            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden xl:table-cell">
                                {transmittal.sentTo}
                            </td>
                            <td className="whitespace-nowrap pr-4 py-2 text-right text-sm font-medium">
                                <button
                                    className="text-blue-600 hover:text-blue-900"
                                    onClick={() => handleViewTransmittalClick(transmittal.id)}
                                >
                                    <p className="hidden sm:block">View</p>
                                    <span className="sm:hidden">
                      <InfoOutlinedIcon />
                    </span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default TransmittalsListView;
