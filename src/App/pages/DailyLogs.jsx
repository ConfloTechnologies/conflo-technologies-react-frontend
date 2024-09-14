import React, { useState } from 'react';
import NewDailyLogForm from '../components/DailyLogCompnents/NewDailyLogForm.component';
import DailyLogCalendarView from '../components/DailyLogCompnents/DailyLogCalendarView.component';
import { CalendarIcon, PencilIcon } from '@heroicons/react/24/outline';  // Correct import for Heroicons v2

const companies = ['Company A', 'Company B', 'Company C'];

const tabs = [
  { name: 'Current Daily Log', href: '#', key: 'daily' }, // New tab for current daily log
  { name: 'Calendar', href: '#', key: 'calendar' },
];


export default function DailyLogs() {
  const [currentTab, setCurrentTab] = useState('daily');

  const handleTabClick = (tabKey) => {
    console.log("Tab changing to:", tabKey); // Add this to see if the function is being called
    setCurrentTab(tabKey);
  };
  

  const PageHeader = ({ pageTitle, pageDescription, trainingImageSrc, trainingVideoSrc, trainingTitle }) => {
    return (
      <>
        <div className='grid grid-cols-2 border p-4 rounded-md mb-4 '>
          <div className='col-span-1 flex justify-start items-center'>
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold leading-6 text-gray-900">
                {pageTitle}
              </h1>
              <p className="hidden md:flex mt-2 text-sm text-gray-700 " style={{ minWidth: '350px' }}>
                {pageDescription}
              </p>
            </div>
          </div>
          <div className='hidden md:flex col-span-1 justify-end items-center '>
            <a 
              href={trainingVideoSrc} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='rounded-md border flex items-center space-x-2 hover:bg-blue-100 hover:border-blue-400 hover:shadow-lg transform transition-transform duration-200 hover:scale-105'
            >
              <img src={trainingImageSrc} alt="YouTube" className="h-12 w-12 rounded-l-md"/>
              <span className='pr-2'>{trainingTitle}</span>
            </a>
          </div>
          <div className="md:hidden col-span-1 flex justify-end items-center space-x-2">
            <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in-out flex items-center space-x-1" onClick={() => handleTabClick('calendar')}>
              <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
            <button className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-200 ease-in-out flex items-center space-x-1" onClick={() => handleTabClick('daily')}>
              <PencilIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>    
      </>
    )
  };

  return (
    <>
      <PageHeader
        pageTitle={'Daily Logs'}
        pageDescription={'A list of all daily documentation for each project.'}
        trainingVideoSrc={'https://www.youtube.com/watch?v=ztZphO13iIY'}
        trainingImageSrc={'/demoImages/scott-graham-5fNmWej4tAA-unsplash.jpg'}
        trainingTitle={"Daily Logs Training "}
      />

      {/* <MenuTabs
        tabs={tabs}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
      /> */}

      {/* <div> */}
        {/* <h1 className='font-bold text-xl'>Daily Logs</h1> */}
      {/* </div> */}

      <div className="hidden col-span-1 md:flex justify-end items-center space-x-2">
        <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in-out flex items-center space-x-1" onClick={() => handleTabClick('calendar')}>
          <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <span className="hidden sm:inline-block text-white font-medium">Calendar</span>
        </button>
        <button className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-200 ease-in-out flex items-center space-x-1" onClick={() => handleTabClick('daily')}>
          <PencilIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <span className="hidden sm:inline-block text-white font-medium">Current Daily Log</span>
        </button>
      </div>

      {currentTab === 'daily' ? (
        <div className="">
          <NewDailyLogForm companyData={companies} />
        </div>
      ) : (
        <div className="">
          <DailyLogCalendarView handleTabClick={handleTabClick}/>
        </div>
      )}

    </>
  );
}

