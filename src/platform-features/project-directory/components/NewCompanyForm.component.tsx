import React, { FC, ChangeEvent, useState } from "react";
import ProgressBar from "../../../common/components/ProgressBar";

interface License {
    licenseNumber: string;
    state: string;
}

interface CompanyFormData {
    entityName: string;
    dba: string;
    professionalRelationship: string;
    phoneNumber: string;
    faxNumber: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    website: string;
    laborUnion: string;
    constructionDivision: string;
    bidStatus: string;
    licenses: License[];
}

interface NewCompanyFormProps {
    companyFormData: CompanyFormData;
    setCompanyFormData: React.Dispatch<React.SetStateAction<CompanyFormData>>;
    constructionDivisions: string[];
    duplicateCompanyError: boolean;
}

interface StickyFooterProps {
    onSave: () => void;
    hasChanges: boolean;
}

function StickyFooter({ onSave, hasChanges }: StickyFooterProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 border-t shadow-xl p-2 flex justify-end">
            <div className="flex space-x-3">
                <button
                    type="button"
                    className="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white focus-visible:outline-offset-0"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={hasChanges ? onSave : undefined}
                    disabled={!hasChanges}
                    className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                        hasChanges
                            ? 'bg-green-500 text-white hover:bg-green-700'
                            : 'bg-white text-gray-600 opacity-50 cursor-not-allowed'
                    }`}
                >
                    Save Company
                </button>
            </div>
        </div>
    );
}

const NewCompanyForm: FC<NewCompanyFormProps> = ({
                                                     companyFormData,
                                                     setCompanyFormData,
                                                     constructionDivisions,
                                                     duplicateCompanyError,
                                                 }) => {
    const [hasChanges, setHasChanges] = useState(false);

    // progress bar information
    const currentStep = 1;
    const totalSteps = 4;

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setCompanyFormData({ ...companyFormData, [name]: value });
        setHasChanges(true);
    };

    const handleLicenseChange = (
        index: number,
        field: keyof License,
        value: string
    ) => {
        const updatedLicenses = companyFormData.licenses.map(
            (license: License, i: number) => {
                if (i === index) {
                    return { ...license, [field]: value };
                }
                return license;
            }
        );
        setCompanyFormData({ ...companyFormData, licenses: updatedLicenses });
        setHasChanges(true);
    };

    const addLicense = () => {
        const newLicense = { licenseNumber: '', state: '' };
        setCompanyFormData({
            ...companyFormData,
            licenses: [...companyFormData.licenses, newLicense],
        });
        setHasChanges(true);
    };

    const removeLicense = (index: number) => {
        const filteredLicenses = companyFormData.licenses.filter(
            (_, i) => i !== index
        );
        setCompanyFormData({ ...companyFormData, licenses: filteredLicenses });
        setHasChanges(true);
    };

    const onSave = () => {
        // Implement your save logic here
        console.log('Company data saved:', companyFormData);
        setHasChanges(false);
    };

    return (
        <div className="flex flex-col px-2">
            <div className="text-xl font-bold py-2 sticky top-0 z-30 bg-white">
                <h2 className="pb-2 border-b border-gray-200">New Project Contact Form:</h2>
                <ProgressBar
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                />
            </div>

            {/* Scrollable Form Content */}
            <div className="py-2 flex-grow px-2">
                <form>
                    <div className="grid grid-cols-6 gap-4">
                        {/* Entity Name and DBA */}
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Entity Name
                            </label>
                            <input
                                type="text"
                                name="entityName"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.entityName}
                                onChange={handleInputChange}
                            />
                            {duplicateCompanyError && (
                                <p className="mt-2 text-sm text-red-600">
                                    A company with this Entity Name already exists.
                                </p>
                            )}
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                DBA (if applicable)
                            </label>
                            <input
                                type="text"
                                name="dba"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.dba}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Professional Relationship and Construction Division */}
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Professional Relationship
                            </label>
                            <select
                                name="professionalRelationship"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.professionalRelationship}
                                onChange={handleInputChange}
                            >
                                <option value="">Select...</option>
                                <option value="Subcontractor">Subcontractor</option>
                                <option value="Client">Client</option>
                            </select>
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Division
                            </label>
                            <select
                                name="constructionDivision"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.constructionDivision}
                                onChange={handleInputChange}
                            >
                                <option value="">Select...</option>
                                {constructionDivisions.map((division, index) => (
                                    <option key={index} value={division}>
                                        {division}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Bid Status */}
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Bid Status
                            </label>
                            <select
                                name="bidStatus"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.bidStatus}
                                onChange={handleInputChange}
                            >
                                <option value="">Select...</option>
                                <option value="Pending">Pending</option>
                                <option value="Bidding">Bidding</option>
                                <option value="Awarded">Awarded</option>
                                <option value="Not Awarded">Not Awarded</option>
                            </select>
                        </div>
                        {/* Empty div to balance the grid */}
                        <div className="col-span-full md:col-span-3"></div>

                        {/* Phone and Fax Numbers */}
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Office Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="e.g., (123) 456-7890"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Fax Number
                            </label>
                            <input
                                type="tel"
                                name="faxNumber"
                                placeholder="e.g., (123) 456-7890"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.faxNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Address */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-900">
                                Physical Address
                            </label>
                            <input
                                type="text"
                                name="address1"
                                placeholder="123 Example St"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.address1}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* City and State */}
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.state}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Postal Code and Country */}
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Postal Code"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.postalCode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.country}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Email and Website */}
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                                Website
                            </label>
                            <input
                                type="url"
                                name="website"
                                placeholder="www.example.com"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.website}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Labor Union */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-900">
                                Labor Union
                            </label>
                            <input
                                type="text"
                                name="laborUnion"
                                placeholder="Labor Union"
                                className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={companyFormData.laborUnion}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* License Information */}
                        <div className="col-span-full">
                            <div className="border-t border-gray-200 pt-6">
                                <label className="block text-lg font-medium text-gray-900">
                                    License Information
                                </label>
                                {companyFormData.licenses.map((license: License, index: number) => (
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
                                            <input
                                                id={`licenseNumber-${index}`}
                                                name={`licenseNumber-${index}`}
                                                type="text"
                                                placeholder="License Number"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                value={license.licenseNumber}
                                                onChange={(e) =>
                                                    handleLicenseChange(index, 'licenseNumber', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor={`licenseState-${index}`}
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                State
                                            </label>
                                            <input
                                                id={`licenseState-${index}`}
                                                name={`licenseState-${index}`}
                                                type="text"
                                                placeholder="State"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                value={license.state}
                                                onChange={(e) =>
                                                    handleLicenseChange(index, 'state', e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-center items-center mt-6 md:col-span-1">
                                            <button
                                                type="button"
                                                className="text-sm text-red-600 hover:text-red-900"
                                                onClick={() => removeLicense(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        className="text-sm text-indigo-600 hover:text-indigo-900"
                                        onClick={addLicense}
                                    >
                                        Add Another License
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Sticky Footer */}
            {/*<StickyFooter onSave={onSave} hasChanges={hasChanges} />*/}
        </div>
    );
};

export default NewCompanyForm;
