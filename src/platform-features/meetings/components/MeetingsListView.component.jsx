import React, { useState, useRef, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Pagination from '../../../common/components/Pagination.component';

const meetings = [
  { id: 1, series: "Alpha Series", title: "Initial Planning", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", meetingDate: "2023-10-01" },
  { id: 2, series: "Beta Series", title: "Budget Review", description: "Pellentesque habitant morbi tristique senectus et netus.", meetingDate: "2023-10-02" },
  { id: 3, series: "Gamma Series", title: "Safety Standards", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", meetingDate: "2023-10-03" },
  { id: 4, series: "Delta Series", title: "Compliance Check", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.", meetingDate: "2023-10-04" },
  { id: 5, series: "Epsilon Series", title: "Project Expansion", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.", meetingDate: "2023-10-05" },
  { id: 6, series: "Zeta Series", title: "Resource Allocation", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", meetingDate: "2023-10-06" },
  { id: 7, series: "Eta Series", title: "Quarterly Review", description: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.", meetingDate: "2023-10-07" },
  { id: 8, series: "Theta Series", title: "New Regulations", description: "Integer tempor. Risus eget urna mollis ornare vel eu leo.", meetingDate: "2023-10-08" },
  { id: 9, series: "Iota Series", title: "Stakeholder Meeting", description: "Vivamus dapibus rutrum mi ut aliquam. In hac habitasse platea dictumst.", meetingDate: "2023-10-09" },
  { id: 10, series: "Kappa Series", title: "Technology Integration", description: "Praesent luctus fermentum commodo. Sed non velit nec nisi vulputate nonummy.", meetingDate: "2023-10-10" },
  { id: 11, series: "Lambda Series", title: "Supplier Contracts", description: "Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.", meetingDate: "2023-10-11" },
  { id: 12, series: "Mu Series", title: "Annual Goals", description: "Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.", meetingDate: "2023-10-12" },
  { id: 13, series: "Nu Series", title: "Risk Management", description: "In dui magna, posuere eget, vestibulum et, tempor auctor, justo.", meetingDate: "2023-10-13" },
  { id: 14, series: "Xi Series", title: "Client Feedback", description: "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", meetingDate: "2023-10-14" },
  { id: 15, series: "Omicron Series", title: "Performance Evaluation", description: "Proin interdum mauris non ligula pellentesque ultrices.", meetingDate: "2023-10-15" },
  { id: 16, series: "Pi Series", title: "Final Inspection", description: "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.", meetingDate: "2023-10-16" },
  { id: 17, series: "Rho Series", title: "Environmental Concerns", description: "Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.", meetingDate: "2023-10-17" },
  { id: 18, series: "Sigma Series", title: "Market Trends", description: "Nam eget dui. Etiam rhoncus.", meetingDate: "2023-10-18" },
  { id: 19, series: "Tau Series", title: "Innovation Workshop", description: "Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.", meetingDate: "2023-10-19" },
  { id: 20, series: "Upsilon Series", title: "Expansion Plans", description: "Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.", meetingDate: "2023-10-20" },
  { id: 21, series: "Alpha Series", title: "Initial Planning", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", meetingDate: "2023-10-01" },
  { id: 22, series: "Beta Series", title: "Budget Review", description: "Pellentesque habitant morbi tristique senectus et netus.", meetingDate: "2023-10-02" },
  { id: 23, series: "Gamma Series", title: "Safety Standards", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", meetingDate: "2023-10-03" },
  { id: 24, series: "Delta Series", title: "Compliance Check", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.", meetingDate: "2023-10-04" },
  { id: 25, series: "Epsilon Series", title: "Project Expansion", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.", meetingDate: "2023-10-05" },
  { id: 26, series: "Zeta Series", title: "Resource Allocation", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", meetingDate: "2023-10-06" },
  { id: 27, series: "Eta Series", title: "Quarterly Review", description: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.", meetingDate: "2023-10-07" },
  { id: 28, series: "Theta Series", title: "New Regulations", description: "Integer tempor. Risus eget urna mollis ornare vel eu leo.", meetingDate: "2023-10-08" },
  { id: 29, series: "Iota Series", title: "Stakeholder Meeting", description: "Vivamus dapibus rutrum mi ut aliquam. In hac habitasse platea dictumst.", meetingDate: "2023-10-09" },
  { id: 30, series: "Kappa Series", title: "Technology Integration", description: "Praesent luctus fermentum commodo. Sed non velit nec nisi vulputate nonummy.", meetingDate: "2023-10-10" },
  { id: 31, series: "Lambda Series", title: "Supplier Contracts", description: "Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.", meetingDate: "2023-10-11" },
  { id: 32, series: "Mu Series", title: "Annual Goals", description: "Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.", meetingDate: "2023-10-12" },
  { id: 33, series: "Nu Series", title: "Risk Management", description: "In dui magna, posuere eget, vestibulum et, tempor auctor, justo.", meetingDate: "2023-10-13" },
  { id: 34, series: "Xi Series", title: "Client Feedback", description: "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", meetingDate: "2023-10-14" },
  { id: 35, series: "Omicron Series", title: "Performance Evaluation", description: "Proin interdum mauris non ligula pellentesque ultrices.", meetingDate: "2023-10-15" },
  { id: 36, series: "Pi Series", title: "Final Inspection", description: "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.", meetingDate: "2023-10-16" },
  { id: 37, series: "Rho Series", title: "Environmental Concerns", description: "Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.", meetingDate: "2023-10-17" },
  { id: 38, series: "Sigma Series", title: "Market Trends", description: "Nam eget dui. Etiam rhoncus.", meetingDate: "2023-10-18" },
  { id: 39, series: "Tau Series", title: "Innovation Workshop", description: "Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.", meetingDate: "2023-10-19" },
  { id: 40, series: "Upsilon Series", title: "Expansion Plans", description: "Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.", meetingDate: "2023-10-20" }
];


export default function MeetingsListView() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalItems = meetings.length;
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentMeetings = sortMeetingsDescending(meetings).slice(firstPageIndex, lastPageIndex);
  const tableContainerRef = useRef(null);

  function sortMeetingsDescending(meetings) {
    return meetings.sort((a, b) => b.id - a.id);
  }

  function handleViewMeetingClick() {
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
      <div ref={tableContainerRef} className="h-full pb-4 sm:max-h-[500px] sm:overflow-y-auto">
    <table className="min-w-full rounded-corners">
      <thead className="bg-gray-100 sm:sticky sm:top-0" >
        <tr>
          <th
            scope="col"
            className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4 hidden md:table-cell"
          >
            Meeting #
          </th>
          <th
            scope="col"
            className="py-2 text-left text-sm font-semibold text-gray-900 px-4 md:px-0 hidden sm:table-cell"
          >
            Series
          </th>
          <th
            scope="col"
            className="py-2 text-left text-sm font-semibold text-gray-900 px-4 sm:px-0"
          >
            Title
          </th>
          <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900">
            Meeting Date
          </th>
          <th
            scope="col"
            className="py-2 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell"
          >
            Description
          </th>
          <th scope="col" className="relative py-2 px-4" />
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {currentMeetings.map((meeting, idx) => (
          <tr key={`meeting-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-white'}>
            <td
              className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left hidden md:table-cell"
            >
              {meeting.id}
            </td>
            <td className="py-4 text-sm text-gray-500 text-left px-4 md:px-0 hidden sm:table-cell">
              {meeting.series}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0">
              {meeting.title}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left">
              {meeting.meetingDate}
            </td>
            <td
              className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden lg:table-cell"
              style={{
                maxWidth: '100px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  maxWidth: '100%',
                  display: 'inline-block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {meeting.description}
              </span>
            </td>
            <td className="whitespace-nowrap pr-4 py-2 text-right text-sm font-medium">
              <button
                className="text-blue-600 hover:text-blue-900"
                onClick={() => handleViewMeetingClick(meeting.id)}
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