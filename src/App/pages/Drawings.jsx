import React, { useState } from 'react';
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const tabs = [
    { name: 'All', href: '#', key: 'all' },
    { name: 'Internals', href: '#', key: 'internal' },
    { name: 'Owners', href: '#', key: 'owners' },
    { name: 'Subcontractors', href: '#', key: 'subcontractors' },
  ]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Drawings() {
  const [currentTab, setCurrentTab] = useState('all');

  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

  return (
    <>
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
        
      </div>
    </>
  );
}
