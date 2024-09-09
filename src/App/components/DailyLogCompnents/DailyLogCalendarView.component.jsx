import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { add, format, eachDayOfInterval, endOfMonth, startOfMonth, sub, startOfWeek, endOfWeek } from 'date-fns'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DailyLogCalendarView({ handleTabClick }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const firstDayOfMonth = startOfMonth(selectedMonth)
  const lastDayOfMonth = endOfMonth(selectedMonth)

  // Calculate the days to display (including the previous month's and next month's dates)
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }), // Starts on Monday
    end: endOfWeek(lastDayOfMonth, { weekStartsOn: 1 }),
  })

  // Dummy data for filled logs
  const logs = {
    '2024-09-02': true,
    '2024-09-04': true,
    '2024-09-06': true,
    '2024-09-07': true,
    '2024-09-15': true,
    '2024-09-22': true,
  }

  function handlePrevMonth() {
    setSelectedMonth(sub(selectedMonth, { months: 1 }))
  }

  function handleNextMonth() {
    setSelectedMonth(add(selectedMonth, { months: 1 }))
  }

  return (
    <div className="flex justify-center py-8">
      <div className="lg:h-[80vh] w-[90%] h-[600px] ">
        {/* Month navigation */}
        <div className="flex items-center justify-between text-gray-900 mb-4">
          
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={handlePrevMonth}
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto text-sm font-semibold text-center">
            {format(selectedMonth, 'MMMM yyyy')}
          </div>
          <button
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={handleNextMonth}
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Days of the week */}
        <div className="grid grid-cols-7 text-xs leading-6 text-gray-500">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
            <div key={day} className="text-center">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow">
            {days.map((day, dayIdx) => (
                <button
                key={day.toISOString()}
                type="button"
                className={classNames(
                    'py-4 px-4 hover:bg-gray-100 focus:z-10', // Increased padding to make the boxes larger
                    format(day, 'MM') === format(selectedMonth, 'MM') ? 'bg-white' : 'bg-gray-50',
                    (day.isSelected || format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) && 'font-semibold',
                    format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && 'text-indigo-600',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg',
                )}
                >
                <time
                    dateTime={format(day, 'yyyy-MM-dd')}
                    className={classNames(
                    'mx-auto flex h-6 w-6 items-center justify-center rounded-full', // Keeping the circle size the same
                    logs[format(day, 'yyyy-MM-dd')] ? 'bg-blue-500 text-white' : undefined
                    )}
                >
                    {format(day, 'd')}
                </time>
                </button>
            ))}
            </div>


        {/* Button for current daily log */}
        <button
          type="button"
          className="mt-8 w-full rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-green-600 "
          onClick={() => handleTabClick('daily')}
        >
          Current Daily Log
        </button>
      </div>
    </div>
  )
}
