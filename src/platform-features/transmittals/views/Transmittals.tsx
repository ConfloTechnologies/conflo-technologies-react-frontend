import React, { useState } from 'react';
import { MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid';
import TransmittalsListView from '../components/TransmittalsListView.component';
import MenuTabs from '../../../common/components/MenuTabs.component';
import { MdAdd } from 'react-icons/md';
import PageHeader from '../../../common/components/PageHeader.component';

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
  // Uncomment below if you want to use search functionality
  // const [searchQuery, setSearchQuery] = useState<string>('');

  const handleTabClick = (tab: Tab): void => {
    setCurrentTab(tab.key);
  };

  return (
      <>
        <PageHeader
            pageTitle="Transmittals"
            pageDescription="A list of all transmittals associated with this project."
            trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
            trainingTitle="Transmittals Training"
        />

        <div className="sticky top-16 sm:static z-30 bg-white py-2"> {/* Sticky container */}
          <MenuTabs
              tabs={tabs}
              currentTab={currentTab}
              handleTabClick={handleTabClick}
          />

          <div className="flex items-center justify-end space-x-2 sm:space-x-4 max-w-full py-2 bg-white ">
            {/* Search Bar */}
            <div className="flex-grow sm:flex-shrink-0 max-w-xl rounded-md shadow-sm border">
              <div className="relative flex-grow focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border-0 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Add Contact Button */}
            <button
                type="button"
                className="inline-flex items-center justify-center bg-green-600 px-2 rounded-lg py-2 text-sm font-medium text-white hover:bg-green-700"
                // onClick={() => setIsNewContactModalOpen(true)}
            >
              <MdAdd className="h-6 w-6" />
              <p className="hidden sm:block text-md font-semibold mx-1">Transmittal</p>
            </button>

            {/* Export Button */}
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300"
                // onClick={handleExportClick}
            >
              <DocumentArrowDownIcon className="h-6 w-6 text-gray-700" />
              <p className="hidden sm:block text-md font-semibold mx-1">Export</p>
            </button>
          </div>
        </div>

        <TransmittalsListView/>
      </>
  );
}

export default Transmittals;
