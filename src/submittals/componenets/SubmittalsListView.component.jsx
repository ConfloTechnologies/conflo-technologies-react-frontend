import React, { useState, useRef, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Pagination from './Pagination.component';
import { maxHeight } from '@mui/system';


    const submittals = [
        { id: 1, revision: 0, title: "Initial Planning", status: "Pending", submittalDate: "2023-10-01", submittedBy: "John Doe" },
        { id: 2, revision: 1, title: "Budget Review", status: "Approved", submittalDate: "2023-10-02", submittedBy: "Jane Smith" },
        { id: 3, revision: 0, title: "Safety Standards", status: "Rejected", submittalDate: "2023-10-03", submittedBy: "Alice Johnson" },
        { id: 4, revision: 2, title: "Compliance Check", status: "Pending", submittalDate: "2023-10-04", submittedBy: "Michael Brown" },
        { id: 5, revision: 1, title: "Project Expansion", status: "Approved", submittalDate: "2023-10-05", submittedBy: "Claire Davis" },
        { id: 6, revision: 0, title: "Resource Allocation", status: "Pending", submittalDate: "2023-10-06", submittedBy: "Edward Wilson" },
        { id: 7, revision: 3, title: "Quarterly Review", status: "Approved", submittalDate: "2023-10-07", submittedBy: "Nancy Moore" },
        { id: 8, revision: 0, title: "New Regulations", status: "Rejected", submittalDate: "2023-10-08", submittedBy: "Daniel Taylor" },
        { id: 9, revision: 2, title: "Stakeholder Meeting", status: "Approved", submittalDate: "2023-10-09", submittedBy: "Laura Martinez" },
        { id: 10, revision: 0, title: "Technology Integration", status: "Pending", submittalDate: "2023-10-10", submittedBy: "Kevin Garcia" },
        { id: 11, revision: 1, title: "Supplier Contracts", status: "Rejected", submittalDate: "2023-10-11", submittedBy: "Sara White" },
        { id: 12, revision: 0, title: "Annual Goals", status: "Approved", submittalDate: "2023-10-12", submittedBy: "Linda Thomas" },
        { id: 13, revision: 2, title: "Risk Management", status: "Pending", submittalDate: "2023-10-13", submittedBy: "Barbara Jackson" },
        { id: 14, revision: 0, title: "Client Feedback", status: "Rejected", submittalDate: "2023-10-14", submittedBy: "Susan Lee" },
        { id: 15, revision: 3, title: "Performance Evaluation", status: "Approved", submittalDate: "2023-10-15", submittedBy: "Robert Harris" },
        { id: 16, revision: 1, title: "Final Inspection", status: "Pending", submittalDate: "2023-10-16", submittedBy: "Patricia Clark" },
        { id: 17, revision: 0, title: "Environmental Concerns", status: "Approved", submittalDate: "2023-10-17", submittedBy: "Jennifer Lewis" },
        { id: 18, revision: 2, title: "Market Trends", status: "Rejected", submittalDate: "2023-10-18", submittedBy: "William Young" },
        { id: 19, revision: 1, title: "Innovation Workshop", status: "Pending", submittalDate: "2023-10-19", submittedBy: "Jessica Hall" },
        { id: 20, revision: 0, title: "Expansion Plans", status: "Approved", submittalDate: "2023-10-20", submittedBy: "Thomas Allen" },
        { id: 21, revision: 0, title: "Initial Planning", status: "Pending", submittalDate: "2023-10-01", submittedBy: "John Doe" },
        { id: 22, revision: 1, title: "Budget Review", status: "Approved", submittalDate: "2023-10-02", submittedBy: "Jane Smith" },
        { id: 23, revision: 0, title: "Safety Standards", status: "Rejected", submittalDate: "2023-10-03", submittedBy: "Alice Johnson" },
        { id: 24, revision: 2, title: "Compliance Check", status: "Pending", submittalDate: "2023-10-04", submittedBy: "Michael Brown" },
        { id: 25, revision: 1, title: "Project Expansion", status: "Approved", submittalDate: "2023-10-05", submittedBy: "Claire Davis" },
        { id: 26, revision: 0, title: "Resource Allocation", status: "Pending", submittalDate: "2023-10-06", submittedBy: "Edward Wilson" },
        { id: 27, revision: 3, title: "Quarterly Review", status: "Approved", submittalDate: "2023-10-07", submittedBy: "Nancy Moore" },
        { id: 28, revision: 0, title: "New Regulations", status: "Rejected", submittalDate: "2023-10-08", submittedBy: "Daniel Taylor" },
        { id: 29, revision: 2, title: "Stakeholder Meeting", status: "Approved", submittalDate: "2023-10-09", submittedBy: "Laura Martinez" },
        { id: 30, revision: 0, title: "Technology Integration", status: "Pending", submittalDate: "2023-10-10", submittedBy: "Kevin Garcia" },
        { id: 31, revision: 1, title: "Supplier Contracts", status: "Rejected", submittalDate: "2023-10-11", submittedBy: "Sara White" },
        { id: 32, revision: 0, title: "Annual Goals", status: "Approved", submittalDate: "2023-10-12", submittedBy: "Linda Thomas" },
        { id: 33, revision: 2, title: "Risk Management", status: "Pending", submittalDate: "2023-10-13", submittedBy: "Barbara Jackson" },
        { id: 34, revision: 0, title: "Client Feedback", status: "Rejected", submittalDate: "2023-10-14", submittedBy: "Susan Lee" },
        { id: 35, revision: 3, title: "Performance Evaluation", status: "Approved", submittalDate: "2023-10-15", submittedBy: "Robert Harris" },
        { id: 36, revision: 1, title: "Final Inspection", status: "Pending", submittalDate: "2023-10-16", submittedBy: "Patricia Clark" },
        { id: 37, revision: 0, title: "Environmental Concerns", status: "Approved", submittalDate: "2023-10-17", submittedBy: "Jennifer Lewis" },
        { id: 38, revision: 2, title: "Market Trends", status: "Rejected", submittalDate: "2023-10-18", submittedBy: "William Young" },
        { id: 39, revision: 1, title: "Innovation Workshop", status: "Pending", submittalDate: "2023-10-19", submittedBy: "Jessica Hall" },
        { id: 40, revision: 0, title: "Expansion Plans", status: "Approved", submittalDate: "2023-10-20", submittedBy: "Thomas Allen" }
      ];
      


export default function SubmittalsListView() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalItems = submittals.length;
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentsubmittals = sortSubmittalsDescending(submittals).slice(firstPageIndex, lastPageIndex);
  const tableContainerRef = useRef(null);

  function sortSubmittalsDescending(meetings) {
    return meetings.sort((a, b) => b.id - a.id);
  }

  function handleViewSubmittalClick() {
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
            className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4 hidden md:table-cell"
          >
            Submittal #
          </th>
          <th
            scope="col"
            className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4 hidden md:table-cell"
          >
            Revision #
          </th>
          <th
            scope="col"
            className="py-2 text-left text-sm font-semibold text-gray-900 px-4 md:px-0 hidden sm:table-cell"
          >
            Title
          </th>
          <th
            scope="col"
            className="py-2 text-left text-sm font-semibold text-gray-900 px-4 sm:px-0"
          >
            Status
          </th>
          <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900">
           Submission Date
          </th>
          <th
            scope="col"
            className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell"
          >
            Submitted By
          </th>
          <th scope="col" className="relative py-2 px-4" />
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {currentsubmittals.map((submittal, idx) => (
          <tr key={`submittal-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-white'}>
            <td
              className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left hidden md:table-cell"
            >
              {submittal.id}
            </td>
            <td
              className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left hidden sm:table-cell"
            >
              {submittal.revision}
            </td>
            <td className="hitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0">
              {submittal.title}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0">
              {submittal.status}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden md:table-cell">
              {submittal.submittalDate}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden xl:table-cell">
                {submittal.submittedBy}
            </td>
            <td className="whitespace-nowrap pr-4 py-2 text-right text-sm font-medium">
              <button
                className="text-blue-600 hover:text-blue-900"
                onClick={() => handleViewSubmittalClick(submittal.id)}
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






