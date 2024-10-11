import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaTachometerAlt } from 'react-icons/fa';
import BuildIcon from '@mui/icons-material/Build';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

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
  { name: 'To-Do List', Link: '/project/:id/to-do-list' },
];

const userNavigation: NavigationItem[] = [
  { name: 'Your profile', Link: '#' },
  { name: 'Sign out', Link: '#' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const AppNavigation: React.FC<AppNavigationProps> = ({ inner_content }) => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  function isActive(Link: string): boolean {
    return location.pathname === Link;
  }

  return (
      <>
        {/* Top Navigation Bar */}
        <div
            className="fixed top-0 left-0 right-0 z-40 flex h-12 justify-center items-center gap-x-4 bg-gray-950 px-4 shadow-sm sm:gap-x-6 sm:px-6">
          <div className="flex items-center gap-x-4 pt-3">

              <img
                  src="/logos/conflo logo no back ground.png"
                  alt="CONFLO"
                  style={{width: '160px'}}
              />

          </div>

          <div className="flex items-center gap-x-4 ml-auto">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true"/>
            </button>
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center">
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
              </MenuButton>
              <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  {userNavigation.map((item, index) => (
                      <MenuItem key={index}>
                        {({focus}) => (
                            <Link
                                to={item.Link}
                                className={classNames(
                                    focus ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                )}
                            >
                              {item.name}
                            </Link>
                        )}
                      </MenuItem>
                  ))}
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-12 bg-gray-800 text-white w-full">
          <div className="flex justify-between items-center px-6 py-1">

            <div className=" px-4 py-2 relative">
              {/* Search Icon */}
              <FaSearch
                  className="text-gray-50 text-xl cursor-pointer sm:hidden" // Only show icon on mobile
                  onClick={() => setShowSearch(!showSearch)}
              />

              {/* Dropdown Search Bar for larger screens */}
              <input
                  type="text"
                  className="hidden sm:block w-56 h-7 px-4 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Search for projects..."
              />

              {/* Dropdown Search Bar for mobile that pops out to the right */}
              {showSearch && (
                  <input
                      type="text"
                      className="absolute top-0 left-full w-48 h-7 px-4 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-300 ease-out sm:hidden" // Animating the pop-out
                      placeholder="Search for projects..."
                  />
              )}
            </div>

            {/* Dashboard Link */}
            <Link
                to="/dashboard/project/:id"
                className={`px-4 py-2 font-semibold hover:text-yellow-400 ${isActive('/dashboard/project/:id') ? 'text-yellow-400 underline' : ''}`}
            >
              <FaTachometerAlt className="inline-block mr-2 h-6 w-6" aria-hidden="true"/>
              <span className="hidden lg:inline">Project Dashboard</span>
            </Link>

            {/* Project Tools Flyout */}
            <Popover className="relative">
              {({close}) => (
                  <>
                    <PopoverButton className="px-4 py-2 font-semibold hover:text-yellow-400 flex items-center">
                      <BuildIcon className="mr-2 h-5 w-5" aria-hidden="true"/>
                      <span className="hidden lg:inline">Project Tools</span>
                      {/*<ChevronDownIcon className="ml-2 h-5 w-5" />*/}
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-xs -translate-x-1/2 px-4 transition"
                    >
                      <div
                          className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
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
              {({close}) => (
                  <>
                    <PopoverButton className="px-4 py-2 font-semibold hover:text-yellow-400 flex items-center">
                      <AccountBalanceIcon className="mr-2 h-5 w-5" aria-hidden="true"/>
                      <span className="hidden lg:inline">Financial Tools</span>
                      {/*<ChevronDownIcon className="ml-2 h-5 w-5" />*/}
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-xs -translate-x-1/2 px-4 transition"
                    >
                      <div
                          className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
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
              {({close}) => (
                  <>
                    <PopoverButton className="px-4 py-2 font-semibold hover:text-yellow-400 flex items-center">
                      <GavelIcon className="mr-2 h-5 w-5" aria-hidden="true"/>
                      <span className="hidden lg:inline">Bid Management</span>
                      {/*<ChevronDownIcon className="ml-2 h-5 w-5" />*/}
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-xs -translate-x-1/2 px-4 transition"
                    >
                      <div
                          className="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
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
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <div className='fixed bg-white min-h-full w-full'>
            <div className='absolute left-0 w-full h-full overflow-y-auto'>
              <div className=''>
                {inner_content}
              </div>
            </div>
          </div>
        </main>
      </>
  );
};

export default AppNavigation;
