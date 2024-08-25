// DailyLogs.js
import React, { useState } from 'react';
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

//components
import PageHeader from '../components/PageHeader.component';
import MenuTabs from '../components/MenuTabs.component';
import SearchBar from '../components/SearchBar.component';
import ObservedWeatherConditions from '../components/DailyLogCompnents/ObservedWeatherConditions.component';
import Manpower from '../components/DailyLogCompnents/ManPower.component';
import NewDailyLogForm from '../components/DailyLogCompnents/NewDailyLogForm.component';

const dailyLogs = [
  {
      dailyId: 'DL001',
      creationDate: '2024-08-24',
      observedWeatherConditions: [
          {
              timeStart: '08:00',
              timeEnd: '17:00',
              temperature: '75°F',
              rain: '0.0 inches',
              wind: '5 mph',
              snow: '0.0 inches',
              comments: 'Clear skies throughout the day'
          }
      ],
      manPower: [
          {
              company: 'AlphaCorp',
              workers: 15,
              hours: 120,
              locationArea: 'North Wing',
              comments: 'Full crew on site'
          }
      ],
      notes: [
          {
              issues: 'Delay in material delivery',
              locationArea: 'East entrance',
              comments: 'Need to reschedule some tasks',
              attachments: ['delay-report.pdf']
          }
      ],
      equipment: [
          {
              equipmentType: 'Crane',
              hoursOperating: 8,
              hoursIdle: 1,
              costCode: 'EQ123',
              location: 'Site A',
              inspected: true,
              comments: 'No issues noted'
          }
      ],
      visitors: [
          {
              name: 'John Doe',
              start: '10:00',
              end: '11:00',
              comments: 'Safety inspection walkthrough'
          }
      ],
      phoneCalls: [
          {
              toFrom: 'To',
              company: 'ABC Supplies',
              start: '09:30',
              end: '09:45',
              comments: 'Confirmed delivery schedule'
          }
      ],
      inspections: [
          {
              start: '13:00',
              end: '14:00',
              inspectionType: 'Electrical',
              inspectionEntity: 'State Board',
              inspectorName: 'Alice Johnson',
              location: 'Main Hall',
              area: 'Electrical Panel',
              comments: 'All standards met'
          }
      ],
      deliveries: [
          {
              time: '12:00',
              deliveryFrom: 'XYZ Corp',
              trackingNumber: 'XYZ123456789',
              contents: 'Steel beams',
              comments: 'Delivered on time'
          }
      ],
      safetyViolations: [
          {
              time: '15:30',
              subject: 'Lack of PPE',
              safetyNotice: 'Notice 1234',
              issuedTo: 'Foreman',
              complianceDue: '2024-09-01',
              comments: 'Corrective action required'
          }
      ],
      accidents: [
          {
              time: '16:00',
              partyInvolved: 'Worker',
              companyInvolved: 'C001',
              comments: 'Minor injury, first aid administered'
          }
      ],
      dumpsters: [
          {
              company: 'Waste Services',
              delivered: 2,
              removed: 1,
              comments: 'One dumpster exchanged'
          }
      ],
      waste: [
          {
              time: '17:00',
              material: 'Concrete',
              disposedBy: 'Waste Services',
              methodOfDisposal: 'Recycling',
              disposalLocation: 'Recycling Center',
              approximateQuantity: '2 tons',
              comments: 'Proceeded as scheduled'
          }
      ],
      scheduledWork: [
          {
              resource: 'Labor',
              scheduledTasks: 'Pour foundation',
              showed: true,
              reimbursed: false,
              workers: 10,
              hours: 80,
              rate: '$25/hour',
              comments: 'Work completed on time'
          }
      ],
      dailyPhotos: [
          {
              upload: 'site-photo-001.jpg'
          }
      ],
      delays: [
          {
              delayType: 'Material',
              startTime: '14:00',
              endTime: '15:00',
              duration: '1 hour',
              location: 'Gate 2',
              comments: 'Truck breakdown delayed material arrival'
          }
      ]
  }
];

const companies = [
  'asdf', 'asdfa', 'adsfa'
]

