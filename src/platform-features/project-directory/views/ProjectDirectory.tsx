import React, { useState, useEffect, useRef,  useLayoutEffect } from 'react';
import '../styles/Directory.css';
import ViewContactForm from '../../project-directory/components/ViewContactForm.component';
import ViewCompanyForm from '../../project-directory/components/ViewCompanyForm.component';
import NewDirectoryContactForm from '../../project-directory/components/NewDirectoryContactForm.component';
import ExportModal from '../../project-directory/components/ExportModal.component';
import FullPageHeader from '../../../common/components/FullPageHeader.component';
import ContactsTable from '../components/ContactsTable.component';
import CompaniesTable from '../components/CompaniesTable.component';
import companiesWithContacts from '../../../mock-data/companiesWithContacts';
import { Company, Contact, Tab } from '../../../types/directory';
import {useDynamicContentHeight} from "../../../common/utils/useDynamicContentHeightSettingOne";

// Array of construction divisions
const constructionDivisions: string[] = [
  'Division 1 - General Requirements',
  'Division 2 - Site Constructions',
  'Division 3 - Concrete',
  'Division 4 - Masonry',
  'Division 5 - Metals',
  'Division 6 - Wood and Plastics',
  'Division 7 - Thermal and Moisture Protection',
  'Division 8 - Doors and Windows',
  'Division 9 - Finishes',
  'Division 10 - Specialties',
  'Division 11 - Equipment',
  'Division 12 - Furnishings',
  'Division 13 - Special Construction',
  'Division 14 - Conveying Systems',
  'Division 15 - Mechanical',
  'Division 16 - Electrical',
  'Division 20 - ABC Miscellaneous',
];

// Array of tabs
const tabs: Tab[] = [
  { name: 'All Contacts', key: 'all' },
  { name: 'Internal Contacts', key: 'internal' },
  { name: 'Subcontractor Contacts', key: 'contractor' },
  { name: 'Client Contacts', key: 'client' },
  { name: 'Companies', key: 'companies' },
];

export default function Directory() {
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState<boolean>(false);
  const [isViewCompanyModalOpen, setIsViewCompanyModalOpen] = useState<boolean>(false);
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const [mainContentHeight, setMainContentHeight] = useState('');
  const headerRef = useRef<HTMLDivElement>(null); // Fix type here
  const paginationRef = useRef<HTMLDivElement>(null);
  useDynamicContentHeight(headerRef, setMainContentHeight, );

  useEffect(() => {}, [currentTab]);

  const handleAddNewContactButtonClick = (): void => {
    setIsNewContactModalOpen(true);
};



  // Tab click handler
  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.key);
  };

  // View company click handler
  const handleViewCompanyClick = (companyName: string) => {
    const companyData = companiesWithContacts[companyName] as Company;
    setSelectedCompany(companyData);
    setIsViewCompanyModalOpen(true);
  };

  // View contact click handler
  const handleViewContactClick = (contact: Contact, company: Company) => {
    setSelectedContact({ ...contact, company: company.entityName });
    setIsViewContactModalOpen(true);
  };

  // Export click handler
  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  return (
    <>
      {/* Modal for adding new contact */}
      <NewDirectoryContactForm
        isModalOpen={isNewContactModalOpen}
        setIsModalOpen={setIsNewContactModalOpen}
        companiesWithContacts={companiesWithContacts}
        constructionDivisions={constructionDivisions}
        projectId={1} // Update with the correct project ID
      />

      {/* Modal for viewing/editing company details */}
      <ViewCompanyForm
        isModalOpen={isViewCompanyModalOpen}
        setIsModalOpen={setIsViewCompanyModalOpen}
        companyData={selectedCompany}
        constructionDivisions={constructionDivisions}
      />

      {/* Modal for viewing/editing contact details */}
      <ViewContactForm
        isModalOpen={isViewContactModalOpen}
        setIsModalOpen={setIsViewContactModalOpen}
        contactData={selectedContact}
      />

      {/* Uncomment when ExportModal is ready */}

      <ExportModal
        companiesWithContacts={companiesWithContacts}
        isModalOpen={isExportModalOpen}
        setIsModalOpen={setIsExportModalOpen}
        fileName="Project_Directory"
      />


      {/* Full page header */}
      <FullPageHeader
          ref={headerRef}
        pageTitle="Project Directory"
        pageDescription="A directory of all contacts associated with the project."
        trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
        trainingTitle="Project Directory Training"
        tabs={tabs}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleAddButtonClick={handleAddNewContactButtonClick}
        addButtonTitle={'Contact'}
        handleExportClick={handleExportClick}
      />

      {/* Main content */}
      <main className="flow-root">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-auto" style={{ height: mainContentHeight }}>
            {currentTab !== 'companies' ? (
                  <ContactsTable
                    currentTab={currentTab}
                    companiesWithContacts={companiesWithContacts}
                    searchQuery={searchQuery}
                    handleViewContactClick={handleViewContactClick}
                    paginationRef={paginationRef}  // Pass paginationRef here

                  />
            ) : (
              <CompaniesTable
                searchQuery={searchQuery}
                handleViewCompanyClick={handleViewCompanyClick}
                companiesWithContacts={companiesWithContacts}
                paginationRef={paginationRef}  // Pass paginationRef here

              />
            )}

          </div>
        </div>
      </main>
    </>
  );
}
