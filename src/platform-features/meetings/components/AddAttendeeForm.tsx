import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdRemove, MdPerson } from 'react-icons/md';

interface Attendee {
  name: string;
  email: string;
}

interface Props {
  contacts: Attendee[];
}

const AddAttendeeForm: React.FC<Props> = ({ contacts }) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [selectedContactIndex, setSelectedContactIndex] = useState<string>('');
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '' });
  const lastAttendeeRef = useRef<HTMLLIElement | null>(null); // Ref for scrolling (use HTMLLIElement)

  useEffect(() => {
    if (lastAttendeeRef.current) {
      lastAttendeeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [attendees]);

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedContactIndex(event.target.value);
  };

  const addSelectedContact = () => {
    const contact = contacts[parseInt(selectedContactIndex)];
    if (contact && !attendees.some(att => att.email === contact.email)) {
      setAttendees(prev => [...prev, contact]);
      setSelectedContactIndex(''); // Reset selection
    }
  };

  const handleInputChange = (field: keyof Attendee, value: string) => {
    setNewAttendee(prev => ({ ...prev, [field]: value }));
  };

  const addManualAttendee = () => {
    if (newAttendee.name && newAttendee.email && !attendees.some(att => att.email === newAttendee.email)) {
      setAttendees(prev => [...prev, newAttendee]);
      setNewAttendee({ name: '', email: '' }); // Reset form
    }
  };

  const removeAttendee = (index: number) => {
    if (window.confirm('Are you sure you want to remove this attendee?')) {
      setAttendees(current => current.filter((_, idx) => idx !== index));
    }
  };

  const isDropdownDisabled = selectedContactIndex === '';
  const isManualAddDisabled = newAttendee.name === '' || newAttendee.email === '';

  return (
    <>
      <h3 className='block text-lg font-semibold text-gray-900'>Attendees</h3>

      {/* Dropdown selection form */}
      <label className="block text-sm font-medium text-gray-900">Select a pre-existing contact:</label>
      <div className="flex items-center gap-4 mb-4">
        <select
          value={selectedContactIndex}
          onChange={handleDropdownChange}
          className="block w-full p-1 border border-gray-300 rounded-md cursor-pointer"
        >
          <option value="">Select a contact...</option>
          {contacts.map((contact, index) => (
            <option key={index} value={index}>
              {contact.name} - {contact.email}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addSelectedContact}
          disabled={isDropdownDisabled}
          className={`flex items-center justify-center px-2 py-1 rounded-md font-semibold 
            ${isDropdownDisabled ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-green-500 hover:bg-green-700 text-white'}
          `}
          aria-label="Add selected attendee"
        >
          <MdAdd size={24} className="inline mr-2" /> Add
        </button>
      </div>

      {/* Manual entry form */}
      <label className="block text-sm font-medium text-gray-900">Or enter manually:</label>
      <div className="flex items-center gap-4 mb-2">
        <input
          type="text"
          value={newAttendee.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="block w-full p-1 border border-gray-300 rounded-md"
          placeholder="Enter name"
          aria-label="Name"
        />
        <input
          type="email"
          value={newAttendee.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="block w-full p-1 border border-gray-300 rounded-md"
          placeholder="Enter email"
          aria-label="Email"
        />
        <button
          type="button"
          onClick={addManualAttendee}
          disabled={isManualAddDisabled}
          className={`flex items-center justify-center px-2 py-1 rounded-md font-semibold 
            ${isManualAddDisabled ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-green-500 hover:bg-green-700 text-white'}
          `}
          aria-label="Add attendee"
        >
          <MdAdd size={24} className="inline mr-2" /> Add
        </button>
      </div>

      {/* List of added attendees */}
      {attendees.length > 0 && (
        <div className="mx-auto border-b border-gray-200 overflow-hidden mt-4">
          <ul className="divide-y divide-gray-200">
            {attendees.map((attendee, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 hover:bg-gray-100 transition-colors duration-150"
                ref={index === attendees.length - 1 ? lastAttendeeRef : null} // Attach ref to the last attendee
              >
                <div className="flex items-center">
                  <MdPerson className="text-gray-500 w-8 h-8 mr-2" />
                  <span className="text-sm font-medium text-gray-900 truncate">{attendee.name} - {attendee.email}</span>
                </div>
                <button 
                  onClick={() => removeAttendee(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-xs px-3 py-1 transition-colors duration-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AddAttendeeForm;
