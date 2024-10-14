import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import BuildIcon from '@mui/icons-material/Build';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';

interface AppNavigationProps {
  inner_content: React.ReactNode;
}

type NavigationItem = {
  name: string;
  Link: string;
};

const projectTools: NavigationItem[] = [
  { name: 'Directory', Link: '/project/:id/project-directory' },
  { name: 'Daily Logs', Link: '/project/:id/daily-logs/:id' },
  { name: 'Meetings', Link: '/project/:id/meetings' },
  { name: 'Submittals', Link: '/project/:id/submittals' },
  { name: 'Transmittals', Link: '/project/:id/transmittals' },
  { name: 'RFIs', Link: '/project/:id/request-for-information' },
  { name: 'Documents', Link: '/project/:id/documents' },
  { name: 'Procurement', Link: '/project/:id/procurement' },
  { name: 'Schedule', Link: '/project/:id/schedule' },
  { name: 'Drawings', Link: '/project/:id/drawings' },
  { name: 'Punch List', Link: '/project/:id/punch-list' },
  { name: 'Close Out', Link: '/project/:id/close-out' },
  { name: 'Reports', Link: '/project/:id/reports' },
  { name: 'Project Todo List', Link: '/project/:id/project-to-do-list' },
];

const userNavigation: NavigationItem[] = [
  { name: 'Your profile', Link: '#' },
  { name: 'Sign out', Link: '#' },
];

