import React, { useEffect, useState, useRef } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Pagination from '../../../common/components/Pagination.component'; // Assuming this component exists and works
import { ContactsTableProps, Contact } from '../../../types/directory';
import {Link} from "react-router-dom"; // Ensure Contact is imported

const ContactsTable: React.FC<ContactsTableProps> = ({
    currentTab,
    searchQuery,
    companiesWithContacts,
    handleViewContactClick,
    paginationRef,
}) => {    
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 25; 
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const scrollToFirstRow = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
      scrollToFirstRow();
  }, [currentPage]);


  const getFilteredCompanies = (): string[] => {
    const sortedCompanies = Object.keys(companiesWithContacts).sort((a, b) => {
        const aName = a.toLowerCase();
        const bName = b.toLowerCase();

        return sortOrder === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
    });
  
    return sortedCompanies.filter((companyName) => {
      const company = companiesWithContacts[companyName];
      const isCurrentTabMatch = currentTab === 'all' || company.professionalRelationship === currentTab;
      const companyMatches = company.entityName.toLowerCase().includes(searchQuery.toLowerCase());

      const contactsMatch = company.contacts.some((contact: Contact) => {
        return (
          contact.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.contactType?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      return isCurrentTabMatch && (companyMatches || contactsMatch);
    });
  };
  
  const filteredCompanies = getFilteredCompanies();
  const totalItems = filteredCompanies.length;
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(firstPageIndex, lastPageIndex);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <table className="min-w-full rounded-corners">
        <thead className="bg-gray-100 sticky top-0 z-40">
          <tr>
            <th scope="col" className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4">
              Company
              <button
                type="button"
                onClick={toggleSortOrder}
                className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {sortOrder === 'asc' ? '▲' : '▼'}
              </button>
            </th>
            <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900">
              Contact
            </th>
            <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell">
              Title
            </th>
            <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
              Phone
            </th>
            <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
              Email
            </th>
            <th scope="col" className="relative py-2 px-4" style={{ width: '5%' }} />
          </tr>
        </thead>

        <tbody className="bg-white ">
          {currentCompanies.map((companyName, idx) => {
            const company = companiesWithContacts[companyName];
            return (
              <React.Fragment key={`company-${idx}`}>
                {/* Company Row */}
                <tr className="bg-white">
                  <td className="px-2 pt-2 text-sm text-gray-800" colSpan={6}>
                    {idx !== 0 && <hr className="mb-2" />}
                    <div className="px-2 mr-1">
                      <span className="font-bold">{company.entityName}</span> <br />
                      <span className="text-gray-500 text-xs hidden sm:block">
                        Bid Status: <span className="text-blue-800">{company.bidStatus || 'N/A'}</span>
                      </span>
                    </div>
                  </td>
                </tr>

                {/* Contacts within Company */}
                {company.contacts.map((contact: Contact, contactIdx: number) => (
                  <tr key={`contact-${idx}-${contactIdx}`}>
                    <td className="whitespace-nowrap pl-6 py-2 text-sm font-medium text-gray-900 text-left" />
                    <td className="whitespace-nowrap py-2 text-sm font-medium text-gray-900 text-left">
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td className="whitespace-nowrap py-2 text-sm text-gray-500 text-left hidden xl:table-cell">
                      {contact.title || 'N/A'} <br />
                    </td>
                    <td className="whitespace-nowrap py-2 text-sm text-gray-500 hidden sm:table-cell text-left">
                      {contact.phone}
                    </td>
                    <td className="whitespace-nowrap py-2 text-sm text-gray-500 hidden md:table-cell text-left">
                      {contact.email}
                    </td>
                    <td className="whitespace-nowrap pr-4 py-2 text-right text-sm font-medium" style={{ width: '5%' }}>
                      <Link
                          className="text-blue-600 hover:text-blue-900"
                          to={`/project/:id/project-directory/contact/:id}`}
                      >
                        <p className="hidden sm:block">View</p>
                        <span className="sm:hidden">
                        <InfoOutlinedIcon/>
                    </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          currentPage={currentPage}
          onPageChange={onPageChange}
          itemTitle={"Companies"}
      />
    </>
  );
}

export default ContactsTable;
