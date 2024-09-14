import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { MdAdd } from 'react-icons/md';

import '../styles/Directory.css';
//components
import PageHeader from '../components/PageHeader.component';
import MenuTabs from '../components/MenuTabs.component';
import SearchBar from '../components/SearchBar.component';
import ViewContactForm from '../components/ProjectDirectoryComponents/ViewContactForm.component';
import ViewCompanyForm from '../components/ProjectDirectoryComponents/ViewCompanyForm.component';
import NewDirectoryContactForm from '../components/ProjectDirectoryComponents/NewDirectoryContactForm.component';
import ExportModal from '../components/ProjectDirectoryComponents/ExportModal.component';


const companiesWithContacts = {
  "Alpha Corp": {
    entityName: "Alpha Corporation",
    dba: "Alpha Corp",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    physicalAddress: "123 Alpha St",
    city: "Alpha City",
    state: "AC",
    postalCode: "12345",
    country: "USA",
    email: "info@alphacorp.com",
    website: "https://alphacorp.com",
    licenseNumber: "ALPHA-123456",
    laborUnion: "Carpenters Local 123",
    constructionDivision: "Carpentry-001",
    bidStatus: "Pending",
    contacts: [
      { 
        firstName: "Edward", 
        lastName: "Fiona", 
        phone: "123-456-7802", 
        email: "edward.fiona@example.com", 
        contactType: "external", 
        title: "Carpenter", 
        projects: [] 
      },
      { 
        firstName: "George", 
        lastName: "Hannah", 
        phone: "123-456-7803", 
        email: "george.hannah@example.com", 
        contactType: "external", 
        title: "Electrician", 
        projects: [] 
      }
    ]
  },
  "Beta LLC": {
    entityName: "Beta Limited Liability Company",
    dba: "Beta LLC",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    physicalAddress: "456 Beta Ave",
    city: "Beta Town",
    state: "BT",
    postalCode: "67890",
    country: "USA",
    email: "info@betallc.com",
    website: "https://betallc.com",
    licenseNumber: "BETA-67890",
    laborUnion: "Plumbers Union Local 456",
    constructionDivision: "Plumbing-003",
    bidStatus: "Pending",
    contacts: [
      { 
        firstName: "Oliver", 
        lastName: "Paula", 
        phone: "123-456-7807", 
        email: "oliver.paula@example.com", 
        contactType: "client", 
        title: "Plumber", 
        projects: [] 
      },
      { 
        firstName: "Quincy", 
        lastName: "Rachel", 
        phone: "123-456-7808", 
        email: "quincy.rachel@example.com", 
        contactType: "external", 
        title: "Civil Engineer", 
        projects: [] 
      }
    ]
  },
  "Gamma Inc": {
    entityName: "Gamma Incorporated",
    dba: "Gamma Inc",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    physicalAddress: "789 Gamma Blvd",
    city: "Gamma City",
    state: "GC",
    postalCode: "23456",
    country: "USA",
    email: "info@gammainc.com",
    website: "https://gammainc.com",
    licenseNumber: "GAMMA-23456",
    laborUnion: "Carpenters Local 789",
    constructionDivision: "Carpentry-005",
    bidStatus: "Bidding",
    contacts: [
      { 
        firstName: "Wanda", 
        lastName: "Xavier", 
        phone: "123-456-7811", 
        email: "wanda.xavier@example.com", 
        contactType: "external", 
        title: "Carpenter", 
        projects: [] 
      },
      { 
        firstName: "Adam", 
        lastName: "Bellamy", 
        phone: "123-456-7813", 
        email: "adam.bellamy@example.com", 
        contactType: "external", 
        title: "Plumber", 
        projects: [] 
      }
    ]
  },
  "Delta Ltd": {
    entityName: "Delta Limited",
    dba: "Delta Ltd",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    physicalAddress: "101 Delta St",
    city: "Delta Town",
    state: "DT",
    postalCode: "34567",
    country: "USA",
    email: "info@deltaltd.com",
    website: "https://deltaltd.com",
    licenseNumber: "DELTA-34567",
    laborUnion: "Electricians Union Local 101",
    bidStatus: "Accepted",
    contacts: [
      { 
        firstName: "Ian", 
        lastName: "Jennings", 
        phone: "123-456-7817", 
        email: "ian.jennings@example.com", 
        contactType: "external", 
        title: "Carpenter", 
        projects: [] 
      },
      { 
        firstName: "Kyle", 
        lastName: "Laurent", 
        phone: "123-456-7818", 
        email: "kyle.laurent@example.com", 
        contactType: "external", 
        title: "Electrician", 
        projects: [] 
      }
    ]
  },
  "Epsilon GmbH": {
    entityName: "Epsilon GmbH",
    dba: "Epsilon GmbH",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    physicalAddress: "202 Epsilon Rd",
    city: "Epsilon City",
    state: "EC",
    postalCode: "45678",
    country: "USA",
    email: "info@epsilongmbh.com",
    website: "https://epsilongmbh.com",
    licenseNumber: "EPSILON-45678",
    laborUnion: "HVAC Union Local 202",
    constructionDivision: "HVAC-009",
    bidStatus: "Accepted",
    contacts: [
      { 
        firstName: "Quinn", 
        lastName: "Reed", 
        phone: "123-456-7821", 
        email: "quinn.reed@example.com", 
        contactType: "external", 
        title: "HVAC Specialist", 
        projects: [] 
      },
      { 
        firstName: "Uma", 
        lastName: "Vargas", 
        phone: "123-456-7823", 
        email: "uma.vargas@example.com", 
        contactType: "external", 
        title: "Carpenter", 
        projects: [] 
      }
    ]
  },
  "Cooper Building": {
    entityName: "Cooper Building Inc.",
    dba: "Cooper Building",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    physicalAddress: "789 Cooper St",
    city: "Cooper City",
    state: "CC",
    postalCode: "23456",
    country: "USA",
    email: "info@cooperbuilding.com",
    website: "https://cooperbuilding.com",
    licenseNumber: "COOPER-23456",
    laborUnion: "General Contractors Union Local 789",
    constructionDivision: "General-001",
    bidStatus: "N/A",
    contacts: [
      { 
        firstName: "Ian", 
        lastName: "Jennings", 
        phone: "123-456-7804", 
        email: "ian.jennings@example.com", 
        contactType: "internal", 
        title: "Project Manager",
        projects: [] 
      },
      { 
        firstName: "Mason", 
        lastName: "Nolan", 
        phone: "123-456-7819", 
        email: "mason.nolan@example.com", 
        contactType: "internal", 
        title: "Superintendent",
        projects: [] 
      },
      { 
        firstName: "Steven", 
        lastName: "Thompson", 
        phone: "123-456-7822", 
        email: "steven.thompson@example.com", 
        contactType: "internal", 
        title: "Safety Officer",
        projects: [] 
      },
      { 
        firstName: "Wendy", 
        lastName: "Xavier", 
        phone: "123-456-7811", 
        email: "wendy.xavier@example.com", 
        contactType: "internal", 
        title: "HR Manager",
        projects: [] 
      },
      { 
        firstName: "Yvonne", 
        lastName: "Zara", 
        phone: "123-456-7812", 
        email: "yvonne.zara@example.com", 
        contactType: "internal", 
        title: "Lead Engineer",
        projects: [] 
      }
    ]
  },
  "Client Corp": {
    entityName: "Client Corporation",
    dba: "Client Corp",
    phoneNumber: "123-456-7890",
    faxNumber: "123-456-7891",
    physicalAddress: "101 Client Ave",
    city: "Client Town",
    state: "CT",
    postalCode: "34567",
    country: "USA",
    email: "info@clientcorp.com",
    website: "https://clientcorp.com",
    licenseNumber: "CLIENT-34567",
    laborUnion: "Owners Union Local 101",
    constructionDivision: "Owner-001",
    bidStatus: "N/A",
    contacts: [
      { 
        firstName: "Charlie", 
        lastName: "Dawson", 
        phone: "123-456-7801", 
        email: "charlie.dawson@example.com", 
        contactType: "client", 
        title: "Lead Engineer",
        projects: [] 
      },
      { 
        firstName: "Mason", 
        lastName: "Nora", 
        phone: "123-456-7806", 
        email: "mason.nora@example.com", 
        contactType: "client", 
        title: "Lead Engineer",
        projects: [] 
      },
      { 
        firstName: "Yvonne", 
        lastName: "Zachary", 
        phone: "123-456-7812", 
        email: "yvonne.zachary@example.com", 
        contactType: "client", 
        title: "Lead Engineer",
        projects: [] 
      },
      { 
        firstName: "George", 
        lastName: "Hank", 
        phone: "123-456-7816", 
        email: "george.hank@example.com", 
        contactType: "client", 
        title: "Lead Engineer",
        projects: [] 
      },
      { 
        firstName: "Steven", 
        lastName: "Tina", 
        phone: "123-456-7822", 
        email: "steven.tina@example.com", 
        contactType: "client", 
        title: "Lead Engineer",
        projects: [] 
      }
    ]
  }
};

