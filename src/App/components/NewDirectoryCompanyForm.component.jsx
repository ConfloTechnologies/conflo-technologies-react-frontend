import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition, Combobox } from '@headlessui/react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash.debounce';

export default function NewDirectoryCompanyForm({ isModalOpen, setIsModalOpen, companies = [] }) {
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
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b pb-6 border-gray-900/10" style={{ minHeight: '500px', minWidth: '300'}}>
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
                                onClick={() => { 
                                    setCurrentStep(1)
                                    }}
                                    // ref={cancelButtonRef}
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


  
  

const renderNewCompanyForm = () => (
  <>
    <div className="grid grid-cols-1 border-b pb-6 border-gray-900/10" style={{ minHeight: '500px' }}>
      
      <div className=''>
        <h2 className="text-base pt-4 border-t border-gray-900/10 font-semibold leading-7 text-gray-900">
          Company Information:
        </h2>
      </div>

        <div className="grid grid-cols-1 gap-y-4">

          <div className="col-span-6 mt-2">
            <label htmlFor="company_name" className="block text-sm font-medium leading-6 text-gray-900">
              Legal Entity (company name)
            </label>
            <div className="mt-1">
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


        {/* Business Type Dropdown */}
        <div className="col-span-6">
          <label htmlFor="business_type" className="block text-sm font-medium leading-6 text-gray-900">
            Business Type
          </label>
          <select
            id="business_type"
            name="business_type"
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            // value={businessType}
            // onChange={(evt) => setBusinessType(evt.target.value)}
          >
            <option>Select...</option>
            <option>General Contractor</option>
            <option>Subcontractor</option>
            <option>Consultant</option>
          </select>
        </div>

        {/* Specialization Field */}
        <div className="col-span-6">
          <label htmlFor="business_type" className="block text-sm font-medium leading-6 text-gray-900">
            Specialization 
          </label>
          <select
            id="business_type"
            name="business_type"
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            // value={businessType}
            // onChange={(evt) => setBusinessType(evt.target.value)}
          >
            <option>Select...</option>
            <option>Underground</option>
            <option>Electrical</option>
            <option>Framing</option>
            <option>Roofing</option>
          </select>
        </div>

        <div className="col-span-6">
          <label htmlFor="service_regions" className="block text-sm font-medium text-gray-900">
            Service Regions (select ALL that apply)
          </label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'].map(state => (
              <div key={state}>
                <input
                  type="checkbox"
                  id={`checkbox-${state}`}
                  name="service_regions"
                  value={state}
                  className="hidden peer"
                  // checked={serviceRegions.includes(state)}
                  // onChange={handleRegionChange}
                />
                <label
                  htmlFor={`checkbox-${state}`}
                  className="block cursor-pointer text-center text-gray-600 bg-white border border-gray-300 rounded-md py-1.5 px-2 hover:bg-gray-50 peer-checked:bg-blue-600 peer-checked:text-white"
                >
                  {state}
                </label>
              </div>
            ))}
          </div>
        </div>


          <div className="col-span-6">
            <label htmlFor="address_1" className="block text-sm font-medium leading-6 text-gray-900">
              Physical address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address_1"
                id="address_1"
                placeholder='123 example st ....'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={address_1}
                // onChange={(evt) => setAddressOne(evt.target.value)}
              />
            </div>
          </div>

          {/* Website URL */}
          <div className="col-span-6">
            <label htmlFor="website_url" className="block text-sm font-medium leading-6 text-gray-900">
              Website URL
            </label>
            <input
              type="url"
              id="website_url"
              name="website_url"
              placeholder='www.example.com'
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              // value={websiteURL}
              // onChange={(evt) => setWebsiteURL(evt.target.value)}
            />
          </div>



            <SingleImageUpload />
      <MultipleFileUpload id="license_files" label="License Information" accept=".pdf,.doc,.docx" />
      <MultipleFileUpload id="insurance_files" label="Insurance Information" accept=".pdf,.doc,.docx" />

      </div>
    </div>
  </>
);


  const renderNewContactForm = () => (
   <>
    <div className="grid grid-cols-1 border-b pb-6 border-gray-900/10" style={{ minHeight: '500px' }}>
        
        <div className='mb-2'>
            <h2 className="text-base pt-4 border-t border-gray-900/10 font-semibold leading-7 text-gray-900">
              Contact Information:
            </h2>
          </div>

        <div className="grid grid-cols-1 gap-y-4">
          
          <div className="col-span-6">
            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-1">
              <input
                id="first_name"
                name="first_name"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={first_name}
                // onChange={(evt) => setCompanyName(evt.target.value)}
              />
            </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={last_name}
                // onChange={(evt) => setAddressOne(evt.target.value)}
              />
            </div>
          </div>



          <div className="col-span-6">
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={phoneNumber}
                // onChange={(evt) => setCity(evt.target.value)}
              />
            </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="email"
                name="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // value={email}
                // onChange={(evt) => setState(evt.target.value)}
              />
            </div>
          </div>


                  {/* Specialization Field */}
        <div className="col-span-6">
          <label htmlFor="business_type" className="block text-sm font-medium leading-6 text-gray-900">
            Role
          </label>
          <select
            id="business_type"
            name="business_type"
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            // value={businessType}
            // onChange={(evt) => setBusinessType(evt.target.value)}
          >
              <option value="Carpenter - 001">Select...</option>
              <option value="Electrician - 002">Internal</option>
              <option value="Plumber - 003">External</option>
          </select>
        </div>



        {/* Specialization Field */}
        <div className="col-span-6">
          <label htmlFor="business_type" className="block text-sm font-medium leading-6 text-gray-900">
            Trade & Code
          </label>
          <select
            id="business_type"
            name="business_type"
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            // value={businessType}
            // onChange={(evt) => setBusinessType(evt.target.value)}
          >
             <option value="Carpenter - 001">Carpenter - 001</option>
                <option value="Electrician - 002">Electrician - 002</option>
                <option value="Plumber - 003">Plumber - 003</option>
          </select>
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
            currentStep === 2
              ? setCurrentStep(0) 
              : setCurrentStep( currentStep - 1);
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
          currentStep === 0
            ? setCurrentStep(currentStep + 2) 
            : setCurrentStep(currentStep + 1);
          }}
        >
          Next
        </button>
      ) : ( 
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:col-start-2 mt-2"
          onClick={handleCancel}
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
                      {currentStep === 1 && renderNewCompanyForm()}
                      {currentStep === 2 && renderNewContactForm()}
                      <div className=''>
                      {renderButtons()}
                      </div>
     
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



function MultipleFileUpload({ id, label, accept }) {
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileNames(files.map(file => ({ name: file.name, id: Math.random() })));  // Add unique ID for key purposes
  };

  const handleRemoveFile = (idToRemove, e) => {
    e.stopPropagation(); // Prevent the file input from opening
    setFileNames(fileNames.filter(file => file.id !== idToRemove));
  };

  const handleClearAll = (e) => {
    e.stopPropagation(); // Prevent the file input from opening
    setFileNames([]);
    document.getElementById(id).value = ''; // Reset the input
  };

  return (
    <div className="col-span-6">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label} (Upload Documents)
      </label>
      <div 
        className="flex flex-col items-center w-full px-2 pt-5 pb-6 mt-1 border-2 border-blue-200 border-dashed rounded-md cursor-pointer hover:border-gray-400 bg-blue-50"
        onClick={() => document.getElementById(id).click()}
      >
        <input
          type="file"
          id={id}
          name={id}
          accept={accept}
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        {fileNames.length > 0 ? (
          <div className="w-full ">
            {/* <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">Uploaded Files:</p>
              <button onClick={handleClearAll} className="ml-2 bg-red-500 text-white rounded-full px-1 text-xs">Clear All</button>
            </div> */}
            <ul className="list-disc px-2 text-gray-500">
              {fileNames.map(file => (
                <li key={file.id} className="flex justify-between items-center">
                  {file.name}
                  <button 
                    onClick={(e) => handleRemoveFile(file.id, e)} 
                    className="ml-3 bg-red-500 text-white rounded-full px-1 text-xs">  
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">Drag 'n' drop files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}

function SingleImageUpload() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent the file input from opening
    setImagePreviewUrl('');
    document.getElementById('imageInput').value = '';  // Reset the input
  };

  return (
    <div className="col-span-6">
      <label htmlFor="company_logo" className="block text-sm font-medium text-gray-900">
        Company Logo
      </label>
      <div 
        className="flex justify-center items-center w-full px-6 pt-5 pb-6 mt-1 border-2 border-blue-200 border-dashed rounded-md cursor-pointer hover:border-gray-400 bg-blue-50"
        onClick={() => !imagePreviewUrl && document.getElementById('imageInput').click()}
      >
        <input
          type="file"
          id="imageInput"
          name="company_logo"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        {imagePreviewUrl ? (
          <div className="relative w-full flex justify-between items-center">
            <img src={imagePreviewUrl} alt="Logo Preview" className="max-w-xs max-h-20 rounded shadow-md" />
            <button onClick={handleRemoveImage} className="bg-red-500 text-white rounded-full px-1 text-xs">X</button>
          </div>
        ) : (
          <p className="text-center text-gray-700">Drag 'n' drop an image here, or click to select an image</p>
        )}
      </div>
    </div>
  );
}