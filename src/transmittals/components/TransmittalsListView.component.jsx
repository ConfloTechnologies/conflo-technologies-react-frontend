import React, { useState, useRef, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Pagination from '../../common/components/Pagination.component';

const transmittals = [
    { id: 1, title: "Initial Planning", status: "Pending", createdDate: "2023-10-01", createdBy: "John Doe", sentTo: "Client A" },
    { id: 2, title: "Budget Review", status: "Approved", createdDate: "2023-10-02", createdBy: "Jane Smith", sentTo: "Client B" },
    { id: 3, title: "Safety Standards", status: "Rejected", createdDate: "2023-10-03", createdBy: "Alice Johnson", sentTo: "Client C" },
    { id: 4, title: "Compliance Check", status: "Pending", createdDate: "2023-10-04", createdBy: "Michael Brown", sentTo: "Client D" },
    { id: 5, title: "Project Expansion", status: "Approved", createdDate: "2023-10-05", createdBy: "Claire Davis", sentTo: "Client E" },
    { id: 6, title: "Resource Allocation", status: "Pending", createdDate: "2023-10-06", createdBy: "Edward Wilson", sentTo: "Client F" },
    { id: 7, title: "Quarterly Review", status: "Approved", createdDate: "2023-10-07", createdBy: "Nancy Moore", sentTo: "Client G" },
    { id: 8, title: "New Regulations", status: "Rejected", createdDate: "2023-10-08", createdBy: "Daniel Taylor", sentTo: "Client H" },
    { id: 9, title: "Stakeholder Meeting", status: "Approved", createdDate: "2023-10-09", createdBy: "Laura Martinez", sentTo: "Client I" },
    { id: 10, title: "Technology Integration", status: "Pending", createdDate: "2023-10-10", createdBy: "Kevin Garcia", sentTo: "Client J" },
    { id: 11, title: "Supplier Contracts", status: "Rejected", createdDate: "2023-10-11", createdBy: "Sara White", sentTo: "Client K" },
    { id: 12, title: "Annual Goals", status: "Approved", createdDate: "2023-10-12", createdBy: "Linda Thomas", sentTo: "Client L" },
    { id: 13, title: "Risk Management", status: "Pending", createdDate: "2023-10-13", createdBy: "Barbara Jackson", sentTo: "Client M" },
    { id: 14, title: "Client Feedback", status: "Rejected", createdDate: "2023-10-14", createdBy: "Susan Lee", sentTo: "Client N" },
    { id: 15, title: "Performance Evaluation", status: "Approved", createdDate: "2023-10-15", createdBy: "Robert Harris", sentTo: "Client O" },
    { id: 16, title: "Final Inspection", status: "Pending", createdDate: "2023-10-16", createdBy: "Patricia Clark", sentTo: "Client P" },
    { id: 17, title: "Environmental Concerns", status: "Approved", createdDate: "2023-10-17", createdBy: "Jennifer Lewis", sentTo: "Client Q" },
    { id: 18, title: "Market Trends", status: "Rejected", createdDate: "2023-10-18", createdBy: "William Young", sentTo: "Client R" },
    { id: 19, title: "Innovation Workshop", status: "Pending", createdDate: "2023-10-19", createdBy: "Jessica Hall", sentTo: "Client S" },
    { id: 20, title: "Expansion Plans", status: "Approved", createdDate: "2023-10-20", createdBy: "Thomas Allen", sentTo: "Client T" },
    { id: 21, title: "Initial Planning Follow-up", status: "Pending", createdDate: "2023-10-21", createdBy: "John Doe", sentTo: "Client U" },
    { id: 22, title: "Budget Review Second Round", status: "Approved", createdDate: "2023-10-22", createdBy: "Jane Smith", sentTo: "Client V" },
    { id: 23, title: "Safety Review Update", status: "Rejected", createdDate: "2023-10-23", createdBy: "Alice Johnson", sentTo: "Client W" },
    { id: 24, title: "Regulatory Compliance", status: "Pending", createdDate: "2023-10-24", createdBy: "Michael Brown", sentTo: "Client X" },
    { id: 25, title: "Expansion Phase II", status: "Approved", createdDate: "2023-10-25", createdBy: "Claire Davis", sentTo: "Client Y" },
    { id: 26, title: "Resource Reallocation", status: "Pending", createdDate: "2023-10-26", createdBy: "Edward Wilson", sentTo: "Client Z" },
    { id: 27, title: "Annual Review Preparation", status: "Approved", createdDate: "2023-10-27", createdBy: "Nancy Moore", sentTo: "Client AA" },
    { id: 28, title: "Regulatory Update Discussion", status: "Rejected", createdDate: "2023-10-28", createdBy: "Daniel Taylor", sentTo: "Client BB" },
    { id: 29, title: "Client Roundtable", status: "Approved", createdDate: "2023-10-29", createdBy: "Laura Martinez", sentTo: "Client CC" },
    { id: 30, title: "Tech System Overhaul", status: "Pending", createdDate: "2023-10-30", createdBy: "Kevin Garcia", sentTo: "Client DD" },
    { id: 31, title: "Supplier Agreement Renegotiation", status: "Rejected", createdDate: "2023-10-31", createdBy: "Sara White", sentTo: "Client EE" },
    { id: 32, title: "Goal Setting for Next Year", status: "Approved", createdDate: "2023-11-01", createdBy: "Linda Thomas", sentTo: "Client FF" },
    { id: 33, title: "Risk Assessment Update", status: "Pending", createdDate: "2023-11-02", createdBy: "Barbara Jackson", sentTo: "Client GG" },
    { id: 34, title: "Feedback Implementation Plan", status: "Rejected", createdDate: "2023-11-03", createdBy: "Susan Lee", sentTo: "Client HH" },
    { id: 35, title: "Yearly Performance Analysis", status: "Approved", createdDate: "2023-11-04", createdBy: "Robert Harris", sentTo: "Client II" },
    { id: 36, title: "Final Project Inspection", status: "Pending", createdDate: "2023-11-05", createdBy: "Patricia Clark", sentTo: "Client JJ" },
    { id: 37, title: "Environmental Impact Report", status: "Approved", createdDate: "2023-11-06", createdBy: "Jennifer Lewis", sentTo: "Client KK" },
    { id: 38, title: "Market Analysis Briefing", status: "Rejected", createdDate: "2023-11-07", createdBy: "William Young", sentTo: "Client LL" },
    { id: 39, title: "Innovative Strategies Workshop", status: "Pending", createdDate: "2023-11-08", createdBy: "Jessica Hall", sentTo: "Client MM" },
    { id: 40, title: "Strategic Expansion Planning", status: "Approved", createdDate: "2023-11-09", createdBy: "Thomas Allen", sentTo: "Client NN" }
  ];
  
      


export default function TransmittalsListView() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalItems = transmittals.length;
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentTransmittals = sortTransmittalsDescending(transmittals).slice(firstPageIndex, lastPageIndex);
  const tableContainerRef = useRef(null);

  function sortTransmittalsDescending(meetings) {
    return meetings.sort((a, b) => b.id - a.id);
  }

  function handleViewTransmittalClick() {
    console.log("Open View Meeting");
  }

  function handlePageChange(newPage) {
    console.log("Page change initiated");
    setCurrentPage(newPage);
  }

  function scrollToFirstRow() {
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
      <thead className="bg-gray-100 sm:sticky sm:top-0" >
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
            className="py-2 text-left text-sm font-semibold text-gray-900 px-4 md:px-0 "
          >
            Status
          </th>
          <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
           Submission date
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
            Sent to
          </th>
          <th scope="col" className="relative py-2 px-4" />
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {currentTransmittals.map((transmittal, idx) => (
          <tr key={`transmittal-${idx}`}>
            <td
              className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left hidden sm:table-cell"
            >
              {transmittal.id}
            </td>
            <td
              className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left"
            >
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
}






