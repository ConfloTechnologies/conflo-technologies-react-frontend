import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import serviceUtil from '../../Utils/serviceUtil';

export default function NewDirectoryContactForm({ isModalOpen, setIsModalOpen, companiesWithContacts, projectId }) {
  const cancelButtonRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showCompanyError, setShowCompanyError] = useState(false);
  const [showContactError, setShowContactError] = useState(false);
  const [entityName, setEntityName] = useState('');
  const [dba, setDba] = useState('');
  const [professionalRelationship, setProfessionalRelationship] = useState('');
  const [contactTitle, setContactTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [faxNumber, setFaxNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [laborUnion, setLaborUnion] = useState('');
  const [tradeCode, setTradeCode] = useState('');
  const [contactType, setContactType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');


  const submitContactUpdate = async (contact) => {
    console.log("Submitting contact update:", contact);
  };
  

  const createNewCompany = async (companyData) => {
    console.log("Creating new company:", companyData);
  };
  

  const createNewContact = async (companyId, contactData) => {
    console.log(`Creating new contact under company ID ${companyId}:`, contactData);
  };


  const handleSubmit = async () => {
    if (currentStep === 1 && selectedContact) {
      
      const contactUpdate = {
        contactId: 1,
                  // selectedContact.id,
        projectId
      };
      const contactUpdateResponse = await submitContactUpdate(contactUpdate);
      resetForm();
      setIsModalOpen(false); 

    } else if (currentStep === 3) {
      // Creating new company and new contact
      const newCompanyData = {
        entityName,
        dba,
        professionalRelationship,
        phoneNumber,
        faxNumber,
        address1,
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
  
      const createNewCompanyResponse = await createNewCompany(newCompanyData);
      
      // if (createNewCompanyResponse.companyId) {
          const newContactData = {
            firstName,
            lastName,
            contactType,
            contactTitle,
            phoneNumber: contactPhoneNumber,
            email: contactEmail,
            projectId,
          };

        const contactResponse = await createNewContact(
          1,
          newContactData
        );
        resetForm();
        setIsModalOpen(false); 
      // }

    }
  };


  const resetForm = () => {
    setCurrentStep(0);
    setSearchTerm('');
    setSelectedCompany('');
    setSelectedContact('');
    setIsFocused(false);
    setShowCompanyError(false);
    setShowContactError(false);
    setEntityName('');
    setDba('');
    setProfessionalRelationship('');
    setContactTitle('');
    setPhoneNumber('');
    setFaxNumber('');
    setAddress1('');
    setCity('');
    setState('');
    setPostalCode('');
    setCountry('');
    setEmail('');
    setWebsite('');
    setLicenseNumber('');
    setLaborUnion('');
    setTradeCode('');
    setContactType('');
    setFirstName('');
    setLastName('');
    setContactPhoneNumber('');
    setContactEmail('');
  };
  

  const handleRemoveCompany = () => {
    setSelectedCompany('');
    setShowCompanyError(false);
  };


  const handleCreateNewCompanyClick = () => {
    if (selectedCompany) {
      setShowCompanyError(true);
    } else {
      setCurrentStep(2);
    }
  };


  const handleRemoveContact = () => {
    setSelectedContact('');
    setShowContactError(false);
  };


  const handleCreateNewContactClick = () => {
    if (selectedContact) {
      setShowContactError(true);
    } else {
      setCurrentStep(3);
    }
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleFocus = () => {
    setIsFocused(true);
  };


  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 150);
  };


  const filteredCompanies = Object.keys(companiesWithContacts).filter(company =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const contacts = selectedCompany ? companiesWithContacts[selectedCompany].contacts : [];


  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };



  const renderCompanySearch = () => {
    const buttonMarginTop = (isFocused || searchTerm) ? `${Math.min(filteredCompanies.length * 40, 200) + 10}px` : '20px';
  
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b pb-6 border-gray-900/10" style={{ minHeight: '', minWidth: '300px' }}>
        <div className="mb-12">
          <div className="py-5">
            <label htmlFor="searchCompanies" className="block text-sm font-medium leading-6 text-gray-900">
              Select a pre-existing company:
            </label>
            <div className="mt-2 relative">
              <input
                id="searchCompanies"
                type="text"
                placeholder={selectedCompany || "Search companies..."}
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {(isFocused || searchTerm) && (
                <ul className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto">
                  {filteredCompanies.map((company, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedCompany(company);
                        setShowCompanyError(false); // Clear error when a new company is selected
                      }}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {company}
                    </li>
                  ))}
                  {filteredCompanies.length === 0 && (
                    <li className="px-3 py-2 text-gray-500">No results found</li>
                  )}
                </ul>
              )}
              {selectedCompany && (
                <div className="pl-2 mt-4 flex items-center">
                  Selected Company: <strong>{' '}{selectedCompany}</strong>
                  <button
                    type="button"
                    className="ml-2 text-red-600 hover:text-red-800"
                    onClick={handleRemoveCompany}
                  >
                    ✕
                  </button>
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
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                  selectedCompany ? 'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                onClick={handleCreateNewCompanyClick}
              >
                Create New Company
              </button>
              {showCompanyError && (
                <p className="mt-4 text-sm text-red-600 text-center">
                  To create a new company you must remove the current company selection
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContactSearch = () => {
    const buttonMarginTop = (isFocused || searchTerm) ? `${Math.min(contacts.length * 40, 200) + 10}px` : '20px';
  
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b pb-6 border-gray-900/10" style={{ minHeight: '', minWidth: '300px' }}>
        <div className="mb-12">
          <div className="py-5">
            <label htmlFor="searchContacts" className="block text-sm font-medium leading-6 text-gray-900">
              Select a pre-existing contact:
            </label>
            <div className="mt-2 relative">
              {selectedCompany ? (
                <> 
                  <input
                    id="searchContacts"
                    type="text"
                    placeholder={selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : "Search contacts..."}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {(isFocused || searchTerm) && (
                    <ul className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto">
                      {contacts
                        .filter(contact =>
                          `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((contact, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setSelectedContact(contact);
                              setShowContactError(false); // Clear error when a new contact is selected
                            }}
                            className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {contact.firstName} {contact.lastName} - {contact.title}
                          </li>
                        ))}
                      {contacts.length === 0 && (
                        <li className="px-3 py-2 text-gray-500">No contacts found</li>
                      )}
                    </ul>
                  )}
                  {selectedContact && (
                    <div className="pl-2 mt-4 flex items-center">
                      Selected Contact: <strong>{' '}{selectedContact.firstName} {selectedContact.lastName}</strong>
                      <button
                        type="button"
                        className="ml-2 text-red-600 hover:text-red-800"
                        onClick={handleRemoveContact}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500">Please select a company first</p>
              )}
            </div>
          </div>
  
          <div className="mt-5" style={{ marginTop: buttonMarginTop }}>
            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">
              Create a new contact:
            </label>
            <div className="mt-3">
              <button
                type="button"
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                  selectedContact ? 'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-white' : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                onClick={handleCreateNewContactClick}
              >
                Create New Contact
              </button>
              {showContactError && (
                <p className="mt-4 text-sm text-red-600 text-center">
                  To create a new contact you must remove the current contact selection
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNewCompanyForm = () => (
    <div className="grid grid-cols-1 border-b pb-6 border-gray-900/10" style={{ minHeight: '500px' }}>
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
              placeholder="Enter entity name"
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
              placeholder="Enter DBA"
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
              placeholder="e.g., (123) 456-7890"
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
              placeholder="e.g., (123) 456-7890"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setFaxNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="address1" className="block text-sm font-medium text-gray-900">
              Physical Address
            </label>
            <input
              id="address1"
              name="address1"
              type="text"
              placeholder="123 Example St"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setAddress1(e.target.value)}
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
              placeholder="License Number"
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
              placeholder="Labor Union"
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
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setTradeCode(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="internal">Plumbing - 002</option>
              <option value="external">Electrical - 032</option>
              <option value="client">Roofing - 011</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewContactForm = () => (
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
              placeholder="Enter first name"
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
              placeholder="Enter last name"
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
            placeholder="e.g., (123) 456-7890"
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
            placeholder="email@example.com"
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
            placeholder="Project Manager"
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
        {currentStep > 0 ? (
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1"
            onClick={() => {
              if (currentStep === 1) {
                setCurrentStep(0);
              } else if (currentStep === 2) {
                setCurrentStep(0);
              } else if (entityName && currentStep === 3) {
                setCurrentStep(2);
              } else if (currentStep === 3) {
                setCurrentStep(1);
              }
            }}
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
  
        {currentStep === 0 && (
          <button
            type="button"
            className={`mt-3 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm sm:col-start-2 ${
              selectedCompany ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 opacity-50 cursor-not-allowed'
            }`}
            disabled={!selectedCompany}
            onClick={() => {
              setCurrentStep(1);
            }}
          >
            Next
          </button>
        )}
  
        {currentStep === 2 && (
          <button
            type="button"
            className="mt-3 inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 sm:col-start-2"
            onClick={() => setCurrentStep(3)}
          >
            Next
          </button>
        )}
  
        {currentStep === 1 && (
          <button
            type="button"
            className={`mt-3 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm sm:col-start-2 ${
              selectedContact ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 opacity-50 cursor-not-allowed'
            }`}
            disabled={!selectedContact}
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
  
        {currentStep === 3 && (
          <button
            type="button"
            className="mt-3 inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 sm:col-start-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>

      <div className="sm:grid grid-cols-2">
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400 sm:col-span-2"
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
                      New Directory Contact Form
                    </Dialog.Title>
                  </div>
                  <div className="border-b border-gray-900/10 pb-4">
                    <form>
                      {currentStep === 0 && renderCompanySearch()}
                      {currentStep === 1 && renderContactSearch()}
                      {currentStep === 2 && renderNewCompanyForm()}
                      {currentStep === 3 && renderNewContactForm()}
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
