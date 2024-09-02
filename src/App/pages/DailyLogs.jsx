import React, { useState } from 'react';
import PageHeader from '../components/PageHeader.component';
import MenuTabs from '../components/MenuTabs.component';
import SearchBar from '../components/SearchBar.component';
import NewDailyLogForm from '../components/DailyLogCompnents/NewDailyLogForm.component';

const companies = [
  'Company A', 'Company B', 'Company C'
];

const tabs = [
  { name: 'List View', href: '#', key: 'all' },
  { name: 'Calendar View', href: '#', key: 'calendar' },
  { name: 'Current Daily Log', href: '#', key: 'current' }, // New tab for current daily log
];

export default function DailyLogs() {
  const [currentTab, setCurrentTab] = useState('all');
  const [isNewDailyLogFormVisible, setIsNewDailyLogFormVisible] = useState(false);

  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
    if (tab.key === 'current') {
      setIsNewDailyLogFormVisible(true);
    } else {
      setIsNewDailyLogFormVisible(false);
    }
  };

  const createDailyLog = () => {
    setIsNewDailyLogFormVisible(true);
    setCurrentTab('current'); // Switch to the "Current Daily Log" tab
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

      <MenuTabs
        tabs={tabs}
        currentTab={currentTab}
        handleTabClick={handleTabClick}
      />

          
        {isNewDailyLogFormVisible && (
            <div className='border rounded-md'>
              <div className="px-4 pt-6 mb-4">
            <div className="sm:flex sm:items-center">
              <div className="flex-auto"></div>
              <SearchBar placeholder="Search" />
              <div className="flex my-6 sm:my-0 ml-4">
                <div className="flex-auto"></div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={createDailyLog}
                >
                  Create Daily Log 
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border bg-gray-100 ml-4 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <p className='text-xs ml-1 mr-1'>Export</p>
                </button>
              </div>
            </div>
          </div>
              <NewDailyLogForm
                isModalOpen={isNewDailyLogFormVisible}
                setIsModalOpen={setIsNewDailyLogFormVisible}
                companyData={companies}
              />
             
            </div>
        )}

      {!isNewDailyLogFormVisible && (
        <>
        <div className='border rounded-md'>
          <div className="px-4 pt-6 ">
            <div className="sm:flex sm:items-center">
              <div className="flex-auto"></div>
              <SearchBar placeholder="Search" />
              <div className="flex my-6 sm:my-0 ml-4">
                <div className="flex-auto"></div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={createDailyLog}
                >
                  Create Daily Log 
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border bg-gray-100 ml-4 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <p className='text-xs ml-1 mr-1'>Export</p>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flow-root border-t pb-4">
            <div className="align-middle inline-block min-w-full">
              <div className="min-h-[480px] max-h-[480px]">
                <table className="min-w-full">
                  <thead className="bg-gray-200 sticky top-0 z-20">
                    <tr>
                      <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 px-4" style={{ width: '20%' }}>
                        Creation Date
                      </th>
                      <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 px-4" style={{ width: '20%' }}>
                        Info
                      </th>
                      <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell" style={{ width: '20%' }}>
                        Info
                      </th>
                      <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell" style={{ width: '20%' }}>
                        Info
                      </th>
                      <th scope="col" className="relative py-3.5 px-4" style={{ width: '10%' }} />
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Placeholder for the daily logs list */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}
