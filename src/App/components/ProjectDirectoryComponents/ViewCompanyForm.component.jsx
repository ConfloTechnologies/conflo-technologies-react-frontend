import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ViewCompanyForm({ isModalOpen, setIsModalOpen, companyData, constructionDivisions}) {
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
  const [laborUnion, setLaborUnion] = useState('');
  const [constructionDivision, setConstructionDivision] = useState('');
  const [bidStatus, setBidStatus] = useState('');
  const [licenses, setLicenses] = useState([{ licenseNumber: '', state: '' }]);





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
      setLaborUnion(companyData.laborUnion || '');
      setConstructionDivision(companyData.constructionDivision || '');
      setBidStatus(companyData.bidStatus || '');
      setLicenses(companyData.licenses || [{ licenseNumber: '', state: '' }]);
    }
  }, [companyData]);

  const handleLicenseChange = (index, field, value) => {
    const updatedLicenses = licenses.map((license, i) =>
      i === index ? { ...license, [field]: value } : license
    );
    setLicenses(updatedLicenses);
  };

  const addLicense = () => {
    setLicenses([...licenses, { licenseNumber: '', state: '' }]);
  };

  const removeLicense = (index) => {
    setLicenses(licenses.filter((_, i) => i !== index));
  };

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
      laborUnion,
      constructionDivision,
      bidStatus,
      licenses,
    };

    console.log('Updating company data:', updatedCompanyData);
    // Call your update service here

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderCompanyForm = () => (
    <div className="grid grid-cols-1 border-b pb-6 border-gray-900/10" style={{ minHeight: '500px' }}>
      <h2 className="text-lg font-semibold leading-7 text-gray-900 pt-4 pb-4 border-t mt-6 border-gray-900/10">
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
              placeholder="Enter entity name"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={entityName}
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
              placeholder="Enter DBA"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={dba}
              onChange={(e) => setDba(e.target.value)}
            />
          </div>
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
              placeholder="e.g., (123) 456-7890"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={phoneNumber}
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
              placeholder="e.g., (123) 456-7890"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={faxNumber}
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
              placeholder="123 Example St"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={physicalAddress}
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
              placeholder="City"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={city}
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
              placeholder="State"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={state}
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
              placeholder="Postal Code"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={postalCode}
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
              placeholder="Country"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={country}
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
              placeholder="email@example.com"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={email}
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
              placeholder="www.example.com"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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
              placeholder="Labor Union"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={laborUnion}
              onChange={(e) => setLaborUnion(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="professionalRelationship" className="block text-sm font-medium text-gray-900">
              Professional Relationship
            </label>
            <select
              id="professionalRelationship"
              name="professionalRelationship"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={professionalRelationship}
              onChange={(e) => setProfessionalRelationship(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="internal">Internal Contact</option>
              <option value="external">External Contact</option>
              <option value="client">Client Contact</option>
            </select>
          </div>

          <div>
            <label htmlFor="constructionDivision" className="block text-sm font-medium text-gray-900">
              Division
            </label>
            <select
              id="constructionDivision"
              name="constructionDivision"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setConstructionDivision(e.target.value)}
            >
              <option value="">Select...</option>
              {constructionDivisions.map((division, index) => (
                <option key={index} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bidStatus" className="block text-sm font-medium text-gray-900">
              Bid Status
            </label>
            <select
              id="bidStatus"
              name="bidStatus"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={bidStatus}
              onChange={(e) => setBidStatus(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Pending">Pending</option>
              <option value="Bidding">Bidding</option>
              <option value="Awarded">Awarded</option>
              <option value="Not Awarded">Not Awarded</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 border rounded-md p-4">
          <label htmlFor="">License Information</label>
          {licenses.map((license, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4 border rounded-md p-4">
              <div className="sm:col-span-2">
                <label htmlFor={`licenseNumber-${index}`} className="block text-sm font-medium text-gray-900">
                  License Number
                </label>
                <input
                  id={`licenseNumber-${index}`}
                  name={`licenseNumber-${index}`}
                  type="text"
                  placeholder="License Number"
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  value={license.licenseNumber}
                  onChange={(e) => handleLicenseChange(index, 'licenseNumber', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`state-${index}`} className="block text-sm font-medium text-gray-900">
                  State
                </label>
                <input
                  id={`state-${index}`}
                  name={`state-${index}`}
                  type="text"
                  placeholder="State"
                  className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  value={license.state}
                  onChange={(e) => handleLicenseChange(index, 'state', e.target.value)}
                />
              </div>

              <div className="flex justify-center items-center mt-6">
                <button
                  type="button"
                  onClick={() => removeLicense(index)}
                  className="text-sm text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={addLicense}
              className="text-sm text-indigo-600 hover:text-indigo-900"
            >
              Add Another License
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderButtons = () => (
    <>
      <div className="grid grid-flow-row-dense grid-cols-2 gap-3">

        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white border px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-700 hover:text-white sm:col-start-1"
          onClick={() => {
            // Add your remove logic here
            // For example, to remove a company or delete related data
            // Make sure to add the relevant logic for your use case.
          }}
        >
          Remove
        </button>
        <button
          type="button"
          className="mt-3 inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
  
      <div className="sm:grid grid-cols-2">
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-400 sm:col-span-2"
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
