import React, { FC, useState } from "react";
import ProgressBar from "../../../common/components/ProgressBar";
import { Contact } from "../../../types/directory";;

interface ContactSearchFormProps {
    selectedCompany: string | null;
    companiesWithContacts: { [key: string]: any };
    setSelectedContact: (contact: Contact | null) => void;
    setCurrentStep: (step: number) => void;
}

const ContactSearchFormComponent: FC<ContactSearchFormProps> = ({
                                                                    selectedCompany,
                                                                    companiesWithContacts,
                                                                    setSelectedContact,
                                                                    setCurrentStep,
                                                                }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [localSelectedContact, setLocalSelectedContact] = useState<Contact | null>(
        null
    );
    const [showContactError, setShowContactError] = useState<boolean>(false);



    const contacts: Contact[] = selectedCompany
        ? companiesWithContacts[selectedCompany].contacts || []
        : [];

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 100);
    };

    const handleSelectContact = (contact: Contact) => {
        setLocalSelectedContact(contact);
        setSelectedContact(contact); // Inform parent component
        setShowContactError(false);
    };

    const handleRemoveContact = () => {
        setLocalSelectedContact(null);
        setSelectedContact(null); // Inform parent component
        setShowContactError(false);
    };

    const handleCreateNewContactClick = () => {
        if (localSelectedContact) {
            setShowContactError(true);
        } else {
            setCurrentStep(3); // Proceed to the NewContactForm step
        }
    };

    const filteredContacts = contacts.filter((contact) =>
        `${contact.firstName} ${contact.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-6 px-2">
            <div className="mx-auto w-full max-w-4xl">
                <div className="py-5 h-[200px] px-2">
                    <label htmlFor="searchContacts" className="block text-sm font-medium leading-6 text-gray-900">
                        Select a pre-existing contact:
                    </label>
                    <div className="mt-2 relative">
                        {selectedCompany ? (
                            <>
                                <input
                                    id="searchContacts"
                                    type="text"
                                    placeholder={
                                        localSelectedContact
                                            ? `${localSelectedContact.firstName} ${localSelectedContact.lastName}`
                                            : "Search contacts..."
                                    }
                                    value={searchTerm || ""}
                                    onChange={handleSearchChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {(isFocused || searchTerm) && (
                                    <ul className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto">
                                        {filteredContacts.map((contact, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    handleSelectContact(contact)
                                                    setSearchTerm('');
                                                }}
                                                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                {contact.firstName} {contact.lastName} - {contact.title}
                                            </li>
                                        ))}
                                        {filteredContacts.length === 0 && (
                                            <li className="px-3 py-2 text-gray-500">
                                                No contacts found
                                            </li>
                                        )}
                                    </ul>
                                )}
                                {localSelectedContact && (
                                    <div className="pl-2 mt-4 flex items-center">
                                        Selected Contact:{" "}
                                        <strong>
                                            {localSelectedContact.firstName} {localSelectedContact.lastName}
                                        </strong>
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

                <hr className="border-t border-gray-200 px-2"/>

                <div className="mt-28 px-2"
                >
                    <label
                        htmlFor=""
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Create a new contact:
                    </label>
                    <div className="mt-3">
                        <button
                            type="button"
                            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                                localSelectedContact
                                    ? "bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-white"
                                    : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                            onClick={handleCreateNewContactClick}
                        >
                            Create New Contact
                        </button>
                        {showContactError && (
                            <p className="mt-4 text-sm text-red-600 text-center">
                                To create a new contact, you must remove the current contact
                                selection
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ContactSearchFormComponent;
