import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid';
import NewDirectoryContactForm from '../components/NewDirectoryContactForm.component';

const companiesWithContacts = {
  "Alpha Corp": {
    legalName: "Alpha Corporation",
    businessType: "Subcontractor",
    physicalAddress: "123 Alpha St, Alpha City, AC 12345",
    serviceRegions: ["California", "Nevada", "Arizona"],
    companyOfficePhone: "123-456-7890",
    websiteURL: "https://alphacorp.com",
    type: "external",
    contacts: [
      { firstName: "Edward", lastName: "Fiona", phone: "123-456-7802", email: "edward.fiona@example.com", role: "external", title: "Carpenter", tradeCode: "Carpentry-001" },
      { firstName: "George", lastName: "Hannah", phone: "123-456-7803", email: "george.hannah@example.com", role: "external", title: "Electrician", tradeCode: "Electrical-002" }
    ]
  },
  "Beta LLC": {
    legalName: "Beta Limited Liability Company",
    businessType: "Subcontractor",
    physicalAddress: "456 Beta Ave, Beta Town, BT 67890",
    serviceRegions: ["Texas", "Oklahoma", "Louisiana"],
    companyOfficePhone: "123-456-7890",
    websiteURL: "https://betallc.com",
    type: "external",
    contacts: [
      { firstName: "Oliver", lastName: "Paula", phone: "123-456-7807", email: "oliver.paula@example.com", role: "client", title: "Plumber", tradeCode: "Plumbing-003" },
      { firstName: "Quincy", lastName: "Rachel", phone: "123-456-7808", email: "quincy.rachel@example.com", role: "external", title: "Civil Engineer", tradeCode: "Civil Engineering-004" }
    ]
  },
  "Gamma Inc": {
    legalName: "Gamma Incorporated",
    businessType: "Subcontractor",
    physicalAddress: "789 Gamma Blvd, Gamma City, GC 23456",
    serviceRegions: ["Florida", "Georgia", "South Carolina"],
    companyOfficePhone: "123-456-7890",
    websiteURL: "https://gammainc.com",
    type: "external",
    contacts: [
      { firstName: "Wanda", lastName: "Xavier", phone: "123-456-7811", email: "wanda.xavier@example.com", role: "external", title: "Carpenter", tradeCode: "Carpentry-005" },
      { firstName: "Adam", lastName: "Bellamy", phone: "123-456-7813", email: "adam.bellamy@example.com", role: "external", title: "Plumber", tradeCode: "Plumbing-006" }
    ]
  },
  "Delta Ltd": {
    legalName: "Delta Limited",
    businessType: "Subcontractor",
    physicalAddress: "101 Delta St, Delta Town, DT 34567",
    serviceRegions: ["New York", "New Jersey", "Connecticut"],
    companyOfficePhone: "123-456-7890",
    websiteURL: "https://deltaltd.com",
    type: "external",
    contacts: [
      { firstName: "Ian", lastName: "Jennings", phone: "123-456-7817", email: "ian.jennings@example.com", role: "external", title: "Carpenter", tradeCode: "Carpentry-007" },
      { firstName: "Kyle", lastName: "Laurent", phone: "123-456-7818", email: "kyle.laurent@example.com", role: "external", title: "Electrician", tradeCode: "Electrical-008" }
    ]
  },
  "Epsilon GmbH": {
    legalName: "Epsilon GmbH",
    businessType: "Subcontractor",
    physicalAddress: "202 Epsilon Rd, Epsilon City, EC 45678",
    serviceRegions: ["Illinois", "Indiana", "Ohio"],
    companyOfficePhone: "123-456-7890",
    websiteURL: "https://epsilongmbh.com",
    type: "external",
    contacts: [
      { firstName: "Quinn", lastName: "Reed", phone: "123-456-7821", email: "quinn.reed@example.com", role: "external", title: "HVAC Specialist", tradeCode: "HVAC-009" },
      { firstName: "Uma", lastName: "Vargas", phone: "123-456-7823", email: "uma.vargas@example.com", role: "external", title: "Carpenter", tradeCode: "Carpentry-010" }
    ]
  },
  "Cooper Building": {
    legalName: "Cooper Building Inc.",
    businessType: "General Contractor",
    physicalAddress: "789 Cooper St, Cooper City, CC 23456",
    serviceRegions: ["Florida", "Georgia", "South Carolina"],
    companyOfficePhone: "123-456-7890",
    websiteURL: "https://cooperbuilding.com",
    type: "internal",
    contacts: [
      { firstName: "Ian", lastName: "Jennings", phone: "123-456-7804", email: "ian.jennings@example.com", role: "internal", title: "Project Manager", tradeCode: null },
      { firstName: "Mason", lastName: "Nolan", phone: "123-456-7819", email: "mason.nolan@example.com", role: "internal", title: "Superintendent", tradeCode: null },
      { firstName: "Steven", lastName: "Thompson", phone: "123-456-7822", email: "steven.thompson@example.com", role: "internal", title: "Safety Officer", tradeCode: null },
      { firstName: "Wendy", lastName: "Xavier", phone: "123-456-7811", email: "wendy.xavier@example.com", role: "internal", title: "HR Manager", tradeCode: null },
      { firstName: "Yvonne", lastName: "Zara", phone: "123-456-7812", email: "yvonne.zara@example.com", role: "internal", title: "Lead Engineer", tradeCode: null }
    ]
  },
  "Client Corp": {
    legalName: "Client Corporation",
    businessType: "Owner",
    physicalAddress: "101 Client Ave, Client Town, CT 34567",
    serviceRegions: ["New York", "New Jersey", "Connecticut"],
    companyOfficePhone: "123-456-7890",
    websiteURL: "https://clientcorp.com",
    type: "client",
    contacts: [
      { firstName: "Charlie", lastName: "Dawson", phone: "123-456-7801", email: "charlie.dawson@example.com", role: "client", title: "Lead Engineer", tradeCode: null },
      { firstName: "Mason", lastName: "Nora", phone: "123-456-7806", email: "mason.nora@example.com", role: "client", title: "Lead Engineer", tradeCode: null },
      { firstName: "Yvonne", lastName: "Zachary", phone: "123-456-7812", email: "yvonne.zachary@example.com", role: "client", title: "Lead Engineer", tradeCode: null },
      { firstName: "George", lastName: "Hank", phone: "123-456-7816", email: "george.hank@example.com", role: "client", title: "Lead Engineer", tradeCode: null },
      { firstName: "Steven", lastName: "Tina", phone: "123-456-7822", email: "steven.tina@example.com", role: "client", title: "Lead Engineer", tradeCode: null }
    ]
  }
};