const tabs = [
  { name: 'List View', href: '#', key: 'all' },
  { name: 'Calendar View', href: '#', key: 'internal' },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DailyLogs() {
  const [currentTab, setCurrentTab] = useState('all');
  const [isNewDailyLogModalOpen, setIsNewDailyLogModalOpen] = useState(false);
  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

  const createDailyLog = () => {

  }

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

        <NewDailyLogForm
          isModalOpen={isNewDailyLogModalOpen}
          setIsModalOpen={setIsNewDailyLogModalOpen}
          companyData={companies}
        />

{/* <div className="border mb-12 rounded-md shadow" style={{ minHeight: '650px'}}>

    <ObservedWeatherConditions/>
    <Manpower
      companies={companies}
      />
</div> */}







      <div className="border rounded-md shadow" style={{ minHeight: '650px', maxHeight: '550px' }}>
  
          <div className='px-4 pt-6'>
            <div className="sm:flex sm:items-center">
              <div className="flex-auto"></div>

              <SearchBar
                // searchQuery={searchQuery}
                // setSearchQuery={setSearchQuery}
                placeholder="Search"
              />

              <div className="flex my-6 sm:my-0 ml-4">
                <div className="flex-auto"></div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setIsNewDailyLogModalOpen(true)}
                >
                  Create Daily Log 
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border bg-gray-100 ml-4 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  // onClick={handleExportClick}
                >
                  <p className='text-xs ml-1 mr-1'>Export</p>
                  {/* <DocumentArrowDownIcon className="h-4 w-4 text-gray-700" /> */}
                </button>
              </div>
            </div>
          </div>










        
        
        
        
          <div className="mt-4 flow-root border-t pb-4">
            <div className="align-middle inline-block min-w-full">
              <div className="overflow-auto" style={{ minHeight: '480px', maxHeight: '480px' }}>
        
        
          <table className="min-w-full">
            <thead className="bg-gray-200 sticky top-0 z-20">
              <tr>
                <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 px-4" style={{ width: '20%' }}>
                  Creation Date
                  <button
                    type="button"
                    // onClick={toggleSortOrder}
                    className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                  >
                    {/* {sortOrder === 'asc' ? '▲' : '▼'} */}
                  </button>
                </th>
                <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 px-4" style={{ width: '20%' }}>
                  info
                </th>
                <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell" style={{ width: '20%' }}>
                info
                </th>
                <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell" style={{ width: '20%' }}>
                info
                </th>
                <th scope="col" className="relative py-3.5 px-4" style={{ width: '10%' }} />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* {filteredUsers.map((user, idx) => (
                user.isCompanyRow ? (
                  <tr className="bg-gray-50 sticky top-[48px] z-10" key={`company-${idx}`}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800" colSpan={5} style={{width: '20%'}}>
                      {user.companyName} - <span className='text-blue-500'>{companiesWithContacts[user.companyName]?.bidStatus || 'N/A'}</span>
                    </td>
                  </tr>
                ) : (
                  <tr key={`contact-${idx}`}>
                    <td className="whitespace-nowrap pl-4 py-3 text-sm font-medium text-gray-900 text-left" style={{ width: '20%' }}></td>
                    <td className="whitespace-nowrap pl-4 py-3 text-sm font-medium text-gray-900 text-left" style={{ width: '20%' }}>
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="whitespace-nowrap py-3 text-sm text-gray-500 hidden md:table-cell text-left" style={{ width: '20%' }}>
                      {user.title || 'N/A'} <br />
                    </td>
                    <td className="whitespace-nowrap py-3 text-sm text-gray-500 hidden sm:table-cell text-left" style={{ width: '20%' }}>
                      {user.phone} <br />
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap pr-6 py-3 text-center text-sm font-medium" style={{ width: '10%' }}>
                      <button
                        href="#"
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleViewContactClick(user, user.company)}
                      >
                        Manage
                      </button>            
                    </td>
                  </tr>
                )
              ))} */}
            </tbody>
          </table>
</div>
</div>
</div>
      
      </div>
    </>
  );
}
