import React, { useState } from 'react';
import { InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';
import Pagination from '../../../common/components/Pagination.component';
import { CompaniesTableProps } from '../../../types/directory';

const CompaniesTable: React.FC<CompaniesTableProps> = ({
    companiesWithContacts,
    searchQuery,
    handleViewCompanyClick
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const itemsPerPage = 50;

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredCompanies: string[] = Object.keys(companiesWithContacts)
        .sort((a, b) => {
            const aName = companiesWithContacts[a].entityName.toLowerCase();
            const bName = companiesWithContacts[b].entityName.toLowerCase();
            return sortOrder === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
        })
        .filter(companyName =>
            companiesWithContacts[companyName].entityName.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const totalItems = filteredCompanies.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);

    const onPageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <table className="min-w-full rounded-corners">
                <thead className="bg-gray-100 sticky top-0 z-40">
                    <tr>
                        <th
                            scope="col"
                            className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4"
                        >
                            Company
                            <button
                                type="button"
                                onClick={toggleSortOrder}
                                className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                                {sortOrder === 'asc' ? '▲' : '▼'}
                            </button>
                        </th>
                        <th
                            scope="col"
                            className="py-2 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell"
                        >
                            Office Phone
                        </th>
                        <th
                            scope="col"
                            className="py-2 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell"
                        >
                            Office Email
                        </th>
                        <th
                            scope="col"
                            className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell"
                        >
                            Website
                        </th>
                        <th
                            scope="col"
                            className="py-2 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
                        >
                            Division
                        </th>
                        <th
                            scope="col"
                            className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell"
                        >
                            Bid Status
                        </th>
                        <th
                            scope="col"
                            className="relative py-2 px-4"
                            style={{width: '7%'}}
                        />
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentCompanies.map((companyName, idx) => {
                        const company = companiesWithContacts[companyName];
                        return (
                            <tr key={`company-${idx}`}>
                                <td className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left">
                                    {company.entityName}
                                </td>
                                <td className="py-4 text-sm text-gray-500 text-left hidden sm:table-cell">
                                    {company.phoneNumber || 'N/A'}
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden sm:table-cell">
                                    {company.email || 'N/A'}
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden xl:table-cell">
                                    {company.website || 'N/A'}
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden md:table-cell">
                                    {company.constructionDivision || 'N/A'}
                                </td>
                                <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden xl:table-cell">
                                    {company.bidStatus || 'N/A'}
                                </td>
                                <td className="whitespace-nowrap pr-4 py-2 text-right text-sm font-medium" style={{width: '7%'}}>
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                        onClick={() => handleViewCompanyClick(company.entityName)}
                                    >
                                        <p className="hidden sm:block">View</p>
                                        <span className="sm:hidden"><InfoOutlinedIcon /></span>
                                    </button>
                                </td>
                            </tr>
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
};

export default CompaniesTable;
