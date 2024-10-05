import React, { useState, useEffect, useRef } from 'react';
// Import interfaces
import { Company, Contact, Tab } from '../../../types/directory'; // Correct path to your types

// Other imports...
import '../styles/Directory.css';
import ExportModal from '../../project-directory/components/ExportModal.component';
import FullPageHeader from '../../../common/components/FullPageHeader.component';
import ContactsTable from '../components/ContactsTable.component';
import CompaniesTable from '../components/CompaniesTable.component';
import companiesWithContacts from '../../../mock-data/companiesWithContacts';
import { useDynamicContentHeight } from "../../../common/utils/useDynamicContentHeightSettingOne";
import { useNavigate } from "react-router-dom";


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
    navigate('/project/:id/project-directory/new-contact-form', {
    });
  };

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.key);
  };


  const handleViewContactClick  = () => {
    navigate('/project/:id/project-directory/contact/:id', {
    });
  };

  const handleViewCompanyClick  = () => {
    navigate('/project/:id/project-directory/company/:id', {
    });
  };


  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  return (
    <>
      <ExportModal
          companiesWithContacts={companiesWithContacts}
          isModalOpen={isExportModalOpen}
          setIsModalOpen={setIsExportModalOpen}
          fileName="Project_Directory"
      />

      <div className={"p-4"}>
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
      </div>
    </>
  );
}
