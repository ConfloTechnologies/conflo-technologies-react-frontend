import React, { useState, useRef, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Pagination from '../../../common/components/Pagination.component';
import { maxHeight } from '@mui/system';


const RFIs = [
    { id: 1, title: "Foundation Specs", creationDate: "2023-10-01", status: "Open", submittedBy: "John Doe", assignedTo: "Engineer A" },
    { id: 2, title: "Electrical Schematics", creationDate: "2023-10-02", status: "Closed", submittedBy: "Jane Smith", assignedTo: "Engineer B" },
    { id: 3, title: "Plumbing Layout", creationDate: "2023-10-03", status: "In Review", submittedBy: "Alice Johnson", assignedTo: "Engineer C" },
    { id: 4, title: "HVAC Requirements", creationDate: "2023-10-04", status: "Open", submittedBy: "Michael Brown", assignedTo: "Engineer D" },
    { id: 5, title: "Roofing Materials", creationDate: "2023-10-05", status: "Closed", submittedBy: "Claire Davis", assignedTo: "Engineer E" },
    { id: 6, title: "Landscape Design", creationDate: "2023-10-06", status: "Open", submittedBy: "Edward Wilson", assignedTo: "Engineer F" },
    { id: 7, title: "Parking Lot Plan", creationDate: "2023-10-07", status: "In Review", submittedBy: "Nancy Moore", assignedTo: "Engineer G" },
    { id: 8, title: "Security Systems", creationDate: "2023-10-08", status: "Open", submittedBy: "Daniel Taylor", assignedTo: "Engineer H" },
    { id: 9, title: "Fire Safety Measures", creationDate: "2023-10-09", status: "Closed", submittedBy: "Laura Martinez", assignedTo: "Engineer I" },
    { id: 10, title: "Accessibility Features", creationDate: "2023-10-10", status: "Open", submittedBy: "Kevin Garcia", assignedTo: "Engineer J" },
    { id: 11, title: "Insulation Types", creationDate: "2023-10-11", status: "In Review", submittedBy: "Sara White", assignedTo: "Engineer K" },
    { id: 12, title: "Window Specifications", creationDate: "2023-10-12", status: "Closed", submittedBy: "Linda Thomas", assignedTo: "Engineer L" },
    { id: 13, title: "Flooring Options", creationDate: "2023-10-13", status: "Open", submittedBy: "Barbara Jackson", assignedTo: "Engineer M" },
    { id: 14, title: "Ceiling Materials", creationDate: "2023-10-14", status: "Closed", submittedBy: "Susan Lee", assignedTo: "Engineer N" },
    { id: 15, title: "Wall Finishes", creationDate: "2023-10-15", status: "In Review", submittedBy: "Robert Harris", assignedTo: "Engineer O" },
    { id: 16, title: "Door Hardware", creationDate: "2023-10-16", status: "Open", submittedBy: "Patricia Clark", assignedTo: "Engineer P" },
    { id: 17, title: "Lighting Fixtures", creationDate: "2023-10-17", status: "Closed", submittedBy: "Jennifer Lewis", assignedTo: "Engineer Q" },
    { id: 18, title: "Energy Efficiency", creationDate: "2023-10-18", status: "Open", submittedBy: "William Young", assignedTo: "Engineer R" },
    { id: 19, title: "Soundproofing", creationDate: "2023-10-19", status: "In Review", submittedBy: "Jessica Hall", assignedTo: "Engineer S" },
    { id: 20, title: "Data Cabling", creationDate: "2023-10-20", status: "Closed", submittedBy: "Thomas Allen", assignedTo: "Engineer T" },
    { id: 21, title: "Waterproofing Basement", creationDate: "2023-10-21", status: "Open", submittedBy: "John Doe", assignedTo: "Engineer U" },
    { id: 22, title: "Seismic Considerations", creationDate: "2023-10-22", status: "In Review", submittedBy: "Jane Smith", assignedTo: "Engineer V" },
    { id: 23, title: "Thermal Insulation", creationDate: "2023-10-23", status: "Open", submittedBy: "Alice Johnson", assignedTo: "Engineer W" },
    { id: 24, title: "Exterior Cladding", creationDate: "2023-10-24", status: "Closed", submittedBy: "Michael Brown", assignedTo: "Engineer X" },
    { id: 25, title: "Interior Design", creationDate: "2023-10-25", status: "Open", submittedBy: "Claire Davis", assignedTo: "Engineer Y" },
    { id: 26, title: "Structural Steel", creationDate: "2023-10-26", status: "In Review", submittedBy: "Edward Wilson", assignedTo: "Engineer Z" },
    { id: 27, title: "Masonry Work", creationDate: "2023-10-27", status: "Closed", submittedBy: "Nancy Moore", assignedTo: "Engineer AA" },
    { id: 28, title: "Green Building Standards", creationDate: "2023-10-28", status: "Open", submittedBy: "Daniel Taylor", assignedTo: "Engineer BB" },
    { id: 29, title: "Acoustic Performance", creationDate: "2023-10-29", status: "In Review", submittedBy: "Laura Martinez", assignedTo: "Engineer CC" },
    { id: 30, title: "Concrete Mix Design", creationDate: "2023-10-30", status: "Open", submittedBy: "Kevin Garcia", assignedTo: "Engineer DD" },
    { id: 31, title: "Ventilation Systems", creationDate: "2023-10-31", status: "Closed", submittedBy: "Sara White", assignedTo: "Engineer EE" },
    { id: 32, title: "Lifting Equipment", creationDate: "2023-11-01", status: "Open", submittedBy: "Linda Thomas", assignedTo: "Engineer FF" },
    { id: 33, title: "Modular Construction", creationDate: "2023-11-02", status: "In Review", submittedBy: "Barbara Jackson", assignedTo: "Engineer GG" },
    { id: 34, title: "Underfloor Heating", creationDate: "2023-11-03", status: "Closed", submittedBy: "Susan Lee", assignedTo: "Engineer HH" },
    { id: 35, title: "Weatherproofing Roofs", creationDate: "2023-11-04", status: "Open", submittedBy: "Robert Harris", assignedTo: "Engineer II" },
    { id: 36, title: "Building Automation", creationDate: "2023-11-05", status: "In Review", submittedBy: "Patricia Clark", assignedTo: "Engineer JJ" },
    { id: 37, title: "Load-Bearing Walls", creationDate: "2023-11-06", status: "Closed", submittedBy: "Jennifer Lewis", assignedTo: "Engineer KK" },
    { id: 38, title: "Solar Panel Integration", creationDate: "2023-11-07", status: "Open", submittedBy: "William Young", assignedTo: "Engineer LL" },
    { id: 39, title: "Smart Home Features", creationDate: "2023-11-08", status: "In Review", submittedBy: "Jessica Hall", assignedTo: "Engineer MM" },
    { id: 40, title: "Foundation Deepening", creationDate: "2023-11-09", status: "Open", submittedBy: "Thomas Allen", assignedTo: "Engineer NN" }
  ];
  
      


export default function RFIsListView() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalItems = RFIs.length;
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentRFIs = sortRFIsDescending(RFIs).slice(firstPageIndex, lastPageIndex);
  const tableContainerRef = useRef(null);

  function sortRFIsDescending(meetings) {
    return meetings.sort((a, b) => b.id - a.id);
  }

  function handleViewRFIsClick() {
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
                    RFI #
                </th>
                <th
                    scope="col"
                    className="py-2 text-left text-sm font-semibold text-gray-900 px-4 sm:px-0"
                >
                    Title
                </th>
                <th
                    scope="col"
                    className="py-2 text-left text-sm font-semibold text-gray-900 px-4 sm:px-0"
                >
                    Status
                </th>
                <th
                    scope="col"
                    className="py-2 text-left text-sm font-semibold text-gray-900 px-4 sm:px-0 hidden sm:table-cell"
                >
                    Creation date
                </th>
                <th
                    scope="col"
                    className="py-2 text-left text-sm font-semibold text-gray-900 px-4 sm:px-0 hidden md:table-cell"
                >
                    Submitted By
                </th>
                <th
                    scope="col"
                    className="py-2 text-left text-sm font-semibold text-gray-900 px-4 sm:px-0 hidden md:table-cell"
                >
                    Assigned To
                </th>
                <th scope="col" className="relative py-2 px-4" />
                </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
                {currentRFIs.map((RFIs, idx) => (
                <tr key={`RFIs-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-white'}>
                    <td
                    className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left hidden sm:table-cell"
                    >
                    {RFIs.id}
                    </td>
                    <td className="hitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0 ">
                    {RFIs.title}
                    </td>
                    <td className="hitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0 ">
                      {RFIs.status}
                    </td>
                    <td className="hitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0 hidden sm:table-cell">
                      {RFIs.creationDate}
                    </td>
                    <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0 hidden md:table-cell">
                        {RFIs.submittedBy}
                    </td>
                    <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left px-4 sm:px-0 hidden md:table-cell">
                        {RFIs.assignedTo}
                    </td>
                    
                    <td className="whitespace-nowrap pr-4 py-2 text-right text-sm font-medium">
                    <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleViewRFIsClick(RFIs.id)}
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






