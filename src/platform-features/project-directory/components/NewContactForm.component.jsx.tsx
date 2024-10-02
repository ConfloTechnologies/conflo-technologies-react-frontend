import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import ProgressBar from "../../../common/components/ProgressBar";

interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    // Include any other fields relevant to your contacts
}

interface ContactFormData {
    firstName: string;
    lastName: string;
    contactPhoneNumber: string;
    contactEmail: string;
    contactType: string;
    contactTitle: string;
}

interface NewContactFormProps {
    existingContacts: Contact[];
    setContactFormData: (data: ContactFormData) => void;
}

const NewContactForm: FC<NewContactFormProps> = ({
                                                     existingContacts,
                                                     setContactFormData,
                                                 }) => {
    // Local state variables for form fields
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [contactPhoneNumber, setContactPhoneNumber] = useState<string>('');
    const [contactEmail, setContactEmail] = useState<string>('');
    const [contactType, setContactType] = useState<string>('');
    const [contactTitle, setContactTitle] = useState<string>('');

    // State variables for validation errors
    const [duplicateNameError, setDuplicateNameError] = useState<string>('');
    const [duplicatePhoneNumberError, setDuplicatePhoneNumberError] = useState<string>('');
    const [duplicateEmailError, setDuplicateEmailError] = useState<string>('');

    // progress bar information
    const currentStep = 0;
    const totalSteps = 4;

    // Handler functions for input changes
    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleContactPhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactPhoneNumber(e.target.value);
    };

    const handleContactEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactEmail(e.target.value);
    };

    const handleContactTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setContactType(e.target.value);
    };

    const handleContactTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactTitle(e.target.value);
    };

    useEffect(() => {
        // Normalize input for comparison safely
        const normalizedFirstName = firstName?.trim().toLowerCase() || '';
        const normalizedLastName = lastName?.trim().toLowerCase() || '';
        const normalizedEmail = contactEmail?.trim().toLowerCase() || '';
        const normalizedPhoneNumber = contactPhoneNumber?.trim() || '';

        const fullName = `${normalizedFirstName} ${normalizedLastName}`;

        // Check for duplicate name
        const duplicateNameContact = existingContacts.find(contact => {
            const contactFirstName = contact.firstName ? contact.firstName.trim().toLowerCase() : '';
            const contactLastName = contact.lastName ? contact.lastName.trim().toLowerCase() : '';
            const contactFullName = `${contactFirstName} ${contactLastName}`;
            return contactFullName === fullName;
        });
        setDuplicateNameError(duplicateNameContact ? 'A contact with this name already exists in the directory.' : '');

        // Check for duplicate phone number
        const duplicatePhoneContact = existingContacts.find(contact =>
            (contact.phoneNumber?.trim() || '') === normalizedPhoneNumber && normalizedPhoneNumber !== ''
        );
        setDuplicatePhoneNumberError(duplicatePhoneContact ? 'A contact with this phone number already exists in the directory.' : '');

        // Check for duplicate email
        const duplicateEmailContact = existingContacts.find(contact =>
            (contact.email?.trim().toLowerCase() || '') === normalizedEmail && normalizedEmail !== ''
        );
        setDuplicateEmailError(duplicateEmailContact ? 'A contact with this email already exists in the directory.' : '');
    }, [firstName, lastName, contactPhoneNumber, contactEmail, existingContacts]);

    return (
        <>
            <div className="text-xl font-bold py-2 sticky top-0 z-30 bg-white">
                <h2 className="pb-2 border-b border-gray-200">New Project Contact Form:</h2>
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>
            <div className="grid grid-cols-1 border-b pb-6 border-gray-900/10">
                <h2 className="text-lg font-semibold leading-7 text-gray-900 pt-4 pb-4 border-t mt-6 border-gray-900/10">
                    Contact Information
                </h2>

                <div className="grid grid-cols-1 gap-y-4">
                    {/* First Name and Last Name Fields */}
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
                                value={firstName}
                                onChange={handleFirstNameChange}
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
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
                                value={lastName}
                                onChange={handleLastNameChange}
                                className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Duplicate Name Error */}
                    {duplicateNameError && (
                        <p className="text-sm text-red-600">
                            {duplicateNameError}
                        </p>
                    )}

                    {/* Phone Number Field */}
                    <div className="col-span-1">
                        <label htmlFor="contactPhoneNumber" className="block text-sm font-medium text-gray-900">
                            Phone Number
                        </label>
                        <input
                            id="contactPhoneNumber"
                            name="contactPhoneNumber"
                            type="tel"
                            placeholder="e.g., (123) 456-7890"
                            value={contactPhoneNumber}
                            onChange={handleContactPhoneNumberChange}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        />
                        {/* Duplicate Phone Number Error */}
                        {duplicatePhoneNumberError && (
                            <p className="mt-2 text-sm text-red-600">
                                {duplicatePhoneNumberError}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="col-span-1">
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            placeholder="email@example.com"
                            value={contactEmail}
                            onChange={handleContactEmailChange}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        />
                        {/* Duplicate Email Error */}
                        {duplicateEmailError && (
                            <p className="mt-2 text-sm text-red-600">
                                {duplicateEmailError}
                            </p>
                        )}
                    </div>

                    {/* Contact Type Field */}
                    <div className="col-span-1">
                        <label htmlFor="contactType" className="block text-sm font-medium text-gray-900">
                            Contact Type
                        </label>
                        <select
                            id="contactType"
                            name="contactType"
                            value={contactType}
                            onChange={handleContactTypeChange}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        >
                            <option value="">Select...</option>
                            <option value="internal">Internal Contact</option>
                            <option value="external">Subcontractor Contact</option>
                            <option value="client">Client Contact</option>
                        </select>
                    </div>

                    {/* Contact Title Field */}
                    <div className="col-span-1">
                        <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-900">
                            Title
                        </label>
                        <input
                            id="contactTitle"
                            name="contactTitle"
                            type="text"
                            placeholder="Project Manager"
                            value={contactTitle}
                            onChange={handleContactTitleChange}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewContactForm;