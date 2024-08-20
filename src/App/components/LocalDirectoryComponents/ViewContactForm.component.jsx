import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ViewContactForm({ isModalOpen, setIsModalOpen, contactData }) {
  const cancelButtonRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  // State for all contact fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactTitle, setContactTitle] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactType, setContactType] = useState('');
  const [company, setCompany] = useState('');
  const [tradeCode, setTradeCode] = useState('');

  useEffect(() => {
    if (contactData) {
      setFirstName(contactData.firstName);
      setLastName(contactData.lastName);
      setContactTitle(contactData.title);
      setContactPhoneNumber(contactData.phone);
      setContactEmail(contactData.email);
      setContactType(contactData.contactType);
      setCompany(contactData.company);
      setTradeCode(contactData.tradeCode);
    }
  }, [contactData]);

  const handleUpdateContact = async () => {
    const updatedContactData = {
      firstName,
      lastName,
      contactTitle,
      contactPhoneNumber,
      contactEmail,
      contactType,
      company,
      tradeCode,
    };

    console.log('Updating contact:', updatedContactData);
    // Add your API call to update the contact here

    setIsModalOpen(false); // Close the modal after updating
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setContactTitle('');
    setContactPhoneNumber('');
    setContactEmail('');
    setContactType('');
    setCompany('');
    setTradeCode('');
    setCurrentStep(0);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const renderContactForm = () => (
    <div className="grid grid-cols-1 border-b pb-6 border-gray-900/10">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 pt-4 pb-4 border-t border-gray-900/10">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 gap-y-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-1">
          <label htmlFor="contactPhoneNumber" className="block text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input
            id="contactPhoneNumber"
            name="contactPhoneNumber"
            type="tel"
            value={contactPhoneNumber}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            onChange={(e) => setContactPhoneNumber(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={contactEmail}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="contactType" className="block text-sm font-medium text-gray-900">
            Contact Type
          </label>
          <select
            id="contactType"
            name="contactType"
            value={contactType}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            onChange={(e) => setContactType(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="internal">Internal Contact</option>
            <option value="external">External Contact</option>
            <option value="client">Client Contact</option>
          </select>
        </div>

        <div className="col-span-1">
          <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            id="contactTitle"
            name="contactTitle"
            type="text"
            value={contactTitle}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            onChange={(e) => setContactTitle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderButtons = () => (
    <>
      <div className="grid grid-flow-row-dense grid-cols-2 gap-3">
        <button
          type="button"
          className="mt-3 inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
          onClick={handleUpdateContact}
        >
          Update
        </button>

        <button
          type="button"
          className="mt-3 inline-flex justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400"
          onClick={handleCancel}
          ref={cancelButtonRef}
        >
          Cancel
        </button>
      </div>
    </>
  );

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" 
        className="relative z-[100]" 
        initialFocus={cancelButtonRef}
        onClose={() => {
          setIsModalOpen(false); 
          resetForm();  
        }}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full  md:max-w-3xl sm:mx-4 sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Update Contact Information
                    </Dialog.Title>
                  </div>
                  <div className="border-b border-gray-900/10 pb-4">
                    <form>
                      {renderContactForm()}
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
