import React, {useRef, useState} from 'react';
import { MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid';
import TransmittalsListView from '../components/TransmittalsListView.component';
import MenuTabs from '../../../common/components/MenuTabs.component';
import { MdAdd } from 'react-icons/md';
import PageHeader from '../../../common/components/PageHeader.component';
import FullPageHeader from "../../../common/components/FullPageHeader.component";
import {useNavigate} from "react-router-dom";
import {useDynamicContentHeight} from "../../../common/utils/useDynamicContentHeightSettingOne";

interface Tab {
  name: string;
  key: string;
}

const tabs: Tab[] = [
  { name: 'All Transmittals',  key: 'all' },
  { name: 'Transmittal Groups', key: 'groups' },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const Transmittals: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mainContentHeight, setMainContentHeight] = useState<string>('');
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useDynamicContentHeight(headerRef, setMainContentHeight);

  const handleNewMeetingButtonClick = (): void => {
    navigate(`/project/:id/transmittals/new-transmittal-form`);
  };

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.key);
  };

  const handleExportClick = (): void => {
    console.log("Exporting data...");
  };


  return (
      <>
          <div className="p-4">

              <FullPageHeader
                  ref={headerRef}
                  pageTitle="Transmittals"
                  pageDescription="A list of all transmittals associated with this project."
                  trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                  trainingTitle="Transmittals Training"
                  tabs={tabs}
                  currentTab={currentTab}
                  handleTabClick={handleTabClick}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleAddButtonClick={handleNewMeetingButtonClick}
                  addButtonTitle="Transmittal"
                  handleExportClick={handleExportClick}
              />
              <div className="overflow-auto"
                   style={{height: mainContentHeight}}
              >
                  <TransmittalsListView/>
              </div>
          </div>
          </>

          );
          }

          export default Transmittals;
