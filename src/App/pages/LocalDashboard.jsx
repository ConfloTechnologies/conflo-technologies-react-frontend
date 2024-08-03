import React from 'react';
import { Link } from 'react-router-dom';
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'

// Example projects data with unique names and full addresses
const projects = [
  { id: 1, name: 'Project Aurora', location: '123 Broadway, New York, NY', imageUrl: '/demoImages/dakota-roos-dSRhwPe6v9c-unsplash.jpg' },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4">
      
      <div className='grid grid-cols-1 sm:grid-cols-2 border p-6 rounded-md mb-6 shadow'>
        <div className='col-span-1 flex justify-start items-center'>
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold leading-6 text-gray-900">Projects Dashboard</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the projects in your company.
              </p>
            </div>
        </div>

        <div className='col-span-1 flex justify-end items-center'>
          <div className='rounded-md border px-4 py-2 shadow shadow-md flex items-center space-x-2'>
            <img src="https://example.com/youtube-icon.png" alt="YouTube" className="h-6 w-6"/>
            <span>TRAINING VIDEO HERE</span>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className='border rounded-md p-2 shadow-md'>
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
                <button
                  type="button"
                  className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Cards */}
     
        <div className="px-4 py-12">
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link 
                to={`/dashboard/project/${project.id}`} 
                key={project.id} 
                className="flex flex-col items-center bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
                  <img
                    src={project.imageUrl || 'https://via.placeholder.com/300'}
                    alt={project.name}
                    className="w-full h-full object-cover transform transition duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
  );
}
