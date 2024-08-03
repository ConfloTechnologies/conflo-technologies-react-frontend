import React, { useState } from 'react';
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import NewDirectoryContactForm from '../components/NewDirectoryContactForm.component';

// Mock data generation
const names = ["Adam", "Bella", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah", "Ian", "Jenna", "Kyle", "Laura", "Mason", "Nora", "Oliver", "Paula", "Quinn", "Rachel", "Steven", "Tina", "Uma", "Victor", "Wendy", "Xavier", "Yvonne", "Zach"];
const titles = ["Architect", "Project Manager", "Structural Engineer", "Site Supervisor", "Electrician", "Front-end Developer"];
const roles = ["Member", "Admin", "Guest"];
const companies = ["Alpha Corp", "Beta LLC", "Gamma Inc", "Delta Ltd", "Epsilon GmbH"];
const projects = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta", "Project Epsilon"];

const tabs = [
    { name: 'All', href: '#', key: 'all' },
    { name: 'Internals', href: '#', key: 'internal' },
    { name: 'Owners', href: '#', key: 'owners' },
    { name: 'Subcontractors', href: '#', key: 'subcontractors' },
];

// Create mock users with company and project
const users = names.reduce((acc, name, index) => {
  for (let i = 0; i < 4; i++) {
    const fullName = `${name} ${names[(index + i) % names.length]}`;
    const title = titles[i % titles.length];
    const email = `${name.toLowerCase()}.${names[(index + i) % names.length].toLowerCase()}@example.com`;
    const role = roles[i % roles.length];
    const company = companies[(index + i) % companies.length];
    const project = projects[(index + i) % projects.length];

    acc.push({ name: fullName, title, email, role, company, project });
  }
  return acc;
}, []);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Directory() {
  const [currentTab, setCurrentTab] = useState('all');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleTabClick = (tab) => {
    setCurrentTab(tab.key);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortKey === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortKey === 'company') {
      return sortOrder === 'asc' ? a.company.localeCompare(b.company) : b.company.localeCompare(a.company);
    } else if (sortKey === 'project') {
      return sortOrder === 'asc' ? a.project.localeCompare(b.project) : b.project.localeCompare(a.project);
    }
    return 0;
  });

  const groupedUsers = sortedUsers.reduce((acc, user) => {
    const groupKey = sortKey === 'name' ? user.name[0] : user[sortKey];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(user);
    return acc;
  }, {});

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

      <div className="border rounded-md shadow">
        <div className='px-6 pt-6'>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold leading-6 text-gray-900">Directory</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account, organized alphabetically by {sortKey}.
              </p>
            </div>
            <div className="mt-3 sm:ml-4 sm:mt-0">
              <label htmlFor="mobile-search-candidate" className="sr-only">
                Search
              </label>
              <label htmlFor="desktop-search-candidate" className="sr-only">
                Search
              </label>
              <div className="flex rounded-md shadow-sm">
                <div className="relative flex-grow focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="mobile-search-candidate"
                    name="mobile-search-candidate"
                    type="text"
                    placeholder="Search"
                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                  />
                  <input
                    id="desktop-search-candidate"
                    name="desktop-search-candidate"
                    type="text"
                    placeholder="Search candidates"
                    className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                  />
                </div>
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <BarsArrowUpIcon aria-hidden="true" className="-ml-0.5 h-5 w-5 text-gray-400" />
                  Filter
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="mt-4 ml-4 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsModalOpen(true)}
              >
                Add user
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flow-root border-t pb-6">
          <div className="align-middle inline-block min-w-full">
            <div className="overflow-auto" style={{ maxHeight: '550px' }}>
              <table className="min-w-full">
                <thead className="bg-gray-50 sticky top-0 z-20">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Name
                      {sortKey === 'name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('title')}
                    >
                      Title
                      {sortKey === 'title' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      Email
                      {sortKey === 'email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('role')}
                    >
                      Role
                      {sortKey === 'role' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('company')}
                    >
                      Company
                      {sortKey === 'company' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('project')}
                    >
                      Project
                      {sortKey === 'project' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                    </th> */}
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(groupedUsers).sort().map(group => (
                    <React.Fragment key={group}>
                      <tr>
                        <td colSpan="7" className="sticky top-[47px] z-10 border-t py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 bg-gray-100">
                          {group}
                        </td>
                      </tr>
                      {groupedUsers[group].map((user, idx) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.title}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.role}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.company}</td>
                          {/* <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.project}</td> */}
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <NewDirectoryContactForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} companies={companies} />
    </>
  );
}
