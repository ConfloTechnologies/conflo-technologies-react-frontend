import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MeetingsListView from '../components/MeetingsListView.component';
import FullPageHeader from '../../../common/components/FullPageHeader.component';

import { useDynamicContentHeight } from "../../../common/utils/useDynamicContentHeightSettingOne";

// Define the structure for the Tab object
interface Tab {
  name: string;
  key: string;
}

const tabs: Tab[] = [
  { name: 'All Meetings', key: 'all' },
];


const Meetings: React.FC = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mainContentHeight, setMainContentHeight] = useState('');
  const headerRef = useRef<HTMLDivElement>(null); // Fix type here
  // const paginationRef = useRef<HTMLDivElement>(null);
  useDynamicContentHeight(headerRef, setMainContentHeight, 75);

  const handleNewMeetingButtonClick = (): void => {
    navigate(`/project/:id/meetings/new-meeting-form`); // UPDATE IN PRODUCTION
    return;
  }

  

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.key);
  };

  const handleExportClick = () => {
    console.log("Exporting data...");
  };

  return (
    <>
      <div className="p-4">
      <FullPageHeader
          ref={headerRef}
        pageTitle="Meetings"
        pageDescription="A list of all meetings associated with this project."
        trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
        trainingTitle="Meetings Training"
        tabs={tabs}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleAddButtonClick={handleNewMeetingButtonClick}
        addButtonTitle={'Meeting'}
        handleExportClick={handleExportClick}
      />
      <div className="overflow-auto"
           style={{ height: mainContentHeight }}
      >
        <MeetingsListView />
      </div>
      </div>
    </>
  );
}

export default Meetings;
