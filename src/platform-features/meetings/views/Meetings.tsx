import React, { useState } from 'react';
import { MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid';
import { MdAdd } from 'react-icons/md';
import MeetingsListView from '../components/MeetingsListView.component';
import FullPageHeader from '../../../common/components/FullPageHeader.component';

// Define the structure for the Tab object
interface Tab {
  name: string;
  key: string;
}

const tabs: Tab[] = [
  { name: 'All Meetings', key: 'all' },
];



const Meetings: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState<boolean>(false);

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.key);
  };

  const handleExportClick = () => {
    console.log("Exporting data..."); // Implement this function based on your needs
  };

  return (
    <>
      <FullPageHeader
        pageTitle="Meetings"
        pageDescription="A list of all meetings associated with this project."
        trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
        trainingImageSrc="/demoImages/scott-graham-5fNmWej4tAA-unsplash.jpg"
        trainingTitle="Meetings Training"
        tabs={tabs}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsNewContactModalOpen={setIsNewContactModalOpen}
        handleExportClick={handleExportClick}
      />

      <MeetingsListView />
    </>
  );
}

export default Meetings;
