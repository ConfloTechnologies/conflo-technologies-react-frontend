import React, { useState, useRef, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmittalsListView from '../componenets/SubmittalsListView.component';
import FullPageHeader from '../../../common/components/FullPageHeader.component';
import { useDynamicContentHeight } from '../../../common/utils/useDynamicContentHeightSettingOne';

// Define the structure for the Tab object
interface Tab {
  name: string;
  key: string;
}

const tabs: Tab[] = [
  { name: 'All Submittals',  key: 'all' },
  { name: 'Submittal Groups', key: 'groups' },
];

const Meetings: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mainContentHeight, setMainContentHeight] = useState<string>('');
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useDynamicContentHeight(headerRef, setMainContentHeight);

  const handleNewMeetingButtonClick = (): void => {
    navigate(`/project/:id/new-meeting-form`);
  };

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.key);
  };

  const handleExportClick = (): void => {
    console.log("Exporting data...");
  };

  return (
      <>
        <FullPageHeader
            ref={headerRef}
            pageTitle="Submittals"
            pageDescription="A list of all submittals associated with this project."
            trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
            trainingTitle="Submittals Training"
            tabs={tabs}
            currentTab={currentTab}
            handleTabClick={handleTabClick}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleAddButtonClick={handleNewMeetingButtonClick}
            addButtonTitle="Submittal"
            handleExportClick={handleExportClick}
        />
        <div className="overflow-auto"
             style={{height: mainContentHeight}}
        >
          <SubmittalsListView/>
        </div>
        </>
  );
        };

        export default Meetings;
