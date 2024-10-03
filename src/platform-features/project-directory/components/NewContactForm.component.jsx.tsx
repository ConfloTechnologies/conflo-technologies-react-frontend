import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import ProgressBar from "../../../common/components/ProgressBar";
import { Contact } from "../../../types/directory";

interface NewContactFormProps {
    existingContacts: Contact[];
    setContactFormData: (data: Contact) => void;
}

const NewContactForm: FC<NewContactFormProps> = ({
                                                     existingContacts,
                                                     setContactFormData,
                                                 }) => {
    // Local state variables for form fields
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>(''); // Update to phone
    const [email, setEmail] = useState<string>(''); // Update to email
    const [contactType, setContactType] = useState<string>('');
    const [title, setTitle] = useState<string>(''); // Update to title

    // State variables for validation errors
    const [duplicateNameError, setDuplicateNameError] = useState<string>('');
    const [duplicatePhoneError, setDuplicatePhoneError] = useState<string>('');
    const [duplicateEmailError, setDuplicateEmailError] = useState<string>('');

    // Progress bar information
    const currentStep = 2.5;
    const totalSteps = 4;

    // Handler functions for input changes
    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleContactTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setContactType(e.target.value);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    useEffect(() => {
        // Normalize input for comparison safely
        const normalizedFirstName = firstName?.trim().toLowerCase() || '';
        const normalizedLastName = lastName?.trim().toLowerCase() || '';
        const normalizedEmail = email?.trim().toLowerCase() || '';
        const normalizedPhone = phone?.trim() || '';

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
            (contact.phone?.trim() || '') === normalizedPhone && normalizedPhone !== ''
        );
        setDuplicatePhoneError(duplicatePhoneContact ? 'A contact with this phone number already exists in the directory.' : '');

        // Check for duplicate email
        const duplicateEmailContact = existingContacts.find(contact =>
            (contact.email?.trim().toLowerCase() || '') === normalizedEmail && normalizedEmail !== ''
        );
        setDuplicateEmailError(duplicateEmailContact ? 'A contact with this email already exists in the directory.' : '');
    }, [firstName, lastName, phone, email, existingContacts]);

    return (
        <>
            <div className="flex flex-col px-2">
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
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="e.g., (123) 456-7890"
                            value={phone}
                            onChange={handlePhoneChange}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        />
                        {/* Duplicate Phone Number Error */}
                        {duplicatePhoneError && (
                            <p className="mt-2 text-sm text-red-600">
                                {duplicatePhoneError}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="col-span-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={handleEmailChange}
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
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Project Manager"
                            value={title}
                            onChange={handleTitleChange}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewContactForm;
