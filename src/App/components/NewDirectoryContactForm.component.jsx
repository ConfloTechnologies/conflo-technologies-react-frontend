import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition, Combobox } from '@headlessui/react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash.debounce';

export default function NewDirectoryContactForm({ isModalOpen, setIsModalOpen, companies = [] }) {
  const cancelButtonRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [isFocused, setIsFocused] = useState(false);
  
    // Function to handle search input changes
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // Function to handle item click
    const handleItemClick = (item) => {
      setSelectedItem(item);
      setSearchTerm('');
      setIsFocused(false); // Close dropdown after selection
    };
  
    // Function to handle input focus
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    // Function to handle input blur
    const handleBlur = () => {
      // Delay blur to allow interaction with dropdown items
      setTimeout(() => setIsFocused(false), 150);
    };
  
    // Filter companies based on the search term or show all if focused
    const filteredItems = companies.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleCancel = () => {
    // resetForm();
    setIsModalOpen(false);
  };

  const renderCompanySearch = () => {
    // Calculate dynamic margin top for the button based on dropdown visibility and item count
    const buttonMarginTop = (isFocused || searchTerm) ? `${Math.min(filteredItems.length * 40, 200) + 10}px` : '20px'; // 40px per item, max 160px, plus extra space

    return (
        <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10" style={{ minHeight: '500px' }}>
                <div className="mb-12">
                    <div className="py-5">
                        <label htmlFor="search_companies" className="block text-sm font-medium leading-6 text-gray-900">
                            Select a pre-existing company:
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="search_companies"
                                type="text"
                                placeholder="Search companies..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {(isFocused || searchTerm) && (
                                <ul className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto">
                                    {filteredItems.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleItemClick(item)}
                                            className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                    {filteredItems.length === 0 && (
                                        <li className="px-3 py-2 text-gray-500">No results found</li>
                                    )}
                                </ul>
                            )}
                            {selectedItem && (
                                <div className="pl-2 mt-4">
                                    Selected Company: <strong>{selectedItem}</strong>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5" style={{ marginTop: buttonMarginTop }}>
                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
                            Create a new company:
                        </label>
                        <div className="mt-3">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md 
                                    bg-green-600 px-3 py-2 text-sm font-semibold
                                    text-white shadow-sm ring-1 ring-inset ring-green-600
                                    hover:bg-green-700 "
                                onClick={handleCancel}
                                ref={cancelButtonRef}
                            >
                                Create New Company
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


  
  

  const renderCompanyInfo = () => (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div className='mt-5'>
          <h2 className="text-base pt-4 border-t border-gray-900/10 font-semibold leading-7 text-gray-900">
            Company Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Enter the core company details that will be associated with this project. This includes the main address where project-related communications will be sent.
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 md:mt-5">
          <div className="col-span-6">
            <label htmlFor="company_name" className="block text-sm font-medium leading-6 text-gray-900">
              Company
            </label>
            <div className="mt-2">
              <input
                id="company_name"
                name="company_name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={company_name}
                // onChange={(evt) => setCompanyName(evt.target.value)}
              />
            </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="address_1" className="block text-sm font-medium leading-6 text-gray-900">
              Street address Line 1
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address_1"
                id="address_1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={address_1}
                // onChange={(evt) => setAddressOne(evt.target.value)}
              />
            </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="address_2" className="block text-sm font-medium leading-6 text-gray-900">
              Street address Line 2
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address_2"
                id="address_2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={address_2}
                // onChange={(evt) => setAddressTwo(evt.target.value)}
              />
            </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={city}
                // onChange={(evt) => setCity(evt.target.value)}
              />
            </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
              State
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="state"
                name="state"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={state}
                // onChange={(evt) => setState(evt.target.value)}
              />
            </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="zip" className="block text-sm font-medium leading-6 text-gray-900">
              Postal code
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="zip"
                id="zip"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={zip}
                // onChange={(evt) => setZip(evt.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderUtilityInfo = () => (
    <>
      <div className='mt-5'></div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className=" text-base font-semibold leading-7 text-gray-900">Utility Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Provide utility information related to the project site. This includes details about the utility accounts, meter numbers, and average power usage which are essential for project energy assessments.
          </p>
        </div>

       
      </div>
    </>
  );


  const renderPropertyInfo = () => (
    <>
      <div className='mt-5'></div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Property Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Detail the physical aspects of the property where the project will be implemented. Information about roof type, age, and any potential shading will affect the installation and performance of the system.
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="col-span-6">
            <label htmlFor="shade_interference" className="block text-sm font-medium leading-6 text-gray-900">
              Is there any shade interference?
            </label>
            <div className="mt-2">
              <select
                id="shade_interference"
                name="shade_interference"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={shade_interference}
                // onChange={(evt) => setShadeInterference(evt.target.value)}
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="shade_interference_details" className="block text-sm font-medium leading-6 text-gray-900">
              Shade Description
            </label>
            <div className="mt-2">
              <textarea
                id="shade_interference_details"
                name="shade_interference_details"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={shade_interference_details}
                // onChange={(evt) => setShadeDescription(evt.target.value)}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );



  const renderButtons = () => (
    <div className="sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
      {currentStep > 0 && (
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1"
          onClick={() => {
            // scrollToTopWithOffset(50); // Adjust the offset value as needed
            setCurrentStep(currentStep - 1);
          }}
        >
          Previous
        </button>
       )} 
      {currentStep < 2 ? (
        <button
          type="button"
          // className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 mt-2"
         
          className={`mt-3 inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 sm:col-start-2 ${!selectedItem && currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!selectedItem && currentStep === 0}
          onClick={() => {
          //   scrollToTopWithOffset(50); // Adjust the offset value as needed
            setCurrentStep(currentStep + 1);
          }}
        >
          Next
        </button>
      ) : ( 
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 mt-2"
          // onClick={handleNewProject}
        >
          Submit
        </button>
      )}
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400 sm:col-span-2"
        onClick={handleCancel}
        ref={cancelButtonRef}
      >
        Cancel
      </button>
    </div>
  );
  

  /**
   * Renders the main modal component.
   * 
   * @returns {JSX.Element} The rendered modal component
   */
  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" initialFocus={cancelButtonRef} onClose={setIsModalOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
  
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-3xl sm:p-6" >
                <div 
                // ref={modalContentRef}
                >

                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      New Directory Contact Form
                    </Dialog.Title>
                  </div>
                  <div className="border-b border-gray-900/10 pb-4">
                    <form>
                      {currentStep === 0 && renderCompanySearch()}
                      {currentStep === 1 && renderCompanyInfo()}
                      {currentStep === 2 && renderUtilityInfo()}
                      {currentStep === 3 && renderPropertyInfo()}
                      {renderButtons()}
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}  