const mockProjects = [
  { id: 1, name: 'Project Alpha' },
  { id: 2, name: 'Project Beta' },
  { id: 3, name: 'Project Gamma' },
  { id: 4, name: 'Project Delta' },
  { id: 5, name: 'Project Epsilon' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const AppNavigation: React.FC<AppNavigationProps> = ({ inner_content }) => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function isActive(Link: string): boolean {
    return location.pathname === Link;
  }

  const filteredProjects = mockProjects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <>
        {/* Top Navigation Bar */}
          <div className="fixed top-0 left-0 right-0 z-40 flex h-[52px] items-center justify-center bg-gray-950 px-2 text-white shadow-sm">
            <div className="flex items-center gap-x-4 sm:gap-x-6 ">
              <div className="pt-1">
                <img
                    src="/logos/conflo logo app Black no bkgd.png"
                    alt="CONFLO"
                    className="h-10"
                />
              </div>

              <div className="relative">
                {/* Search Icon */}
                <FaSearch
                    className="text-gray-50 text-xl cursor-pointer sm:hidden"
                    onClick={() => setShowSearch(!showSearch)}
                />

                {/* Dropdown Search Bar for larger screens */}
                <div className="hidden sm:block relative">
                  <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-56 h-8 px-4 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Search for projects..."
                  />
                  {searchTerm && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        {filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/project/${project.id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100"
                                onClick={() => setSearchTerm('')}
                            >
                              {project.name}
                            </Link>
                        ))}
                        {filteredProjects.length === 0 && (
                            <div className="px-4 py-2 text-sm text-gray-500">No projects found</div>
                        )}
                      </div>
                  )}
                </div>

                {/* Dropdown Search Bar for mobile that pops out below the nav */}
                {showSearch && (
                    <div className="fixed top-12 left-0 right-0 z-50 bg-gray-700 px-4 py-2">
                      <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full h-8 px-4 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Search for projects..."
                      />
                      {searchTerm && (
                          <div className="mt-2 w-full bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            {filteredProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={`/project/${project.id}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100"
                                    onClick={() => {
                                      setSearchTerm('');
                                      setShowSearch(false);
                                    }}
                                >
                                  {project.name}
                                </Link>
                            ))}
                            {filteredProjects.length === 0 && (
                                <div className="px-4 py-2 text-sm text-gray-500">No projects found</div>
                            )}
                          </div>
                      )}
                    </div>
                )}
              </div>

              {/* Dashboard Link */}
              <Link
                  to="/project/:id/dashboard"
                  className={`flex flex-col items-center font-medium hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''}`}
              >
                <MdDashboard className="h-6 w-6" aria-hidden="true" />
                <span className="hidden text-xs lg:block">Dashboard</span>
              </Link>

              {/* Project Tools Flyout */}
              <Popover className="relative">
                {({ close }) => (
                    <>
                      <PopoverButton
                          className={`flex flex-col items-center font-medium hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''}`}
                      >
                        <BuildIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="hidden text-xs lg:block">Tools</span>
                      </PopoverButton>
                      <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-xs -translate-x-1/2 px-4 transition"
                      >
                        <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                          {projectTools.map((tool, index) => (
                              <Link
                                  key={index}
                                  to={tool.Link}
                                  className={`block p-2 hover:text-indigo-600 ${isActive(tool.Link) ? 'text-yellow-400' : ''}`}
                                  onClick={() => close()}
                              >
                                {tool.name}
                              </Link>
                          ))}
                        </div>
                      </PopoverPanel>
                    </>
                )}
              </Popover>

              {/* Financial Tools Flyout */}
              <Popover className="relative">
                {({ close }) => (
                    <>
                      <PopoverButton
                          className={`flex flex-col items-center font-medium hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''}`}
                      >
                        <AccountBalanceIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="hidden text-xs lg:inline">Finance</span>
                      </PopoverButton>
                      <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-xs -translate-x-1/2 px-4 transition"
                      >
                        <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                          <Link
                              to="/financial-management"
                              className={`block p-2 hover:text-indigo-600 ${isActive('/financial-management') ? 'text-yellow-400' : ''}`}
                              onClick={() => close()}
                          >
                            Overview
                          </Link>
                        </div>
                      </PopoverPanel>
                    </>
                )}
              </Popover>

              {/* Bid Management Flyout */}
              <Popover className="relative">
                {({ close }) => (
                    <>
                      <PopoverButton
                          className={`flex flex-col items-center font-medium hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''}`}
                      >
                        <GavelIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="hidden text-xs lg:inline">Bidding</span>
                      </PopoverButton>
                      <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-xs -translate-x-1/2 px-4 transition"
                      >
                        <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                          <Link
                              to="/bid-management"
                              className={`block p-2 hover:text-indigo-600 ${isActive('/bid-management') ? 'text-yellow-400' : ''}`}
                              onClick={() => close()}
                          >
                            Overview
                          </Link>
                        </div>
                      </PopoverPanel>
                    </>
                )}
              </Popover>

              {/* Notification Button */}
              <button
                  className={`flex flex-col items-center font-medium hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''}`}
              >
                <FaBell className="h-6 w-6" aria-hidden="true" />
                <span className="hidden text-xs lg:inline">Notifications</span>
              </button>

              {/* User Menu Flyout */}
              <Popover className="relative">
                {({ close }) => (
                    <>
                      <PopoverButton
                          className={`flex flex-col items-center font-medium hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''}`}
                      >
                        <img
                            className="h-6 w-6 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />

                        {/*<div className="flex items-center">*/}
                        {/*  <span className="text-xs lg:inline">Me</span>*/}
                        {/*  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                        {/*</div>*/}
                      </PopoverButton>


                      <PopoverPanel
                          transition
                          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-xs -translate-x-1/2 px-4 transition"
                      >
                        <div className="w-56 shrink rounded-xl bg-white p-4 text-sm font-medium leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                          {userNavigation.map((item, index) => (
                              <Link
                                  key={index}
                                  to={item.Link}
                                  className={`block p-2 hover:text-indigo-600 ${isActive(item.Link) ? 'text-yellow-400' : ''}`}
                                  onClick={() => close()}
                              >
                                {item.name}
                              </Link>
                          ))}
                        </div>
                      </PopoverPanel>
                    </>
                )}
              </Popover>
            </div>
          </div>


          {/* Main Content */}
          <main className="">
            <div className="mt-12 fixed bg-white min-h-full w-full">
              <div className="absolute left-0 w-full h-full overflow-y-auto">
                <div className="">{inner_content}</div>
              </div>
            </div>
          </main>
      </>
  );
};

export default AppNavigation;
