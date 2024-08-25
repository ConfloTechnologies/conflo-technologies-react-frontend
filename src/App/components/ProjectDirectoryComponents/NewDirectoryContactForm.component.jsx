import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import serviceUtil from '../../Utils/serviceUtil';

export default function NewDirectoryContactForm({ isModalOpen, setIsModalOpen, companiesWithContacts, projectId, constructionDivisions }) {
  const cancelButtonRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [duplicateCompanyError, setDuplicateCompanyError] = useState(false);
  const [showCompanyError, setShowCompanyError] = useState(false);
  const [showContactError, setShowContactError] = useState(false);
  const [duplicateEmailError, setDuplicateEmailError] = useState(false);
  const [duplicateNameError, setDuplicateNameError] = useState(false);
  const [duplicatePhoneNumberError, setDuplicatePhoneNumberError] = useState(false);

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
  const [bidStatus, setbidStatus] = useState('');
  const [laborUnion, setLaborUnion] = useState('');
  const [constructionDivision, setConstructionDivision] = useState('');
  const [contactType, setContactType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [licenses, setLicenses] = useState([{ licenseNumber: '', state: '' }]);




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
    const updatedLicenses = licenses.filter((_, i) => i !== index);
    setLicenses(updatedLicenses);
  };

  const submitContactUpdate = async (contact) => {
    console.log("Submitting contact update:", contact);
  };
  

  const createNewCompany = async (companyData) => {
    console.log("Creating new company:", companyData);
  };
  

  const createNewContact = async (companyId, contactData) => {
    console.log(`Creating new contact under company ID ${companyId}:`, contactData);
  };

  const checkForDuplicateCompany = (name) => {
    const lowerCaseName = name.toLowerCase();
    const isDuplicate = Object.keys(companiesWithContacts).some(
      (company) => 
        companiesWithContacts[company].entityName.toLowerCase() === lowerCaseName );
    setDuplicateCompanyError(isDuplicate);
  };
  
  

  const checkForDuplicateContact = (firstName, lastName, email, phoneNumber) => {
    const lowerCaseEmail = email.toLowerCase();
    const lowerCaseName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
    
    let duplicateEmail = false;
    let duplicateName = false;
    let duplicatePhoneNumber = false;
    let duplicateCompanyName = '';
  
    // Iterate over all companies and their contacts
    for (const company in companiesWithContacts) {
      const contacts = companiesWithContacts[company].contacts;
  
      if (contacts.some(contact => contact.email.toLowerCase() === lowerCaseEmail)) {
        duplicateEmail = true;
        duplicateCompanyName = company;
      }
  
      if (contacts.some(contact => `${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()}` === lowerCaseName)) {
        duplicateName = true;
        duplicateCompanyName = company;
      }
  
      if (contacts.some(contact => contact.phone === phoneNumber)) {
        duplicatePhoneNumber = true;
        duplicateCompanyName = company;
      }
  
      // If all duplicates are found, no need to continue checking
      if (duplicateEmail && duplicateName && duplicatePhoneNumber) {
        break;
      }
    }
    
    setDuplicateEmailError(duplicateEmail ? duplicateCompanyName : '');
    setDuplicateNameError(duplicateName ? duplicateCompanyName : '');
    setDuplicatePhoneNumberError(duplicatePhoneNumber ? duplicateCompanyName : '');
  };
  
  
  
  
  

  const handleSubmit = async () => {
    if (currentStep === 1 && selectedContact) {
      const contactUpdate = {
        contactId: 1, // Use selectedContact.id,
        projectId,
        licenses, // Include licenses
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
        licenses, // Include licenses
        laborUnion,
        constructionDivision,
        bidStatus,
      };
  
      const createNewCompanyResponse = await createNewCompany(newCompanyData);
  
      const newContactData = {
        firstName,
        lastName,
        contactType,
        contactTitle,
        phoneNumber: contactPhoneNumber,
        email: contactEmail,
        projectId,
        licenses, // Include licenses
      };
  
      const contactResponse = await createNewContact(1, newContactData);
      resetForm();
      setIsModalOpen(false);
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
    setDuplicateEmailError(false); 
    setDuplicateNameError(false);
    setDuplicatePhoneNumberError('');
    setEntityName('');
    setDba('');
    setProfessionalRelationship('');
    setbidStatus('');
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
    setLaborUnion('');
    setConstructionDivision('');
    setContactType('');
    setFirstName('');
    setLastName('');
    setContactPhoneNumber('');
    setContactEmail('');
    setLicenses([{ licenseNumber: '', state: '' }]); // Reset licenses
  };
  
  

  const handleRemoveCompany = () => {
    setSelectedCompany('');
    setShowCompanyError(false);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    checkForDuplicateContact(e.target.value, lastName, contactEmail);
  };
  
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    checkForDuplicateContact(firstName, e.target.value, contactEmail);
  };
  
  const handleEmailChange = (e) => {
    setContactEmail(e.target.value);
    checkForDuplicateContact(firstName, lastName, e.target.value);
  };

  const handleEntityNameChange = (e) => {
    const name = e.target.value;
    setEntityName(name);
    checkForDuplicateCompany(name);
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
                onChange={handleEntityNameChange}
                value={entityName}
              />
              {duplicateCompanyError && (
                <p className="mt-2 text-sm text-red-600">
                  A company with this Entity Name already exists.
                </p>
              )}
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
                onChange={(e) => setProfessionalRelationship(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="external">Subcontractor</option>
                <option value="client">Client</option>
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
              Bid status
            </label>
            <select
              id="bidStatus"
              name="bidStatus"
              className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              onChange={(e) => setbidStatus(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="internal">Pending</option>
              <option value="internal">Bidding</option>
              <option value="external">Awarded</option>
              <option value="client">Not Awarded</option>
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

  const renderNewContactForm = () => (
    <div className="grid grid-cols-1 border-b pb-6 border-gray-900/10">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 pt-4 pb-4 border-t mt-6 border-gray-900/10">
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
                onChange={handleFirstNameChange}
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
                onChange={handleLastNameChange}
              />
            </div>
          </div>

          {duplicateNameError && (
            <p className="text-sm text-red-600">
              A contact with this name already exists in {duplicateNameError}.
            </p>
          )}

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
            {duplicatePhoneNumberError && (
              <p className="mt-2 text-sm text-red-600">
                A contact with this phone number already exists in {duplicatePhoneNumberError}.
              </p>
            )}
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
              onChange={handleEmailChange}
            />
            {duplicateEmailError && (
              <p className="mt-2 text-sm text-red-600">
                A contact with this email already exists in {duplicateEmailError}.
              </p>
            )}
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
              <option value="external">Subcontracor Contact</option>
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
                if (selectedCompany && !selectedContact) {
                  setCurrentStep(1); // Go back to the new company form
                } else {
                  setCurrentStep(2); // Otherwise, go back to the find contact form
                }
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
            className={`mt-3 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm sm:col-start-2 ${
              duplicateCompanyError ? 'bg-blue-600 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={duplicateCompanyError}
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
            className={`mt-3 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm sm:col-start-2 ${
              !duplicateEmailError && !duplicateNameError ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 opacity-50 cursor-not-allowed'
            }`}           
             disabled={duplicateEmailError || duplicateNameError}
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
                  <div className="mt-2 text-center sm:mt-2">
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
