import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid';
import NewDirectoryContactForm from '../components/NewDirectoryContactForm.component';

//components
import PageHeader from '../components/PageHeader.component';
import MenuTabs from '../components/MenuTabs.component';
import SearchBar from '../components/SearchBar.component';


const companiesWithContacts = {
  "Alpha Corp": {
    entityName: "Alpha Corporation",
    dba: "Alpha Corp",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    address: "123 Alpha St",
    city: "Alpha City",
    state: "AC",
    postalCode: "12345",
    country: "USA",
    email: "info@alphacorp.com",
    website: "https://alphacorp.com",
    licenseNumber: "ALPHA-123456",
    laborUnion: "Carpenters Local 123",
    tradeCode: "Carpentry-001",
    contacts: [
      { firstName: "Edward", lastName: "Fiona", phone: "123-456-7802", email: "edward.fiona@example.com", contactType: "external", title: "Carpenter", tradeCode: "Carpentry-001" },
      { firstName: "George", lastName: "Hannah", phone: "123-456-7803", email: "george.hannah@example.com", contactType: "external", title: "Electrician", tradeCode: "Electrical-002" }
    ]
  },
  "Beta LLC": {
    entityName: "Beta Limited Liability Company",
    dba: "Beta LLC",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    address: "456 Beta Ave",
    city: "Beta Town",
    state: "BT",
    postalCode: "67890",
    country: "USA",
    email: "info@betallc.com",
    website: "https://betallc.com",
    licenseNumber: "BETA-67890",
    laborUnion: "Plumbers Union Local 456",
    tradeCode: "Plumbing-003",
    contacts: [
      { firstName: "Oliver", lastName: "Paula", phone: "123-456-7807", email: "oliver.paula@example.com", contactType: "client", title: "Plumber", tradeCode: "Plumbing-003" },
      { firstName: "Quincy", lastName: "Rachel", phone: "123-456-7808", email: "quincy.rachel@example.com", contactType: "external", title: "Civil Engineer", tradeCode: "Civil Engineering-004" }
    ]
  },
  "Gamma Inc": {
    entityName: "Gamma Incorporated",
    dba: "Gamma Inc",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    address: "789 Gamma Blvd",
    city: "Gamma City",
    state: "GC",
    postalCode: "23456",
    country: "USA",
    email: "info@gammainc.com",
    website: "https://gammainc.com",
    licenseNumber: "GAMMA-23456",
    laborUnion: "Carpenters Local 789",
    tradeCode: "Carpentry-005",
    contacts: [
      { firstName: "Wanda", lastName: "Xavier", phone: "123-456-7811", email: "wanda.xavier@example.com", contactType: "external", title: "Carpenter", tradeCode: "Carpentry-005" },
      { firstName: "Adam", lastName: "Bellamy", phone: "123-456-7813", email: "adam.bellamy@example.com", contactType: "external", title: "Plumber", tradeCode: "Plumbing-006" }
    ]
  },
  "Delta Ltd": {
    entityName: "Delta Limited",
    dba: "Delta Ltd",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    address: "101 Delta St",
    city: "Delta Town",
    state: "DT",
    postalCode: "34567",
    country: "USA",
    email: "info@deltaltd.com",
    website: "https://deltaltd.com",
    licenseNumber: "DELTA-34567",
    laborUnion: "Electricians Union Local 101",
    tradeCode: "Electrical-008",
    contacts: [
      { firstName: "Ian", lastName: "Jennings", phone: "123-456-7817", email: "ian.jennings@example.com", contactType: "external", title: "Carpenter", projects: []},
      { firstName: "Kyle", lastName: "Laurent", phone: "123-456-7818", email: "kyle.laurent@example.com", contactType: "external", title: "Electrician", projects: []}
    ]
  },
  "Epsilon GmbH": {
    entityName: "Epsilon GmbH",
    dba: "Epsilon GmbH",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    address: "202 Epsilon Rd",
    city: "Epsilon City",
    state: "EC",
    postalCode: "45678",
    country: "USA",
    email: "info@epsilongmbh.com",
    website: "https://epsilongmbh.com",
    licenseNumber: "EPSILON-45678",
    laborUnion: "HVAC Union Local 202",
    tradeCode: "HVAC-009",
    contacts: [
      { firstName: "Quinn", lastName: "Reed", phone: "123-456-7821", email: "quinn.reed@example.com", contactType: "external", title: "HVAC Specialist", projects: []},
      { firstName: "Uma", lastName: "Vargas", phone: "123-456-7823", email: "uma.vargas@example.com", contactType: "external", title: "Carpenter", projects: []}
    ]
  },
  "Cooper Building": {
    entityName: "Cooper Building Inc.",
    dba: "Cooper Building",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    address: "789 Cooper St",
    city: "Cooper City",
    state: "CC",
    postalCode: "23456",
    country: "USA",
    email: "info@cooperbuilding.com",
    website: "https://cooperbuilding.com",
    licenseNumber: "COOPER-23456",
    laborUnion: "General Contractors Union Local 789",
    tradeCode: "General-001",
    contacts: [
      { firstName: "Ian", lastName: "Jennings", phone: "123-456-7804", email: "ian.jennings@example.com", contactType: "internal", title: "Project Manager",projects: []},
      { firstName: "Mason", lastName: "Nolan", phone: "123-456-7819", email: "mason.nolan@example.com", contactType: "internal", title: "Superintendent", projects: []},
      { firstName: "Steven", lastName: "Thompson", phone: "123-456-7822", email: "steven.thompson@example.com", contactType: "internal", title: "Safety Officer", projects: []},
      { firstName: "Wendy", lastName: "Xavier", phone: "123-456-7811", email: "wendy.xavier@example.com", contactType: "internal", title: "HR Manager", projects: []},
      { firstName: "Yvonne", lastName: "Zara", phone: "123-456-7812", email: "yvonne.zara@example.com", contactType: "internal", title: "Lead Engineer", projects: []}
    ]
  },
  "Client Corp": {
    entityName: "Client Corporation",
    dba: "Client Corp",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    address: "101 Client Ave",
    city: "Client Town",
    state: "CT",
    postalCode: "34567",
    country: "USA",
    email: "info@clientcorp.com",
    website: "https://clientcorp.com",
    licenseNumber: "CLIENT-34567",
    laborUnion: "Owners Union Local 101",
    tradeCode: "Owner-001",
    contacts: [
      { firstName: "Charlie", lastName: "Dawson", phone: "123-456-7801", email: "charlie.dawson@example.com", contactType: "client", title: "Lead Engineer", projects: []},
      { firstName: "Mason", lastName: "Nora", phone: "123-456-7806", email: "mason.nora@example.com", contactType: "client", title: "Lead Engineer", projects: []},
      { firstName: "Yvonne", lastName: "Zachary", phone: "123-456-7812", email: "yvonne.zachary@example.com", contactType: "client", title: "Lead Engineer", projects: []},
      { firstName: "George", lastName: "Hank", phone: "123-456-7816", email: "george.hank@example.com", contactType: "client", title: "Lead Engineer", projects: []},
      { firstName: "Steven", lastName: "Tina", phone: "123-456-7822", email: "steven.tina@example.com", contactType: "client", title: "Lead Engineer", projects: []}
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
    if (currentTab === 'companies') {
      const sortedCompanies = Object.keys(companiesWithContacts)
        .sort((a, b) => {
          const aName = a.toLowerCase();
          const bName = b.toLowerCase();
          return sortOrder === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
        });

      return sortedCompanies.map((company) => ({
        companyName: company,
        legalName: companiesWithContacts[company].entityName,
        businessType: companiesWithContacts[company].businessType || 'N/A',
        physicalAddress: companiesWithContacts[company].address || 'N/A',
        serviceRegions: companiesWithContacts[company].serviceRegions?.join(", ") || 'N/A',
        companyOfficePhone: companiesWithContacts[company].phoneNumber || 'N/A',
        companyEmail: companiesWithContacts[company].email || 'N/A',
        websiteURL: companiesWithContacts[company].website || 'N/A',
        isCompanyRow: true,
      }));
    }

    const sortedCompanies = Object.keys(companiesWithContacts)
      .sort((a, b) => {
        const aName = a.toLowerCase();
        const bName = b.toLowerCase();
        return sortOrder === 'asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
      });

    return sortedCompanies.reduce((acc, company) => {
      const filteredContacts = companiesWithContacts[company].contacts.filter(contact => {
        if (currentTab === 'all') return true;
        if (currentTab === contact.contactType) return true;
        return false;
      });

      if (filteredContacts.length > 0) {
        acc.push({
          companyName: company,
          isCompanyRow: true,
          companyOfficePhone: companiesWithContacts[company].phoneNumber || 'N/A',
          websiteURL: companiesWithContacts[company].website || 'N/A',
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
      if (user.isCompanyRow) {
        acc.push(user);
      } else {
        const lastCompanyIndex = acc.map(u => u.isCompanyRow).lastIndexOf(true);
        acc.splice(lastCompanyIndex + 1, 0, user);
      }
      return acc;
    }, []);

  return (
    <>
      <NewDirectoryContactForm
        isModalOpen={isNewContactModalOpen}
        setIsModalOpen={setIsNewContactModalOpen}
        companies={Object.keys(companiesWithContacts)}
      />

      <PageHeader
        pageTitle={'Project Directory'}
        pageDescription={'A directory of all contacts associated with the project.'}
        trainingVideoSrc={'https://www.youtube.com/watch?v=ztZphO13iIY'}
        trainingImageSrc={'/demoImages/scott-graham-5fNmWej4tAA-unsplash.jpg'}
        trainingTitle={"Project Directory Training "}
      />

      <MenuTabs
        tabs={tabs}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
      />

      <div className="border rounded-md shadow">
        <div className='px-4 pt-6'>
          <div className="sm:flex sm:items-center">
            <div className="flex-auto"></div>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search"
            />
            <div className="flex my-6 sm:my-0 ml-4">
              <div className="flex-auto"></div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsNewContactModalOpen(true)}
              >
                Add contact
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border bg-gray-100 ml-4 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={() => console.log("export button clicked")}
              >
                <p className='text-xs ml-1 mr-1'>Export</p>
                <DocumentArrowDownIcon className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flow-root border-t pb-4">
          <div className="align-middle inline-block min-w-full">
            <div className="overflow-auto" style={{ minHeight: '480px', maxHeight: '480px' }}>
              {currentTab !== 'companies' ? (
                <ContactsTable filteredUsers={filteredUsers} toggleSortOrder={toggleSortOrder} sortOrder={sortOrder} />
              ) : (
                <CompaniesTable filteredUsers={filteredUsers} toggleSortOrder={toggleSortOrder} sortOrder={sortOrder} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ContactsTable = ({ filteredUsers, toggleSortOrder, sortOrder }) => (
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
            <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-800"></td>
          </tr>
        ) : (
          <tr key={`contact-${idx}`}>
            <td className="whitespace-nowrap pl-4 py-3 text-sm font-medium text-gray-900 text-left" style={{ width: '20%' }}></td>
            <td className="whitespace-nowrap pl-4 py-3 text-sm font-medium text-gray-900 text-left" style={{ width: '20%' }}>
              {user.firstName} {user.lastName}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-500 hidden md:table-cell text-left" style={{ width: '20%' }}>
              {user.title || 'N/A'} <br />
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-500 hidden sm:table-cell text-left" style={{ width: '20%' }}>
              {user.phone} <br />
              {user.email}
            </td>
            <td className="whitespace-nowrap pr-6 py-3 text-center text-sm font-medium" style={{ width: '10%' }}>
              <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
            </td>
          </tr>
        )
      ))}
    </tbody>
  </table>
);

const CompaniesTable = ({ filteredUsers, toggleSortOrder, sortOrder }) => (
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
        <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 px-4" style={{ width: '20%' }}>
          Office Address
        </th>
        <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell" style={{ width: '20%' }}>
          Phone / Email
        </th>
        <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell" style={{ width: '20%' }}>
          Website
        </th>
        <th scope="col" className="relative py-3.5 px-4" style={{ width: '10%' }} />
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredUsers.map((user, idx) => (
        user.isCompanyRow && (
          <tr key={`company-${idx}`} 
          className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <td className="whitespace-nowrap pl-4 py-3 text-sm font-medium text-gray-900 text-left" style={{ width: '20%' }}>
            {user.companyName}
            </td>
            <td className="whitespace-nowrap pl-4 py-3 text-sm text-gray-500 text-left" style={{ width: '20%' }}>
              {user.physicalAddress}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-500 text-left hidden md:table-cell" style={{ width: '20%' }}>
              {user.companyOfficePhone} <br />
              {user.companyEmail}
            </td>
            <td className="whitespace-nowrap py-3 text-sm text-gray-500  text-left hidden xl:table-cell" style={{ width: '20%' }}>
              {user.websiteURL}
            </td>
            <td className="whitespace-nowrap pr-6 py-3 text-center text-sm font-medium" style={{ width: '10%' }}>
              <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
            </td>
          </tr>
        )
      ))}
    </tbody>
  </table>
);
