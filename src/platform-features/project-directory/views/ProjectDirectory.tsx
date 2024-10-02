import React, { useState, useEffect, useRef } from 'react';
// Import interfaces
import { Company, Contact, Tab } from '../../../types/directory'; // Correct path to your types

// Other imports...
import '../styles/Directory.css';
import ViewContactForm from '../../project-directory/components/ViewContactForm.component';
import ViewCompanyForm from '../../project-directory/components/ViewCompanyForm.component';
import NewDirectoryContactForm from '../../project-directory/components/NewDirectoryContactForm.component';
import ExportModal from '../../project-directory/components/ExportModal.component';
import FullPageHeader from '../../../common/components/FullPageHeader.component';
import ContactsTable from '../components/ContactsTable.component';
import CompaniesTable from '../components/CompaniesTable.component';
import companiesWithContacts from '../../../mock-data/companiesWithContacts';
import { useDynamicContentHeight } from "../../../common/utils/useDynamicContentHeightSettingOne";
import AddContactForm from "./AddContactForm";
import { useNavigate } from "react-router-dom";


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
  const [isViewCompanyModalOpen, setIsViewCompanyModalOpen] = useState<boolean>(false);
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [mainContentHeight, setMainContentHeight] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useDynamicContentHeight(headerRef, setMainContentHeight, );

  useEffect(() => {}, [currentTab]);

  const handleAddNewContactButtonClick = (): void => {
    handleNavigate();
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/project/:id/directory/new-contact-form', {
    });
  };

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.key);
  };

  const handleViewCompanyClick = (companyName: string) => {
    const companyData = companiesWithContacts[companyName] as Company;
    setSelectedCompany(companyData);
  };

  // const handleViewContactClick = (contact: Contact, company: Company) => {
  //   setSelectedContact({ ...contact, company: company.entityName });
  // };

  const handleViewContactClick = (contact: Contact, company: Company) => {
    // Keep company and contact data separate
    setSelectedContact({
      ...contact,
      // Don't pass `company` directly into `Contact`
      // If you need to show the company somewhere, store it separately
    });
  };


  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  return (
    <>

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
        ref={headerRef}
      />

      <main className="flow-root">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-auto" style={{ height: mainContentHeight }}>
            {currentTab !== 'companies' ? (
              <ContactsTable
                currentTab={currentTab}
                companiesWithContacts={companiesWithContacts}
                searchQuery={searchQuery}
                handleViewContactClick={handleViewContactClick}
                paginationRef={paginationRef}
              />
            ) : (
              <CompaniesTable
                searchQuery={searchQuery}
                handleViewCompanyClick={handleViewCompanyClick}
                companiesWithContacts={companiesWithContacts}
                paginationRef={paginationRef}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
