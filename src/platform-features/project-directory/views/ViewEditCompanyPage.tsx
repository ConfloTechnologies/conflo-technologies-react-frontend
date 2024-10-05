import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../../common/components/PageHeader.component';
import {useDynamicContentHeight} from "../../../common/utils/useDynamicContentHeightSettingOne";
import {License} from "../../../types/directory";
const fetchCompany = async (projectId: string, companyId: string): Promise<any> => {
  // Simulated API call for fetching company details
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        entityName: 'ACME Corporation',
        dba: 'ACME',
        phoneNumber: '555-987-6543',
        faxNumber: '555-123-4567',
        physicalAddress: '123 Example St',
        city: 'Example City',
        state: 'CA',
        postalCode: '90001',
        country: 'USA',
        email: 'acme@example.com',
        website: 'www.acme.com',
        laborUnion: 'None',
        constructionDivision: 'General Contracting',
        bidStatus: 'Pending',
        professionalRelationship: 'Client',
        licenses: [{ licenseNumber: 'ABC123', state: 'CA' }],
        contacts: [{ firstName: 'John', lastName: 'Doe' }]
      });
    }, 1000);
  });
};

const ViewEditCompanyPage = () => {
  const { projectId, companyId } = useParams<{ projectId: string, companyId: string }>();
  const [formData, setFormData] = useState<any>({
    entityName: '',
    dba: '',
    phoneNumber: '',
    faxNumber: '',
    physicalAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    email: '',
    website: '',
    laborUnion: '',
    constructionDivision: '',
    bidStatus: '',
    professionalRelationship: '',
    licenses: [{ licenseNumber: '', state: '' }],
    contacts: [{ firstName: '', lastName: '' }]
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const [mainContentHeight, setMainContentHeight] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);

  useDynamicContentHeight(headerRef, setMainContentHeight);


  useEffect(() => {
    const getCompanyData = async () => {
      if (projectId && companyId) {
        const companyData = await fetchCompany(projectId, companyId);
        setFormData(companyData);
      }
    };
    getCompanyData();
  }, [projectId, companyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number, field?: string): void => {
    if (field !== undefined && index !== undefined) {
      const updatedField = formData[field].map((item: any, idx: number) =>
          idx === index ? { ...item, [e.target.name]: e.target.value } : item
      );
      setFormData({ ...formData, [field]: updatedField });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
    setIsModified(true);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    setIsEditing(false);
    setIsModified(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setIsModified(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsModified(false);
  };

  const handleLicenseChange = (index: number, field: keyof License, value: string) => {
    const updatedLicenses = formData.licenses.map((license: License, i: number) => {
      if (i === index) {
        return { ...license, [field]: value };
      }
      return license;
    });
    setFormData({ ...formData, licenses: updatedLicenses });
    setIsModified(true);
  };


  const addLicense = () => {
    const newLicense = { licenseNumber: '', state: '' };
    setFormData({
      ...formData,
      licenses: [...formData.licenses, newLicense],
    });
    setIsModified(true);
  };

  const removeLicense = (index: number) => {
    const filteredLicenses = formData.licenses.filter((_: License, i: number) => i !== index);
    setFormData({ ...formData, licenses: filteredLicenses });
    setIsModified(true);
  };



  return (
      <>
          <div ref={headerRef} className="p-4 overflow-hidden">
            <PageHeader
                pageTitle="Project Directory"
                pageDescription="A directory of all contacts associated with the project."
                trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                trainingTitle="Project Directory Training"
            />
            <div className="font-bold py-2 text-sm border-b bg-white flex items-center justify-between h-14">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">Company Information</h2>
                {!isEditing && (
                    <button
                        type="button"
                        onClick={toggleEditMode}
                        className="inline-flex border border-gray-300 bg-gray-200 hover:bg-yellow-300 hover:border-amber-50 text-gray-900 rounded-md px-4 py-2"
                    >
                      Edit
                    </button>
                )}
            </div>
          </div>


          <div className="overflow-auto" style={{height: mainContentHeight}}>
            <div className="sticky top-0 z-30 bg-white p-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="entityName" className="block text-sm font-medium text-gray-900">Entity Name</label>
                  <input
                      id="entityName"
                      name="entityName"
                      type="text"
                      value={formData.entityName}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="dba" className="block text-sm font-medium text-gray-900">DBA</label>
                  <input
                      id="dba"
                      name="dba"
                      type="text"
                      value={formData.dba}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">Phone
                    Number</label>
                  <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="faxNumber" className="block text-sm font-medium text-gray-900">Fax Number</label>
                  <input
                      id="faxNumber"
                      name="faxNumber"
                      type="tel"
                      value={formData.faxNumber}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="physicalAddress" className="block text-sm font-medium text-gray-900">Physical
                    Address</label>
                  <input
                      id="physicalAddress"
                      name="physicalAddress"
                      type="text"
                      value={formData.physicalAddress}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-900">City</label>
                  <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-900">State</label>
                  <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                  <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-900">Postal Code</label>
                    <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 py-1.5 block w-full ${
                            isEditing
                                ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                : 'border-none focus:ring-0'
                        }`}
                    />
                  </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-900">Country</label>
                  <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                  <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-900">Website</label>
                  <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="laborUnion" className="block text-sm font-medium text-gray-900">Labor Union</label>
                  <input
                      id="laborUnion"
                      name="laborUnion"
                      type="text"
                      value={formData.laborUnion}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="constructionDivision" className="block text-sm font-medium text-gray-900">Construction
                    Division</label>
                  <input
                      id="constructionDivision"
                      name="constructionDivision"
                      type="text"
                      value={formData.constructionDivision}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  />
                </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                    <label htmlFor="professionalRelationship" className="block text-sm font-medium text-gray-900">Professional
                      Relationship</label>
                    <input
                        id="professionalRelationship"
                        name="professionalRelationship"
                        type="text"
                        value={formData.professionalRelationship}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`mt-1 py-1.5 block w-full ${
                            isEditing
                                ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                : 'border-none focus:ring-0'
                        }`}
                    />
                  </div>

                <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                  <label htmlFor="bidStatus" className="block text-sm font-medium text-gray-900">Bid Status</label>
                  <select
                      id="bidStatus"
                      name="bidStatus"
                      value={formData.bidStatus}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`mt-1 py-1.5 block w-full ${
                          isEditing
                              ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                              : 'border-none focus:ring-0'
                      }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Bidding">Bidding</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                  </select>
                </div>

                {/* Contacts and Licenses Fields */}
                {formData.contacts.map((contact: any, index: number) => (
                      <div key={index}>
                        <label htmlFor={`firstName-${index}`} className="block text-sm font-medium text-gray-900">Contact
                          First Name</label>
                        <input
                            id={`firstName-${index}`}
                            name="firstName"
                            type="text"
                            value={contact.firstName}
                            onChange={(e) => handleChange(e, index, 'contacts')}
                            readOnly={!isEditing}
                            className={`mt-1 py-1.5 block w-full ${
                                isEditing
                                    ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                    : 'border-none focus:ring-0'
                            }`}
                        />
                      </div>
                  ))}

                  <div className="col-span-full">
                    <div className="border-t border-gray-200 pt-6">
                      <label className="block text-lg font-medium text-gray-900">
                        License Information
                      </label>
                      {formData.licenses.map((license: any, index: number) => (
                          <div
                              key={index}
                              className="grid grid-cols-1 md:grid-cols-5 gap-4 border rounded-md p-4 my-4"
                          >
                            <div className="md:col-span-2">
                              <label
                                  htmlFor={`licenseNumber-${index}`}
                                  className="block text-sm font-medium text-gray-700"
                              >
                                License Number
                              </label>
                              {isEditing ? (
                                  <input
                                      id={`licenseNumber-${index}`}
                                      name="licenseNumber"
                                      type="text"
                                      value={license.licenseNumber}
                                      onChange={(e) => handleChange(e, index, 'licenses')}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  />
                              ) : (
                                  <p className="mt-1 text-gray-900">{license.licenseNumber}</p>
                              )}
                            </div>
                            <div className="md:col-span-2">
                              <label
                                  htmlFor={`licenseState-${index}`}
                                  className="block text-sm font-medium text-gray-700"
                              >
                                State
                              </label>
                              {isEditing ? (
                                  <input
                                      id={`licenseState-${index}`}
                                      name="state"
                                      type="text"
                                      value={license.state}
                                      onChange={(e) => handleChange(e, index, 'licenses')}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                  />
                              ) : (
                                  <p className="mt-1 text-gray-900">{license.state}</p>
                              )}
                            </div>
                            {isEditing && (
                                <div className="flex justify-center items-center mt-6 md:col-span-1">
                                  <button
                                      type="button"
                                      className="text-sm text-red-600 hover:text-red-900"
                                      onClick={() => {
                                        const updatedLicenses = formData.licenses.filter(
                                            (_: any, i: number) => i !== index
                                        );
                                        setFormData({...formData, licenses: updatedLicenses});
                                        setIsModified(true);
                                      }}
                                  >
                                    Remove
                                  </button>
                                </div>
                            )}
                          </div>
                      ))}
                      {isEditing && (
                          <button
                              type="button"
                              onClick={addLicense}
                              className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                          >
                            + Add License
                          </button>
                      )}
                    </div>
                  </div>


                </div>


              </div>
            </div>
            {/* Conditional footer for cancel/submit buttons */}
        {isEditing && (
            <div
                className="ml-0 lg:ml-60 fixed inset-x-0 bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 sm:px-6 z-50">
              <div className="sm:grid grid-cols-1">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-600 hover:text-white"
                    onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="grid grid-flow-row-dense grid-cols-1">
                <button
                    type="submit"
                    className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${
                        isModified ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!isModified} // Disable submit button until form is modified
                >
                  Submit
                </button>
              </div>
            </div>
        )}
      </>
  );
};

export default ViewEditCompanyPage;
