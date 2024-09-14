import React, { useState } from 'react';
import NewDailyLogForm from '../components/DailyLogCompnents/NewDailyLogForm.component';
import DailyLogCalendarView from '../components/DailyLogCompnents/DailyLogCalendarView.component';
import MenuTabs from '../components/MenuTabs.component';
import PageHeader from '../components/PageHeader.component';

const companies = ['Company A', 'Company B', 'Company C'];

const tabs = [
  { name: 'Daily Log', href: '#', key: 'daily' },
  { name: 'Calendar View', href: '#', key: 'calendar' },
];

export default function DailyLogs() {
  const [currentTab, setCurrentTab] = useState('daily');

  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

  return (
    <>
      {/* Wrapping the entire page content */}
      <div className='relative min-h-screen '>
        {/* PageHeader */}
        <PageHeader
          pageTitle={'Daily Logs'}
          pageDescription={'A list of all daily documentation for each project.'}
          trainingVideoSrc={'https://www.youtube.com/watch?v=ztZphO13iIY'}
          trainingImageSrc={'/demoImages/scott-graham-5fNmWej4tAA-unsplash.jpg'}
          trainingTitle={"Daily Logs Training "}
        />


        {/* Scrollable Content */}
        <div className="">
          {currentTab === 'daily' ? (
            <div className="">
              <NewDailyLogForm 
                companyData={companies}
                currentTab={currentTab}
                handleTabClick={handleTabClick} 
                tabs={tabs}  
              />
            </div>
          ) : (
            <div className="">
              <DailyLogCalendarView 
                currentTab={currentTab}
                handleTabClick={handleTabClick} 
                tabs={tabs} 
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