const tabs = [
  { name: 'All Contacts', href: '#', key: 'all' },
  { name: 'Internal Contacts', href: '#', key: 'internal' },
  { name: 'External Contacts', href: '#', key: 'external' },
  { name: 'Client Contacts', href: '#', key: 'client' },
  { name: 'Companies', href: '#', key: 'companies' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Directory() {
  const [currentTab, setCurrentTab] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const companyRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10px 0px -90% 0px', // Adjust this margin as needed
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = entry.target.getAttribute('data-index');
        if (entry.isIntersecting) {
          companyRefs.current.forEach((ref, idx) => {
            if (idx <= index) {
              ref.classList.remove('sticky');
            }
          });
          entry.target.classList.add('sticky');
        } else {
          entry.target.classList.remove('sticky');
        }
      });
    }, observerOptions);

    companyRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [companyRefs]);

  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

  const getAllContacts = () => {
    const sortedCompanies = Object.keys(companiesWithContacts)
      .sort((a, b) => {
        const aName = a.toLowerCase();
        const bName = b.toLowerCase();
        if (sortOrder === 'asc') {
          return aName < bName ? -1 : aName > bName ? 1 : 0;
        } else {
          return aName > bName ? -1 : aName < bName ? 1 : 0;
        }
      });
  
    return sortedCompanies.reduce((acc, company) => {
      const filteredContacts = companiesWithContacts[company].contacts.filter(contact => {
        if (currentTab === 'all') return true;
        if (currentTab === contact.role) return true;
        return false;
      });
  
      if (filteredContacts.length > 0) {
        acc.push({
          companyName: company,
          isCompanyRow: true,
          companyOfficePhone: companiesWithContacts[company].companyOfficePhone,
          websiteURL: companiesWithContacts[company].websiteURL,
        });
  
        filteredContacts.forEach(contact => {
          acc.push({ ...contact, company });
        });
      }
  
      return acc;
    }, []);
  };
  
  

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };  

  const filteredUsers = getAllContacts()
  .filter(user => {
    if (user.isCompanyRow) {
      // Find if the company or any of its contacts match the search query
      const companyMatches = user.companyName.toLowerCase().includes(searchQuery.toLowerCase());
      const contactsMatch = companiesWithContacts[user.companyName].contacts.some(contact => 
        contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.tradeCode?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return companyMatches || contactsMatch;
    }
    return (
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.tradeCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })
  .reduce((acc, user) => {
    // If the current user is a company row, push it to the result array
    if (user.isCompanyRow) {
      acc.push(user);
    } else {
      // If it's a contact row, find the last company row in the acc and push the contact under it
      const lastCompanyIndex = acc.map(u => u.isCompanyRow).lastIndexOf(true);
      acc.splice(lastCompanyIndex + 1, 0, user);
    }
    return acc;
  }, []);




  return (
    <>
      {/* Page Header Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 border p-4 rounded-md mb-4 shadow'>
        <div className='col-span-1 flex justify-start items-center'>
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">Project Directory</h1>
            <p className="hidden sm:flex mt-2 text-sm text-gray-700">
              A directory of all contacts associated with the project.
            </p>
          </div>
        </div>
        <div className='hidden sm:flex col-span-1 justify-end items-center'>
          <div className='rounded-md border px-4 py-2 shadow shadow-md flex items-center space-x-2'>
            <img src="https://example.com/youtube-icon.png" alt="YouTube" className="h-6 w-6"/>
            <span>TRAINING VIDEO HERE</span>
          </div>
        </div>
      </div>

{/* Page Menu Tabs Section */}
<div className='mb-5'>
  <div className="sm:hidden">
    <label htmlFor="tabs" className="sr-only">
      Select a tab
    </label>
    <select
      id="tabs"
      name="tabs"
      value={currentTab}
      onChange={(e) => handleTabClick(tabs.find(tab => tab.key === e.target.value))}
      className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
    >
      {tabs.map((tab) => (
        <option key={tab.name} value={tab.key}>{tab.name}</option>
      ))}
    </select>
  </div>
  <div className="hidden sm:block">
    <div className="border-b">
      <nav aria-label="Tabs" className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href="#"
            onClick={() => handleTabClick(tab)}
            aria-current={currentTab === tab.key ? 'page' : undefined}
            className={classNames(
              currentTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
            )}
          >
            {tab.name}
          </a>
        ))}
        {/* Move the Export button to the right
        <div className="ml-12 flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-200 ml-4 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            // onClick={() => }
          >
            <p className='text-xs mr-2'>Export</p>
            <DocumentArrowDownIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div> */}
      </nav>
    </div>
  </div>