const constructionDivisions = [
  "Division 1 - General Requirements",
  "Division 2 - Site Constructions",
  "Division 3 - Concrete",
  "Division 4 - Masonry",
  "Division 5 - Metals",
  "Division 6 - Wood and Plastics",
  "Division 7 - Thermal and Moisture Protection",
  "Division 8 - Doors and Windows",
  "Division 9 - Finishes",
  "Division 10 - Specialties",
  "Division 11 - Equipment",
  "Division 12 - Furnishings",
  "Division 13 - Special Construction",
  "Division 14 - Conveying Systems",
  "Division 15 - Mechanical",
  "Division 16 - Electrical",
  "Division 20 - ABC Miscellaneous",
];


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

const ContactsTable = ({ filteredUsers, toggleSortOrder, sortOrder, handleViewContactClick }) => (
  <table className="min-w-full rounded-corners">
    <thead className="bg-gray-100 sticky top-0 z-20" >
      <tr>
        <th scope="col" className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4" >
          Company 
          <button
            type="button"
            onClick={toggleSortOrder}
            className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {sortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </th>
        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900" >
          Contact 
        </th>
        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell" >
          Title
        </th>
        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell" >
          Phone
        </th>
        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden md:table-cell" >
          Email
        </th>
        <th scope="col" className="relative py-2 px-4" />
      </tr>
    </thead>

    <tbody className="bg-white p">
      {filteredUsers.map((user, idx) => (
        user.isCompanyRow ? (
          <>
            <tr className="bg-white" key={`company-${idx}`}>
              <td className="px-2 pt-2 text-sm text-gray-800" colSpan={6} >
                {idx !== 0 && <hr className='mb-2 ' />}
                <div className='px-2 mr-1'>
                  <span className='font-bold'>{user.companyName}</span> <br/>
                  <span className='text-gray-500 text-xs hidden sm:block'>
                    Bid Status: <span className='text-blue-800'>{companiesWithContacts[user.companyName]?.bidStatus || 'N/A'}</span>
                  </span>
                </div>
              </td>
            </tr>
          </>
        ) : (
          <tr key={`contact-${idx}`}>
            <td className="whitespace-nowrap pl-6 py-2 text-sm font-medium text-gray-900 text-left" ></td>
            <td className="whitespace-nowrap py-2 text-sm font-medium text-gray-900 text-left " >
              {user.firstName} {user.lastName}
            </td>
            <td className="whitespace-nowrap py-2 text-sm text-gray-500 text-left hidden xl:table-cell" >
              {user.title || 'N/A'} <br />
            </td>
            <td className="whitespace-nowrap py-2 text-sm text-gray-500 hidden sm:table-cell text-left" >
              {user.phone} 
            </td>
            <td className="whitespace-nowrap py-2 text-sm text-gray-500 hidden md:table-cell text-left" >
              {user.email}
            </td>
            <td className="whitespace-nowrap pr-4 py-2 text-right text-sm font-medium" >
              <button
                href="#"
                className="text-blue-600 hover:text-blue-900"
                onClick={() => handleViewContactClick(user, user.company)}
              >
                <p className='hidden sm:block'>
                  View
                </p>
                <span className='sm:hidden' >
                  <InfoOutlinedIcon/>
                </span>
              </button>            
            </td>
          </tr>
        )
      ))}
    </tbody>
  </table>
);

const CompaniesTable = ({ filteredUsers, toggleSortOrder, sortOrder, handleViewCompanyClick }) => (
  <table className="min-w-full rounded-corners">
    <thead className="bg-gray-100 sticky top-0 z-20"> {/* Matching bg-gray-100 with ContactsTable */}
      <tr>
        <th scope="col" className="py-2 pr-3 text-left text-sm font-semibold text-gray-900 px-4" > {/* Matching padding and text styles */}
          Company
          <button
            type="button"
            onClick={toggleSortOrder}
            className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {sortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </th>
        <th scope="col" className="py-2  text-left text-sm font-semibold text-gray-900 hidden sm:table-cell" >
          Office Phone
        </th>
        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell" >
          Office Email
        </th>
        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell" >
          Website
        </th>
        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden md:table-cell" >
          Division
        </th>
        <th scope="col" className="py-2 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell" >
          Bid Status
        </th>
        <th scope="col" className="relative py-2 px-4"  />
      </tr>
    </thead>

    <tbody className="bg-white divide-y divide-gray-200">
      {filteredUsers.map((user, idx) => (
        user.isCompanyRow && (
          <tr key={`company-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-white'}> 
            <td className="whitespace-nowrap pl-4 py-4 text-sm font-medium text-gray-900 text-left" >
              {user.companyName}
            </td>
            <td className=" py-4 text-sm text-gray-500 text-left hidden sm:table-cell" >
              {user.companyOfficePhone}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden sm:table-cell" >
              {user.companyEmail}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden xl:table-cell" >
              {user.websiteURL}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden md:table-cell" >
              {user.constructionDivision || 'N/A'}
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-gray-500 text-left hidden xl:table-cell" >
              {user.bidStatus || 'N/A'}
            </td>
            <td className="whitespace-nowrap pr-4 py-2 text-right text-sm font-medium" >
              <button
                href="#"
                className="text-blue-600 hover:text-blue-900"
                onClick={() => handleViewCompanyClick(user.companyName)}
              >
                <p className='hidden sm:block'>
                  View
                </p>
                <span className='sm:hidden'>
                  <InfoOutlinedIcon/>
                </span>
              </button>            
            </td>
          </tr>
        )
      ))}
    </tbody>
  </table>
);

export default function Directory() {
  const [currentTab, setCurrentTab] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const [isViewCompanyModalOpen, setIsViewCompanyModalOpen] = useState(false);
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [selectedContact, setSelectedContact] = useState({});
  const companyRefs = useRef([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // New state for export modal



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
        physicalAddress: companiesWithContacts[company].physicalAddress || 'N/A',
        serviceRegions: companiesWithContacts[company].serviceRegions?.join(", ") || 'N/A',
        companyOfficePhone: companiesWithContacts[company].phoneNumber || 'N/A',
        companyEmail: companiesWithContacts[company].email || 'N/A',
        websiteURL: companiesWithContacts[company].website || 'N/A',
        constructionDivision: companiesWithContacts[company].constructionDivision || 'N/A',
        bidStatus: companiesWithContacts[company].bidStatus || 'N/A', // Include Bid Status
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

    const handleViewCompanyClick = (company) => {
      setSelectedCompany(companiesWithContacts[company]);
      console.log(selectedCompany);
      setIsViewCompanyModalOpen(true);
    };
  
    const handleViewContactClick = (contact, company) => {
      setSelectedContact({ ...contact, company });
      setIsViewContactModalOpen(true);
    };


    const handleExportClick = () => {
      setIsExportModalOpen(true);
    };
  
    const prepareExportData = (companiesWithContacts) => {
      const companyData = Object.keys(companiesWithContacts).map(companyKey => {
          const company = companiesWithContacts[companyKey];
          return {
              Company: company.dba || company.entityName,
              Phone: company.phoneNumber,
              Fax: company.faxNumber,
              Address: `${company.physicalAddress}, ${company.city}, ${company.state}, ${company.postalCode}, ${company.country}`,
              Email: company.email,
              Website: company.website,
              License: company.licenseNumber,
              Union: company.laborUnion,
              ConstructionDivision: company.constructionDivision,
              BidStatus: company.bidStatus
          };
      });
  
      const contactData = Object.keys(companiesWithContacts).reduce((acc, companyKey) => {
          const contacts = companiesWithContacts[companyKey].contacts.map(contact => ({
              Company: companiesWithContacts[companyKey].dba || companiesWithContacts[companyKey].entityName,
              Name: `${contact.firstName} ${contact.lastName}`,
              Title: contact.title,
              Phone: contact.phone,
              Email: contact.email,
              ContactType: contact.contactType
          }));
          return [...acc, ...contacts];
      }, []);
  
      return { companyData, contactData };
  };
  
  const { companyData, contactData } = prepareExportData(companiesWithContacts);


  return (
    <>
      <NewDirectoryContactForm
        isModalOpen={isNewContactModalOpen}
        setIsModalOpen={setIsNewContactModalOpen}
        companiesWithContacts={companiesWithContacts}
        constructionDivisions={constructionDivisions}
        projectId={1} // Update with the correct project ID
      />
  
      <ViewCompanyForm
        isModalOpen={isViewCompanyModalOpen}
        setIsModalOpen={setIsViewCompanyModalOpen}
        companyData={selectedCompany}
        constructionDivisions={constructionDivisions}
      />
  
      <ViewContactForm
        isModalOpen={isViewContactModalOpen}
        setIsModalOpen={setIsViewContactModalOpen}
        contactData={selectedContact}
      />
  
      <PageHeader
        pageTitle={'Project Directory'}
        pageDescription={'A directory of all contacts associated with the project.'}
        trainingVideoSrc={'https://www.youtube.com/watch?v=ztZphO13iIY'}
        trainingImageSrc={'/demoImages/scott-graham-5fNmWej4tAA-unsplash.jpg'}
        trainingTitle={"Project Directory Training "}
      />

  
      <ExportModal 
        isModalOpen={isExportModalOpen} 
        setIsModalOpen={setIsExportModalOpen} 
        data={{ companyData, contactData }} 
        fileName="Project_Directory"
      />
  
      {/* Sticky Search Bar and Buttons */}
      <div className="sticky top-16 sm:static z-30 bg-white py-2"> {/* Sticky container */}
      <MenuTabs
        tabs={tabs}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
      />
        <div className="flex items-center justify-end space-x-2 max-w-full py-2 ">

          {/* Search Bar */}
          <div className="flex-grow sm:flex-shrink-0 max-w-xl rounded-md shadow-sm border">
            <div className="relative flex-grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-0 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
              />
            </div>
          </div>
  
          {/* Add Contact Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center bg-green-600 px-2 rounded-lg py-2 text-sm font-medium text-white hover:bg-green-700"
            onClick={() => setIsNewContactModalOpen(true)}
          >
            <MdAdd className="h-6 w-6" />
            <p className="hidden sm:block text-sm ml-1">Contact</p>
          </button>
  
          {/* Export Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300"
            onClick={handleExportClick}
          >
            <DocumentArrowDownIcon className="h-6 w-6 text-gray-700" />
            <p className="hidden sm:block text-sm ml-1">Export</p>
          </button>
        </div>
      </div>
  
      {/* Scrollable Content (Contacts/Companies Table) */}
      <div className=" flow-root pb-4">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-auto sm:h-[60vh]">
            {currentTab !== 'companies' ? (
              <ContactsTable
                filteredUsers={filteredUsers}
                toggleSortOrder={toggleSortOrder}
                sortOrder={sortOrder}
                handleViewContactClick={handleViewContactClick}
              />
            ) : (
              <CompaniesTable
                filteredUsers={filteredUsers}
                toggleSortOrder={toggleSortOrder}
                sortOrder={sortOrder}
                handleViewCompanyClick={handleViewCompanyClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
  
}    

