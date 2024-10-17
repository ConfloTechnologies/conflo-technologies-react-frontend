import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import '../../../common/styles/roundedCorners.css';

interface Contact {
  company: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactType: string;
  title: string;
  projects?: string[];
}

interface Props {
  contacts: Contact[];
  onSelectedContactsChange?: (selectedContacts: Contact[]) => void;
  onAddContact?: (contact: Contact) => void;
}

const AddContactForm: React.FC<Props> = ({
                                           contacts,
                                           onSelectedContactsChange,
                                           onAddContact,
                                         }) => {
  // Local state for contacts
  const [localContacts, setLocalContacts] = useState<Contact[]>(contacts);

  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [newContact, setNewContact] = useState<Contact>({
    company: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    contactType: '',
    title: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Update localContacts when the contacts prop changes
  useEffect(() => {
    setLocalContacts(contacts);
  }, [contacts]);

  const sortedContacts = useMemo(() => {
    return [...localContacts].sort((a, b) => {
      const nameA = `${a.lastName} ${a.firstName}`.toLowerCase();
      const nameB = `${b.lastName} ${b.firstName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [localContacts]);

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return sortedContacts;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return sortedContacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return (
          fullName.includes(lowerCaseQuery) ||
          contact.email.toLowerCase().includes(lowerCaseQuery) ||
          contact.contactType.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [sortedContacts, searchQuery]);

  const handleContactCheckboxChange = (email: string) => {
    setSelectedContacts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(email)) {
        newSelected.delete(email);
      } else {
        newSelected.add(email);
      }
      return newSelected;
    });
  };

  useEffect(() => {
    if (onSelectedContactsChange) {
      const selected = localContacts.filter((contact) =>
          selectedContacts.has(contact.email)
      );
      onSelectedContactsChange(selected);
    }
  }, [selectedContacts, localContacts, onSelectedContactsChange]);

  const handleInputChange =
      (field: keyof Contact) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewContact((prev) => ({ ...prev, [field]: event.target.value }));
      };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const addManualContact = () => {
    if (!isValidEmail(newContact.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (localContacts.some((contact) => contact.email === newContact.email)) {
      setErrorMessage('This contact already exists.');
      return;
    }

    // Add the new contact to the local contacts list
    setLocalContacts((prevContacts) => [...prevContacts, newContact]);

    // Select the new contact
    setSelectedContacts((prevSelected) =>
        new Set(prevSelected).add(newContact.email)
    );

    // Call the onAddContact callback if provided
    if (onAddContact) {
      onAddContact(newContact);
    }

    setNewContact({
      company: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      contactType: '',
      title: '',
    });
    setErrorMessage('');
    setIsDialogOpen(false);
  };

  const handleAddButtonClick = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setErrorMessage('');
  };

  const isManualAddDisabled =
      newContact.firstName.trim() === '' || newContact.email.trim() === '';

  return (
      <div className="w-full border border-gray-200 p-1 rounded-lg">
        <div className="text-lg px-2 py-1 font-bold bg-white ">
          <h3>Meeting Invites</h3>
        </div>
        <div className="flex items-center justify-end space-x-2 sm:space-x-4 max-w-full py-2 px-1">
          <div className="flex-grow sm:flex-shrink-0 max-w-xl">
            <div className="relative flex-grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-gray-300 pl-10 text-gray-900 placeholder:text-gray-400"
                  style={{ height: '36px' }}
              />
            </div>
          </div>
          <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
              onClick={handleAddButtonClick}
          >
            <MdAdd className="h-4 w-4" />
            <p className="hidden sm:block text-md font-semibold ml-1">New Contact</p>
          </button>
        </div>

        {/* Dialog for adding a contact */}
        {isDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Grey overlay */}
              <div
                  className="absolute inset-0 bg-gray-500 opacity-75"
                  onClick={closeDialog}
              ></div>

              {/* Dialog content */}
              <div className="bg-white rounded-md p-6 w-full max-w-xl relative z-10 m-4">
                <h2 className="text-lg font-semibold mb-4">Add a New Contact</h2>
                {errorMessage && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                      {errorMessage}
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-medium text-gray-900">
                      First Name
                    </label>
                    <input
                        type="text"
                        value={newContact.firstName}
                        onChange={handleInputChange('firstName')}
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="First Name"
                    />
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-medium text-gray-900">
                      Last Name
                    </label>
                    <input
                        type="text"
                        value={newContact.lastName}
                        onChange={handleInputChange('lastName')}
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Last Name"
                    />
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-medium text-gray-900">
                      Email
                    </label>
                    <input
                        type="email"
                        value={newContact.email}
                        onChange={handleInputChange('email')}
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Email"
                    />
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label className="block text-sm font-medium text-gray-900">
                      Company
                    </label>
                    <input
                        type="text"
                        value={newContact.company}
                        onChange={handleInputChange('company')}
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Company"
                    />
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                      type="button"
                      onClick={closeDialog}
                      className="flex items-center justify-center px-4 py-2 rounded-md font-semibold bg-red-500 hover:bg-red-700 text-white transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                      type="button"
                      onClick={addManualContact}
                      disabled={isManualAddDisabled}
                      className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                          isManualAddDisabled
                              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                              : 'bg-green-500 hover:bg-green-700 text-white'
                      }`}
                  >
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Contacts selection in a table with 300px height */}
        <div className="overflow-y-auto" style={{ height: '300px' }}>
          <table className="min-w-full rounded-corners">
            <thead className="bg-gray-100 sticky top-0 z-30">
            <tr>
              <th
                  scope="col"
                  className="py-2 text-left text-sm font-semibold text-gray-900 px-4 "
              ></th>
              <th
                  scope="col"
                  className="py-2 text-left text-sm font-semibold text-gray-900 px-4 rounded-corners"
              >
                Name
              </th>
              <th
                  scope="col"
                  className="py-2 text-left text-sm font-semibold text-gray-900 px-4 hidden md:table-cell">

                Email
              </th>
              <th
                  scope="col"
                  className="py-2 text-left text-sm font-semibold text-gray-900 px-4"
              >
                Company
              </th>
            </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No contacts available.
                  </td>
                </tr>
            ) : (
                filteredContacts.map((contact) => (
                    <tr key={contact.email}>
                      <td className="py-2 text-left text-sm text-gray-900 px-4">
                        <input
                            type="checkbox"
                            checked={selectedContacts.has(contact.email)}
                            onChange={() => handleContactCheckboxChange(contact.email)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                      </td>
                      <td className="py-2 text-left text-sm text-gray-900 px-4">
                        {`${contact.firstName} ${contact.lastName}`}
                      </td>
                      <td className="py-2 text-left text-sm text-gray-900 px-4 hidden md:table-cell">
                        {contact.email}
                      </td>
                      <td className="py-2 text-left text-sm text-gray-900 px-4">
                        {contact.company}
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default AddContactForm;