</div>




      {/* Main Directory Card */}
      <div className="border rounded-md shadow">




      
        {/* Search-Bar, Filter, A-Z, and Add-Contact Button */}
        <div className='px-4 pt-6'>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              {/* padding for left hand side */}
            
            </div>
            <div className="mt-3 sm:ml-4 sm:mt-0 relative">
              <label htmlFor="mobile-search-candidate" className="sr-only">Search</label>
              <label htmlFor="desktop-search-candidate" className="sr-only">Search</label>
              
              <div className="flex rounded-md shadow-sm border sm:border-none">
                <div className="relative flex-grow focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                    <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobile-search-candidate"
                    name="mobile-search-candidate"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-0 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:hidden"
                  />
                  <input
                    id="desktop-search-candidate"
                    name="desktop-search-candidate"
                    type="text"
                    placeholder="Search contacts"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="hidden w-full rounded rounded-md border-gray-300 py-1.5 pl-10 text-sm leading-6 text-gray-900 border-t border-b placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:block"
                  />
                </div>
              </div>
            </div>
            <div className="flex my-6 sm:my-0 ml-4">
              <div className="flex-auto"> 
                {/* padding for left hand side */}
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsNewContactModalOpen(true)}
              >
                Add contact
              </button>
              <button
                type="button"
                className=" inline-flex items-center justify-center rounded-md border  bg-gray-100 ml-4 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                // onClick={() => }
                >
                <p className='text-xs ml-1 mr-1'>Export</p>
                <DocumentArrowDownIcon className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Table of Contacts */}
        <div className="mt-4 flow-root border-t pb-4">
          <div className="align-middle inline-block min-w-full">
            <div className="overflow-auto" style={{ minHeight: '480px', maxHeight: '480px' }}>
            <table className="min-w-full">
  <thead className="bg-gray-200 sticky top-0 z-20">
    <tr>
      <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 px-4" style={{ width: '20%' }}>
        Company
        <button 
            type="button" 
            onClick={toggleSortOrder} 
            className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {sortOrder === 'asc' ? '▲' : '▼'}
          </button>
      </th>
      {/* <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 px-4 hidden xl:table-cell" style={{ width: '20%' }}>
        Website / Phone
      </th> */}
      <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 px-4" style={{ width: '20%' }}>
        Contact Name
      </th>
      <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell" style={{ width: '20%' }}>
        Title
      </th>
      <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell" style={{ width: '20%' }}>
        Phone / Email
      </th>
      <th scope="col" className="relative py-3.5 px-4" style={{ width: '10%' }} />
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
  {filteredUsers.map((user, idx) => (
    user.isCompanyRow ? (
      <tr className="bg-gray-50 sticky top-[48px] z-10" key={`company-${idx}`}>
        <td className="px-4 py-3 text-sm font-medium text-gray-800" style={{ width: '20%' }}>
          {user.companyName}
        </td>
        {/* <td className="px-4 py-3 text-sm font-medium text-gray-800 hidden xl:table-cell" style={{ width: '20%' }}>
          <div>
            <a href={user.websiteURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 text-xs">
              {user.websiteURL}
            </a>
          </div>
          <div className='text-xs'>
            {user.companyOfficePhone}
          </div>
        </td> */}
        <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-800">
          {/* Empty cell for alignment */}
        </td>
      </tr>
    ) : (
      <tr key={`contact-${idx}`}>
        <td className="whitespace-nowrap pl-4 py-3 text-sm font-medium text-gray-900 text-left" style={{ width: '20%' }}>
          {/* Empty column for alignment */}
        </td>

        <td className="whitespace-nowrap pl-4 py-3 text-sm font-medium text-gray-900 text-left" style={{ width: '20%' }}>
          {user.firstName} {user.lastName}
        </td>
        <td className="whitespace-nowrap py-3 text-sm text-gray-500 hidden md:table-cell text-left" style={{ width: '20%' }}>
          {user.title ? user.title : 'N/A'} <br />
          {/* {user.tradeCode ? user.tradeCode: 'N/A'} */}
          
        </td>
        <td className="whitespace-nowrap py-3 text-sm text-gray-500 hidden sm:table-cell text-left" style={{ width: '20%' }}>
          {user.phone} <br />
          {user.email}
        </td>
        <td className="whitespace-nowrap pr-6 py-3 text-center text-sm font-medium" style={{ width: '10%' }}>
          <a href="#" className="text-blue-600 hover:text-blue-900">Manage</a>
        </td>
      </tr>
    )
  ))}
</tbody>

</table>

            </div>
          </div>
        </div>
      </div>

      <NewDirectoryContactForm isModalOpen={isNewContactModalOpen} setIsModalOpen={setIsNewContactModalOpen} companies={Object.keys(companiesWithContacts)} />
    </>
  );
}







