import React, { FC, ChangeEvent, useState, useEffect, useRef } from "react";
import { MdRemove, MdAdd } from 'react-icons/md';
import { Company, License, NewCompanyFormProps } from "../../../types/directory";
import AddAttendeeForm from "../../meetings/components/AddAttendeeForm";

const NewCompanyForm: FC<NewCompanyFormProps> = ({
                                                     companyFormData,
                                                     setCompanyFormData,
                                                     constructionDivisions,
                                                     duplicateCompanyError,
                                                 }) => {
    const [hasChanges, setHasChanges] = useState(false);
    const licenseRefs = useRef<Array<HTMLDivElement | null>>([]);

    /** State variable to track the index of the newly added license **/
    const [newLicenseIndex, setNewLicenseIndex] = useState<number | null>(null);

    /** Initialize with an empty license if none exist **/
    useEffect(() => {
        if (companyFormData.licenses.length === 0) {
            addLicense();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /** Scroll to newly added license **/
    useEffect(() => {
        if (newLicenseIndex !== null) {
            const element = licenseRefs.current[newLicenseIndex];
            if (element) {
                // Optionally scroll into view
                // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Reset newLicenseIndex
            setNewLicenseIndex(null);
        }
    }, [companyFormData.licenses, newLicenseIndex]);

    /** Handle input changes for other form fields **/
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setCompanyFormData({ ...companyFormData, [name]: value });
        setHasChanges(true);
    };

    /** Handle changes in license fields **/
    const handleLicenseChange = (
        index: number,
        field: keyof License,
        value: string
    ) => {
        const updatedLicenses = companyFormData.licenses.map((license, i) => {
            if (i === index) {
                return { ...license, [field]: value };
            }
            return license;
        });
        setCompanyFormData({ ...companyFormData, licenses: updatedLicenses });
        setHasChanges(true);
    };

    /** Add a new license **/
    const addLicense = () => {
        const newLicense: License = { licenseNumber: "", state: "" };
        setCompanyFormData({
            ...companyFormData,
            licenses: [...companyFormData.licenses, newLicense],
        });
        setHasChanges(true);

        // Set newLicenseIndex to the index of the newly added license
        setNewLicenseIndex(companyFormData.licenses.length);
    };

    /** Remove a license **/
    const removeLicense = (index: number) => {
        const filteredLicenses = companyFormData.licenses.filter(
            (_, i) => i !== index
        );
        setCompanyFormData({ ...companyFormData, licenses: filteredLicenses });
        setHasChanges(true);
    };

    return (
        <>
            <div className="flex flex-col pb-12">
                <div className="grid grid-cols-6 gap-4 px-4">

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
                    <div className="hidden sm:grid col-span-full md:col-span-3"></div>

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
                            name="physicalAddress"
                            placeholder="123 Example St"
                            className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            value={companyFormData.physicalAddress}
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
                </div>

                {/* --- License Information Section --- */}
                <div className="py-4 ">
                    <div className="col-span-full border-t my-4 pt-4 px-4" >
                        <h2 className="text-xl font-bold pb-2">License Information</h2>
                    </div>
                    {companyFormData.licenses.map((license: License, index: number) => (
                        <div
                            key={index}
                            ref={(el) => (licenseRefs.current[index] = el)}
                            className="relative bg-white"
                        >
                            <div className="grid grid-cols-7 gap-4 py-2 ">
                                {/* Remove Button */}
                                <div
                                    className="col-span-1 md:col-span-2 flex items-center justify-start"
                                    style={{width: "350px"}}
                                >
                                    {/* Inlined Remove Button */}
                                    <div className="flex items-center justify-start py-2">
                                        <button
                                            type="button"
                                            onClick={() => removeLicense(index)}
                                            className="ml-4 bg-red-500 text-white font-semibold rounded hover:bg-red-700 flex items-center justify-center w-6 h-6 md:w-7 md:h-7"
                                        >
                                            <MdRemove className="w-full h-full"/>
                                        </button>
                                    </div>
                                </div>

                                {/* License Fields */}
                                <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-4 gap-4 px-4">
                                    {/* Mobile View Title */}

                                    {/* License Number */}
                                    <div className="col-span-full md:col-span-2 ">
                                        <label
                                            htmlFor={`licenseNumber-${index}`}
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            License Number
                                        </label>
                                        <input
                                            id={`licenseNumber-${index}`}
                                            type="text"
                                            className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            value={license.licenseNumber}
                                            onChange={(e) =>
                                                handleLicenseChange(
                                                    index,
                                                    "licenseNumber",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    {/* State */}
                                    <div className="col-span-full md:col-span-2 ">
                                        <label
                                            htmlFor={`state-${index}`}
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            State
                                        </label>
                                        <input
                                            id={`state-${index}`}
                                            type="text"
                                            className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            value={license.state}
                                            onChange={(e) =>
                                                handleLicenseChange(index, "state", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Add License Button */}
                    <div className="flex items-center justify-start py-2">
                        <button
                            type="button"
                            onClick={addLicense}
                            className="ml-4 bg-green-500 text-white font-semibold rounded hover:bg-green-700 flex items-center justify-center w-6 h-6 md:w-7 md:h-7"
                        >
                            <MdAdd className="w-full h-full"/>
                        </button>
                        <div className="flex items-center justify-end px-4 font-semibold">
                            <h2>Add License</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewCompanyForm;
