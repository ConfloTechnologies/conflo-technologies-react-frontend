import { useState, Fragment, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const landingNavigation = [
  { name: 'Project Dashboard', href: '/dashboard/project/:id' },
  { name: 'Documents', href: '/documents/project/:id' },
  { name: 'RFIs', href: '/rfis/project/:id' },
  { name: 'Submittals', href: '/submittals/project/:id' },
  { name: 'Transmittals', href: '/transmittals/project/:id' },
  { name: 'Punch List', href: '/punch-list/project/:id' },
  { name: 'Meetings', href: '/meetings/project/:id' },
  { name: 'Schedule', href: '/schedule/project/:id' },
  { name: 'Drawings', href: '/drawings/project/:id' },
  { name: 'Close Out', href: '/close-out/project/:id' },
  { name: 'Procurement', href: '/procurement/project/:id' },
  { name: 'Daily Logs', href: '/daily-logs/project/:id' },
  { name: 'Directory', href: '/directory/project/:id'}
];

const projectNavigation = [
  { name: 'Projects', href: '/dashboard' },
  { name: 'Pre Construction', href: '/pre-construction' },
  { name: 'Financial Management', href: '/financial-management' }
];

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AppNavigation({ inner_content }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [activeNavigation, setActiveNavigation] = useState(landingNavigation);

  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname.startsWith('/project')) {
      setActiveNavigation(projectNavigation);
    } else {
      setActiveNavigation(landingNavigation);
    }
  }, [location]);

  function isActive(href) {
    return location.pathname === href;
  }

  return (
    <>
      <div>
        <Dialog className="relative z-50 lg:hidden" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <Transition show={sidebarOpen} as={Fragment}>
            <DialogBackdrop className="fixed inset-0 transition-opacity duration-300 ease-linear" />
            <div className="fixed inset-0 flex">
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out">
                <TransitionChild>
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <h2 className="text-white text-4xl font-bold pl-4 mt-5 tracking-wide">
                      <Link to="/dashboard">
                        <span className="text-yellow-400">C</span>ONFLO
                      </Link>
                    </h2>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-2">
                      {activeNavigation.map((item, index) => (
                        <li key={index} className={isActive(item.href) ? 'border border-white-sm' : ''}>
                          <Link to={item.href} className="block py-2 px-4 text-md font-semibold text-gray-300 hover:bg-gray-700 hover:text-white">{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </div>
          </Transition>
        </Dialog>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <h2 className="text-white text-4xl font-bold pl-4 mt-5 tracking-wide">
                <Link to="/dashboard">
                  <span className="text-yellow-400">C</span>ONFLO
                </Link>
              </h2>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-y-2">
                {activeNavigation.map((item, index) => (
                  <li key={index} className={isActive(item.href) ? 'rounded-md border border-2 border-white' : ''}>
                    <Link to={item.href} className="block bg-gray-900 rounded-md py-2 px-4 text-md font-semibold text-gray-300 hover:bg-gray-700 hover:text-white">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64">
          <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-black px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:pl-72 lg:pr-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">Search</label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-8 w-full border-0 py-1.5 pl-8 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-white rounded-full"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-white" aria-hidden="true">
                        Tom Cook
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </MenuButton>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={classNames(active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900')}
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
          </div>

          <main className="pt-20 px-4 sm:px-6 lg:px-8">
            {inner_content}
          </main>
        </div>
      </div>
    </>
  );
}
