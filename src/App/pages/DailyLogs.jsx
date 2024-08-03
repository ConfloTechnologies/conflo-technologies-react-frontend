// DailyLogs.js
import React, { useState } from 'react';
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Submitted Daily Logs', href: '#', key: 'all' },
  // { name: 'Internals', href: '#', key: 'internal' },
  // { name: 'Owners', href: '#', key: 'owners' },
  // { name: 'Subcontractors', href: '#', key: 'subcontractors' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DailyLogs() {
  const [currentTab, setCurrentTab] = useState('all');

  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 border p-6 rounded-md mb-6 shadow'>
        <div className='col-span-1 flex justify-start items-center'>
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">Daily Logs</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the projects in your company.
            </p>
          </div>
        </div>

        <div className='col-span-1 flex justify-end items-center'>
          <div className='rounded-md border px-4 py-2 shadow shadow-md flex items-center space-x-2'>
            <img src="https://example.com/youtube-icon.png" alt="YouTube" className="h-6 w-6" />
            <span>TRAINING VIDEO HERE</span>
          </div>
        </div>
      </div>
      <div className='mb-5'>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            value={currentTab}
            onChange={(e) => handleTabClick(tabs.find(tab => tab.key === e.target.value))}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.key}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={() => handleTabClick(tab)}
                  aria-current={currentTab === tab.key ? 'page' : undefined}
                  className={classNames(
                    currentTab === tab.key
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="border rounded-md shadow" style={{ minHeight: '650px', maxHeight: '550px' }}>
        <div className='px- pt-6 m-4'>
          <div className="sm:flex sm:items-center">
            <div className="mt-3 sm:ml-4 sm:mt-0 flex-grow">
              <div className="flex rounded-md shadow-sm">
                <div className="relative flex-grow focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search projects"
                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  />
                </div>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                  Filter
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" />
                </button>
                <Link
                  to="/new-daily-log"
                  className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  New Daily Log
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
