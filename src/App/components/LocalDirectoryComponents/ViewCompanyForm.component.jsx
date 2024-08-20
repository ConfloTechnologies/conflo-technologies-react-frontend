import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ViewCompanyForm({ isModalOpen, setIsModalOpen, companyData }) {
  const cancelButtonRef = useRef(null);

  // State for all company fields
  const [entityName, setEntityName] = useState('');
  const [dba, setDba] = useState('');
  const [professionalRelationship, setProfessionalRelationship] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [faxNumber, setFaxNumber] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState(''); 
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [laborUnion, setLaborUnion] = useState('');
  const [tradeCode, setTradeCode] = useState('');

  useEffect(() => {
    if (companyData) {
      setEntityName(companyData.entityName || '');
      setDba(companyData.dba || '');
      setProfessionalRelationship(companyData.professionalRelationship || '');
      setPhoneNumber(companyData.phoneNumber || '');
      setFaxNumber(companyData.faxNumber || '');
      setPhysicalAddress(companyData.physicalAddress || '');
      setCity(companyData.city || '');
      setState(companyData.state || '');
      setPostalCode(companyData.postalCode || '');
      setCountry(companyData.country || '');
      setEmail(companyData.email || '');
      setWebsite(companyData.website || '');
      setLicenseNumber(companyData.licenseNumber || '');
      setLaborUnion(companyData.laborUnion || '');
      setTradeCode(companyData.tradeCode || '');
    }
  }, [companyData]);

  const handleSubmit = async () => {
    const updatedCompanyData = {
      entityName,
      dba,
      professionalRelationship,
      phoneNumber,
      faxNumber,
      physicalAddress,
      city,
      state,
      postalCode,
      country,
      email,
      website,
      licenseNumber,
      laborUnion,
      tradeCode,
    };

    console.log('Updating company data:', updatedCompanyData);
    // Call your update service here

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderCompanyForm = () => (
    <div className="grid grid-cols-1 border-b pb-6 border-gray-900/10">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 pt-4 pb-4 border-t border-gray-900/10">
        Company Information
      </h2>

      <div className="grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="entityName" className="block text-sm font-medium text-gray-900">
              Entity Name
            </label>
            <input
              id="entityName"
              name="entityName"
              type="text"
              value={entityName}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setEntityName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="dba" className="block text-sm font-medium text-gray-900">
              DBA (if applicable)
            </label>
            <input
              id="dba"
              name="dba"
              type="text"
              value={dba}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setDba(e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-1">
          <label htmlFor="professionalRelationship" className="block text-sm font-medium text-gray-900">
            Professional Relationship
          </label>
          <select
            id="professionalRelationship"
            name="professionalRelationship"
            value={professionalRelationship}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            onChange={(e) => setProfessionalRelationship(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="internal">Internal Contact</option>
            <option value="external">External Contact</option>
            <option value="client">Client Contact</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
              Office Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="faxNumber" className="block text-sm font-medium text-gray-900">
              Fax Number
            </label>
            <input
              id="faxNumber"
              name="faxNumber"
              type="tel"
              value={faxNumber}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setFaxNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div>
            <label htmlFor="physicalAddress" className="block text-sm font-medium text-gray-900">
              Physical Address
            </label>
            <input
              id="physicalAddress"
              name="physicalAddress"
              type="text"
              value={physicalAddress} 
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setPhysicalAddress(e.target.value)}
            />
          </div>


          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-900">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={city}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-900">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              value={state}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-900">
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={postalCode}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-900">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={country}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-900">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={website}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-900">
              License Number
            </label>
            <input
              id="licenseNumber"
              name="licenseNumber"
              type="text"
              value={licenseNumber}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="laborUnion" className="block text-sm font-medium text-gray-900">
              Labor Union
            </label>
            <input
              id="laborUnion"
              name="laborUnion"
              type="text"
              value={laborUnion}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setLaborUnion(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="tradeCode" className="block text-sm font-medium text-gray-900">
              Trade Code
            </label>
            <select
              id="tradeCode"
              name="tradeCode"
              value={tradeCode}
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setTradeCode(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Plumbing-002">Plumbing - 002</option>
              <option value="Electrical-032">Electrical - 032</option>
              <option value="Roofing-011">Roofing - 011</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderButtons = () => (
    <div className="grid grid-flow-row-dense grid-cols-2 gap-3 mt-6">
      <button
        type="button"
        className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
        onClick={handleSubmit}
      >
        Save Changes
      </button>
      <button
        type="button"
        className="inline-flex justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-400"
        onClick={handleCancel}
        ref={cancelButtonRef}
      >
        Cancel
      </button>
    </div>
  );

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" 
        className="relative z-[100]" 
        initialFocus={cancelButtonRef}
        onClose={() => {
          setIsModalOpen(false);
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
                      Update Company Information
                    </Dialog.Title>
                  </div>
                  <div className="border-b border-gray-900/10 pb-4">
                    <form>
                      {renderCompanyForm()}
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
