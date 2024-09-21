import React, { useState } from 'react';
import NewDailyLogForm from '../components/NewDailyLogForm.component';
import DailyLogCalendarView from '../components/DailyLogCalendarView.component';
import PageHeader from '../../../common/components/PageHeader.component';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, subMonths } from 'date-fns';

function generateRandomId() {
  return Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
}

// Helper function to generate a random completed log with full data
function generateRandomCompletedLog(date) {
  const log = {
    id: generateRandomId(),
    date: format(date, 'MM/dd/yyyy'), // Format date as 'MM/dd/yyyy'
    weatherConditions: [
      { timeStart: '08:00', timeEnd: '12:00', temperature: '70', condition: 'Clear', comments: 'Mild, clear morning.' }
    ],
    manpowerEntries: [
      { company: 'General Builders', workers: 8, hours: 8, location: 'Site A', comments: 'No major issues.' }
    ],
    equipmentEntries: [
      { type: 'Crane', hoursOperating: 6, hoursIdle: 2, costCode: 'CR01', location: 'Site A', inspected: 'yes', comments: 'Operational.' }
    ],
    visitorEntries: [
      { name: 'Alice Brown', start: '10:00', end: '11:00', comments: 'Inspection.' }
    ],
    callEntries: [
      { toFrom: 'to', toFromName: 'John Smith', company: 'Steel Solutions', start: '14:00', end: '14:20', comments: 'Discussed steel delay.' }
    ],
    inspectionEntries: [
      { start: '11:00', end: '12:00', inspectionType: 'Structural', inspectionEntity: 'City', inspectorName: 'Jane Doe', location: 'Building 1', comments: 'Passed.' }
    ],
    deliveryEntries: [
      { time: '13:30', deliveryFrom: 'Concrete Inc.', trackingNumber: 'CN123', contents: 'Concrete Mix', comments: 'Delivered to Site A.' }
    ],
    violationEntries: [
      { time: '09:30', subject: 'Safety Gear', safetyNotice: 'Lack of safety helmets', issuesTo: 'Safety Manager', complianceDue: '09/02/2024', comments: 'Non-compliance by workers.' }
    ],
    accidentEntries: [
      { time: '15:30', partyInvolved: 'Mike Johnson', companyInvolved: 'Subcontractor Inc.', comments: 'Minor injury.' }
    ],
    dumpsterEntries: [
      { company: 'Waste Management', delivered: 2, removed: 1, comments: 'One dumpster replaced.' }
    ],
    wasteEntries: [
      { time: '16:00', material: 'Steel Scrap', disposedBy: 'John Doe', methodOfDisposal: 'Recycling', disposalLocation: 'Recycle Depot', approximateQuantity: '1000 lbs', comments: 'Properly recycled.' }
    ],
    restroomEntries: [
      { company: 'Clean Restrooms', delivered: 1, removed: 0, comments: 'Additional restroom delivered.' }
    ],
    workEntries: [
      { resource: 'General Builders', scheduledTasks: 'Framing', showed: 'yes', reimbursed: 'no', workers: 6, hours: 8, rate: 25, total: 1200, comments: 'Completed all tasks.' }
    ],
    delayEntries: [
      { delayType: 'Weather', startTime: '12:00', endTime: '14:00', duration: '2.00', location: 'Site A', comments: 'Rain delayed work.' }
    ],
    photos: [
      { src: '/photos/09-01-2024.jpg', file: {} }
    ],
    containsInformation: true
  };

  return log;
}

// Helper function to generate an empty log for a specific date
function generateEmptyDailyLog(date) {
  const log = {
    id: generateRandomId(),
    date: format(date, 'MM/dd/yyyy'), // Format date as 'MM/dd/yyyy'
    weatherConditions: [],
    manpowerEntries: [],
    equipmentEntries: [],
    visitorEntries: [],
    callEntries: [],
    inspectionEntries: [],
    deliveryEntries: [],
    violationEntries: [],
    accidentEntries: [],
    dumpsterEntries: [],
    wasteEntries: [],
    restroomEntries: [],
    workEntries: [],
    delayEntries: [],
    photos: [],
    containsInformation: false
  };

  return log;
}

// Function to generate logs for both the current and previous month
function generateLogsForMonth() {
  const today = new Date();
  const currentMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today)
  });

  const previousMonth = eachDayOfInterval({
    start: startOfMonth(subMonths(today, 1)),
    end: endOfMonth(subMonths(today, 1))
  });

  const days = [...previousMonth, ...currentMonth];

  // Create a log for each day, with some days having completed logs
  const logs = days.map(date => {
    // Randomly decide if this day should have a completed log
    return Math.random() > 0.7 ? generateRandomCompletedLog(date) : generateEmptyDailyLog(date);
  });

  return logs;
}

// Prepare the logs to be displayed in the calendar
function prepareCalendarData(dailyLogHistory) {
  const today = format(new Date(), 'yyyy-MM-dd');

  return dailyLogHistory.map(log => {
    const formattedDay = format(new Date(log.date), 'yyyy-MM-dd');

    if (formattedDay === today) {
      return { ...log, color: 'bg-green-500 text-white', label: 'Current' }; // Current day (green)
    } else if (log.containsInformation) {
      return { ...log, color: 'bg-blue-500 text-white', label: `ID #${log.id}` }; // Logs present with data (blue)
    } else {
      return { ...log, color: 'bg-gray-300', label: '' }; // Empty day (gray)
    }
  });
}

// Fetch the logs for current and previous months
const dailylogs = generateLogsForMonth();

const companies = ['Company A', 'Company B', 'Company C'];

const tabs = [
  { name: 'Daily Log', href: '#', key: 'daily' },
  { name: 'Calendar View', href: '#', key: 'calendar' },
];

export default function DailyLogs() {
  const [currentTab, setCurrentTab] = useState('daily');
  const formattedDailyLogs = prepareCalendarData(dailylogs);

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
                dailyLogHistory={formattedDailyLogs}
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
