import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { add, format, eachDayOfInterval, endOfMonth, startOfMonth, sub, startOfWeek, endOfWeek } from 'date-fns';
import React, { useState } from 'react';
import MenuTabs from '../../../common/components/MenuTabs.component';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DailyLogCalendarView({ dailyLogHistory, currentTab, handleTabClick, tabs }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const firstLogDate = format(new Date(dailyLogHistory[0]?.date || new Date()), 'yyyy-MM-dd');

  const firstDayOfMonth = startOfMonth(selectedMonth);
  const lastDayOfMonth = endOfMonth(selectedMonth);

  console.log(dailyLogHistory)

  // Create a map of logs by date for easy lookup
  const logMap = dailyLogHistory.reduce((acc, log) => {
    const formattedDate = format(new Date(log.date), 'yyyy-MM-dd');
    acc[formattedDate] = log; // Store log info by date
    return acc;
  }, {});

  const today = format(new Date(), 'yyyy-MM-dd');

  // Calculate the days to display (including the previous month's and next month's dates)
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }), // Starts on Monday
    end: endOfWeek(lastDayOfMonth, { weekStartsOn: 1 }),
  });

  function handlePrevMonth() {
    setSelectedMonth(sub(selectedMonth, { months: 1 }));
  }

  function handleNextMonth() {
    setSelectedMonth(add(selectedMonth, { months: 1 }));
  }

  
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full">
          {/* Month navigation */}
          <div className="bg-white pt-2">
            <MenuTabs
              tabs={tabs}
              currentTab={currentTab}
              handleTabClick={handleTabClick}
            />
            <div className="flex items-center sm:m-auto sm:max-w-xs justify-between py-2">
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 hover:bg-green-500 hover:text-white hover:border-green-600 transition"
                onClick={handlePrevMonth}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon style={{ height: '1.125rem', width: '1.125rem' }} aria-hidden="true" />
              </button>
              <div className="flex-auto text-sm font-semibold text-center">
                {format(selectedMonth, 'MMMM yyyy')}
              </div>
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 hover:bg-green-500 hover:text-white hover:border-green-600 transition"
                onClick={handleNextMonth}
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon style={{ height: '1.125rem', width: '1.125rem' }} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Days of the week */}

          <div className=" border-l border-r border-t rounded-t-lg grid grid-cols-7 text-sm leading-6 text-gray-500 ">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="isolate grid grid-cols-7 gap-px border border-t-gray-300 rounded-b-lg bg-gray-100 text-sm shadow-sm">
            {days.map((day, dayIdx) => {
              const formattedDay = format(day, 'yyyy-MM-dd');
              const log = logMap[formattedDay];

              const isBeforeFirstLog = formattedDay < firstLogDate;
              const isAfterToday = formattedDay > today;

              // Determine the style and label for each day
              let innerDivStyle = ''; // Default for empty day
              let label = `ID #${log?.id || 'N/A'}`; // Show ID even for empty logs

              if (formattedDay === today) {
                innerDivStyle = 'bg-green-500 text-white'; // Current day
                label = 'Current';
              } else if (log && log.containsInformation) {
                innerDivStyle = 'bg-blue-300 text-white'; // Day with a log containing data
              } else {
                innerDivStyle = 'bg-gray-300'; // Empty log
              }

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  className={classNames(
                    'hover:bg-gray-100 focus:z-10',
                    format(day, 'MM') === format(selectedMonth, 'MM') ? 'bg-white' : 'bg-gray-200',
                    dayIdx === 0 && '',
                    dayIdx === 6 && '',
                    dayIdx === days.length - 7 && '',
                    dayIdx === days.length - 1 && '',
                  )}
                >
                  <time
                    dateTime={formattedDay}
                    className="mx-auto my-5 flex h-5 w-5 sm:my-5  items-center justify-center"
                  >
                    {format(day, 'd')}
                  </time>
                  {isBeforeFirstLog || isAfterToday ? (
                    <div className="py-2 mb-2 mx-1">
                      {/* Placeholder for non-existent log days */}
                    </div>
                   ) : format(day, 'MM') === format(selectedMonth, 'MM') && (
                    <div className={`py-1.5 rounded-md my-5 sm:my-2 mx-1 ${innerDivStyle}`}>
                      <span className="hidden sm:block  text-xs">{label}</span>
                    </div>
                  )}
                  
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
