import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';

interface Attendee {
  name: string;
  email: string;
  companyName?: string;
}

interface Props {
  contacts: Attendee[];
  onSelectedAttendeesChange?: (selectedAttendees: Attendee[]) => void;
  onAddContact?: (contact: Attendee) => void;
}

const AddAttendeeForm: React.FC<Props> = ({
                                            contacts,
                                            onSelectedAttendeesChange,
                                            onAddContact,
                                          }) => {
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [newAttendee, setNewAttendee] = useState<Attendee>({
    name: '',
    email: '',
    companyName: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Memoized sorted contacts
  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      const companyA = a.companyName || '';
      const companyB = b.companyName || '';
      if (companyA < companyB) return -1;
      if (companyA > companyB) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }, [contacts]);

  // Filtered contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery) return sortedContacts;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return sortedContacts.filter((contact) => {
      return (
          contact.name.toLowerCase().includes(lowerCaseQuery) ||
          contact.email.toLowerCase().includes(lowerCaseQuery) ||
          (contact.companyName || '').toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [sortedContacts, searchQuery]);

  // Group contacts by company
  const groupedContacts = useMemo(() => {
    const groups = new Map<string, Attendee[]>();
    for (const contact of filteredContacts) {
      const companyName = contact.companyName || 'No Company';
      if (!groups.has(companyName)) {
        groups.set(companyName, []);
      }
      groups.get(companyName)!.push(contact);
    }
    return Array.from(groups.entries());
  }, [filteredContacts]);

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
    if (onSelectedAttendeesChange) {
      const selectedAttendees = contacts.filter((contact) =>
          selectedContacts.has(contact.email)
      );
      onSelectedAttendeesChange(selectedAttendees);
    }
  }, [selectedContacts, contacts, onSelectedAttendeesChange]);

  const handleInputChange =
      (field: keyof Attendee) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAttendee((prev) => ({ ...prev, [field]: event.target.value }));
      };

  const isValidEmail = (email: string) => {
    // Simple email validation regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const addManualAttendee = () => {
    if (!isValidEmail(newAttendee.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (contacts.some((contact) => contact.email === newAttendee.email)) {
      setErrorMessage('This attendee already exists.');
      return;
    }

    if (onAddContact) {
      onAddContact(newAttendee);
    }

    // Select the new contact
    setSelectedContacts((prevSelected) =>
        new Set(prevSelected).add(newAttendee.email)
    );

    setNewAttendee({ name: '', email: '', companyName: '' });
    setErrorMessage('');
  };

  const isManualAddDisabled =
      newAttendee.name.trim() === '' || newAttendee.email.trim() === '';

  return (
      <div className="w-full">
        <h3 className="block text-lg font-semibold text-gray-900 mb-4">
          Attendees
        </h3>

        {errorMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
              {errorMessage}
            </div>
        )}

        {/* Manual entry form */}
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Add a contact:
        </label>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <input
              type="text"
              value={newAttendee.name}
              onChange={handleInputChange('name')}
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter name"
              aria-label="Name"
          />
          <input
              type="email"
              value={newAttendee.email}
              onChange={handleInputChange('email')}
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter email"
              aria-label="Email"
          />
          <input
              type="text"
              value={newAttendee.companyName}
              onChange={handleInputChange('companyName')}
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter company name (optional)"
              aria-label="Company Name"
          />
          <button
              type="button"
              onClick={addManualAttendee}
              disabled={isManualAddDisabled}
              className={`flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-colors duration-200
              ${
                  isManualAddDisabled
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-green-500 hover:bg-green-700 text-white'
              }
            `}
              aria-label="Add attendee"
          >
            <MdAdd size={24} className="inline mr-2" /> Add
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Select All / Deselect All */}
        <div className="flex justify-end mb-2">
          <button
              type="button"
              onClick={() =>
                  setSelectedContacts(new Set(contacts.map((c) => c.email)))
              }
              className="text-sm text-blue-500 hover:underline mr-4"
          >
            Select All
          </button>
          <button
              type="button"
              onClick={() => setSelectedContacts(new Set())}
              className="text-sm text-blue-500 hover:underline"
          >
            Deselect All
          </button>
        </div>

        {/* Contacts selection */}
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Select contacts:
        </label>
        <div className="border border-gray-300 rounded-md p-4 mb-4 max-h-64 overflow-y-auto">
          {groupedContacts.length === 0 && (
              <p className="text-gray-500">No contacts available.</p>
          )}
          {groupedContacts.map(([companyName, contacts]) => (
              <div key={companyName}>
                <h4 className="text-md font-semibold text-gray-800 mt-2">
                  {companyName}
                </h4>
                {contacts.map((contact) => (
                    <label key={contact.email} className="flex items-center mb-2">
                      <input
                          type="checkbox"
                          checked={selectedContacts.has(contact.email)}
                          onChange={() => handleContactCheckboxChange(contact.email)}
                          className="form-checkbox h-4 w-4 text-green-600"
                          aria-label={`Select ${contact.name}`}
                      />
                      <span className="ml-2 text-gray-700">
                  {contact.name} - {contact.email}
                </span>
                    </label>
                ))}
              </div>
          ))}
        </div>
      </div>
  );
};

export default AddAttendeeForm;
