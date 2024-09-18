import React, { useState } from 'react';
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon, DocumentArrowDownIcon } from '@heroicons/react/20/solid'
import MeetingsListView from '../components/MeetingsListView.component'
import MenuTabs from '../../App/components/MenuTabs.component';
import { MdAdd } from 'react-icons/md';
import PageHeader from '../../App/components/PageHeader.component';
const tabs = [
    { name: 'All Meetings', href: '#', key: 'all' },
  ]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Meetings() {
  const [currentTab, setCurrentTab] = useState('all');

  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

  return (
    <>
      <PageHeader
        pageTitle={'Meetings'}
        pageDescription={'A list of all meetings associated with this project.'}
        trainingVideoSrc={'https://www.youtube.com/watch?v=ztZphO13iIY'}
        trainingImageSrc={'/demoImages/scott-graham-5fNmWej4tAA-unsplash.jpg'}
        trainingTitle={"Meetings Training"}
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
              <p className="hidden sm:block text-md font-semibold ml-1">Meeting</p>
            </button>

            {/* Export Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300"
              // onClick={handleExportClick}
            >
              <DocumentArrowDownIcon className="h-6 w-6 text-gray-700" />
              <p className="hidden sm:block text-md font-semibold  ml-1">Export</p>
            </button>
          </div>
        </div>
        
          <MeetingsListView/>

        
    </>
  );
}
