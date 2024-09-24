import { useState, useEffect } from 'react';
import '../styles/Directory.css';
import ViewContactForm from '../../project-directory/components//ViewContactForm.component';
import ViewCompanyForm from '../../project-directory/components//ViewCompanyForm.component';
import NewDirectoryContactForm from '../../project-directory/components//NewDirectoryContactForm.component';
import ExportModal from '../../project-directory/components/ExportModal.component';
import FullPageHeader from '../../../common/components/FullPageHeader.component';
import ContactsTable from '../components/ContactsTable.component';
import companiesWithContacts from '../../../mock-data/companiesWithContacts'
import CompaniesTable from '../components/CompaniesTable.component';

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
  { name: 'Subcontractor Contacts', href: '#', key: 'contractor' },
  { name: 'Client Contacts', href: '#', key: 'client' },
  { name: 'Companies', href: '#', key: 'companies' },
];


export default function Directory() {
  const [currentTab, setCurrentTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const [isViewCompanyModalOpen, setIsViewCompanyModalOpen] = useState(false);
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [selectedContact, setSelectedContact] = useState({});
  const [isExportModalOpen, setIsExportModalOpen] = useState(false); // New state for export modal

  useEffect(() => {
  }, [currentTab]);


  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

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

      <ExportModal 
        companiesWithContacts={companiesWithContacts}
        isModalOpen={isExportModalOpen} 
        setIsModalOpen={setIsExportModalOpen} 
        fileName="Project_Directory"
      />
  
      <FullPageHeader
        pageTitle={'Project Directory'}
        pageDescription={'A directory of all contacts associated with the project.'}
        trainingVideoSrc={'https://www.youtube.com/watch?v=ztZphO13iIY'}
        trainingImageSrc={'/demoImages/scott-graham-5fNmWej4tAA-unsplash.jpg'}
        trainingTitle={"Project Directory Training "}
        tabs={tabs}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsNewContactModalOpen={setIsNewContactModalOpen}
        handleExportClick={handleExportClick}
      />

      <main className="flow-root pb-4">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-auto sm:h-[65vh]">
            {currentTab !== 'companies' ? (
              <ContactsTable
                currentTab={currentTab}
                companiesWithContacts={companiesWithContacts}
                searchQuery={searchQuery}
                handleViewContactClick={handleViewContactClick}
              />
            ) : (
              <CompaniesTable
                searchQuery={searchQuery}
                handleViewCompanyClick={handleViewCompanyClick}
                companiesWithContacts={companiesWithContacts}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
  
}    

