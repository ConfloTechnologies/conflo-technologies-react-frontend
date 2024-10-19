import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../../common/components/PageHeader.component';
import MenuTabs from '../../../common/components/MenuTabs.component';
import { useDynamicContentHeight } from '../../../common/utils/useDynamicContentHeightSettingOne';
import { MdAdd } from 'react-icons/md';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import '../../../common/styles/roundedCorners.css';
import { Switch } from '@headlessui/react';
import FileUploader from "../../../common/components/FileUploader.component";
import AddAttendeeForm from "../components/AddAttendeeForm";

interface FileWithPreview {
    file: File;
    src: string;
}

export interface Contact {
    firstName: string;
    lastName: string;
    phone: string;           // Updated to phone
    email: string;           // Updated to email
    contactType: string;
    title: string;           // Updated to title
    projects?: string[];     // Added projects field
    attended?: boolean;
    company: string;
}

const ViewEditMeetingPage: React.FC = () => {
    const { meetingId } = useParams<{ meetingId: string }>();

    const mockContacts: Contact[] = [
        { company: 'Alpha', firstName: 'Alice', lastName: 'Johnson', phone: '123-456-7890', email: 'alice@alpha.com', contactType: 'Client', title: 'Manager', projects: ['Project A'] },
        { company: 'Alpha', firstName: 'Bob', lastName: 'Smith', phone: '234-567-8901', email: 'bob@alpha.com', contactType: 'Contractor', title: 'Engineer', projects: [] },
        { company: 'Beta', firstName: 'Charlie', lastName: 'Brown', phone: '345-678-9012', email: 'charlie@beta.com', contactType: 'Client', title: 'CEO', projects: ['Project C'] },
        // ... add more contacts as needed
    ];

    const [meetingDetails, setMeetingDetails] = useState({
        meetingTitle: '',
        meetingDate: '',
        timeZone: '',
        meetingLocation: '',
        videoLink: '',
        startTime: '',
        endTime: '',
        meetingDescription: '',
        recordedNotesLink: '',  // New field
        videoRecordingLink: '', // New field
        meetingNotes: '',       // New field
    });

    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [mainContentHeight, setMainContentHeight] = useState('');

    useDynamicContentHeight(headerRef, setMainContentHeight, 0);

    useEffect(() => {
        async function fetchMeetingDetails() {
            const fetchedDetails = {
                meetingTitle: 'Project Sync',
                meetingDate: '2023-10-03',
                timeZone: 'PST',
                meetingLocation: 'Conference Room 1',
                videoLink: 'https://zoom.us/j/123456789',
                startTime: '09:00',
                endTime: '10:00',
                meetingDescription: 'Weekly project synchronization meeting.',
                recordedNotesLink: '',  // New field
                videoRecordingLink: '', // New field
                meetingNotes: '',       // New field
            };
            setMeetingDetails(fetchedDetails);
        }

        fetchMeetingDetails();
    }, [meetingId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        setHasChanges(true);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        setHasChanges(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setHasChanges(false);
    };

    const onSave = () => {
        console.log('Saving meeting details:', meetingDetails);
        console.log('Attendees:', contacts);
        setIsEditing(false);
        setHasChanges(false);
    };

    // --------------------------------------- CONTACTS ------------------------------------------- //

    const initialContacts: Contact[] = [
        { company: 'Alpha', firstName: 'Alice', lastName: 'Johnson', phone: '123-456-7890', email: 'alice@alpha.com', contactType: 'Client', title: 'Manager', projects: ['Project A'] },
        { company: 'Alpha', firstName: 'Bob', lastName: 'Smith', phone: '234-567-8901', email: 'bob@alpha.com', contactType: 'Contractor', title: 'Engineer', projects: [] },
        { company: 'Beta', firstName: 'Charlie', lastName: 'Brown', phone: '345-678-9012', email: 'charlie@beta.com', contactType: 'Client', title: 'CEO', projects: ['Project C'] },
        { company: 'Beta', firstName: 'David', lastName: 'Wilson', phone: '456-789-0123', email: 'david@beta.com', contactType: 'Supplier', title: 'Supplier Manager', projects: [] },
        { company: 'Gamma', firstName: 'Eve', lastName: 'Black', phone: '567-890-1234', email: 'eve@gamma.com', contactType: 'Client', title: 'CFO', projects: ['Project D'] },
        { company: 'Gamma', firstName: 'Frank', lastName: 'White', phone: '678-901-2345', email: 'frank@gamma.com', contactType: 'Contractor', title: 'Site Supervisor', projects: [] },
        { company: 'Delta', firstName: 'Grace', lastName: 'Hall', phone: '789-012-3456', email: 'grace@delta.com', contactType: 'Client', title: 'HR Manager', projects: ['Project E'] },
        { company: 'Delta', firstName: 'Henry', lastName: 'Lopez', phone: '890-123-4567', email: 'henry@delta.com', contactType: 'Supplier', title: 'Logistics Coordinator', projects: [] },
        { company: 'Epsilon', firstName: 'Ivy', lastName: 'Morris', phone: '901-234-5678', email: 'ivy@epsilon.com', contactType: 'Client', title: 'Operations Manager', projects: ['Project F'] },
        { company: 'Epsilon', firstName: 'Jack', lastName: 'Norton', phone: '012-345-6789', email: 'jack@epsilon.com', contactType: 'Contractor', title: 'Project Manager', projects: [] },
        { company: 'Alpha', firstName: 'Karen', lastName: 'Price', phone: '123-456-7890', email: 'karen@alpha.com', contactType: 'Client', title: 'Product Manager', projects: ['Project G'] },
        { company: 'Beta', firstName: 'Liam', lastName: 'Doe', phone: '234-567-8901', email: 'liam@beta.com', contactType: 'Supplier', title: 'Quality Assurance', projects: [] },
        { company: 'Gamma', firstName: 'Mia', lastName: 'Stone', phone: '345-678-9012', email: 'mia@gamma.com', contactType: 'Client', title: 'Chief Marketing Officer', projects: ['Project H'] },
        { company: 'Delta', firstName: 'Noah', lastName: 'Lee', phone: '456-789-0123', email: 'noah@delta.com', contactType: 'Supplier', title: 'Supply Chain Analyst', projects: [] },
        { company: 'Epsilon', firstName: 'Olivia', lastName: 'Walker', phone: '567-890-1234', email: 'olivia@epsilon.com', contactType: 'Client', title: 'Chief Technology Officer', projects: ['Project I'] },
        { company: 'Alpha', firstName: 'Peter', lastName: 'Adams', phone: '678-901-2345', email: 'peter@alpha.com', contactType: 'Contractor', title: 'Electrical Engineer', projects: [] },
        { company: 'Beta', firstName: 'Quinn', lastName: 'Ray', phone: '789-012-3456', email: 'quinn@beta.com', contactType: 'Client', title: 'Investor Relations Manager', projects: ['Project J'] },
        { company: 'Gamma', firstName: 'Rachel', lastName: 'Smith', phone: '890-123-4567', email: 'rachel@gamma.com', contactType: 'Supplier', title: 'Procurement Officer', projects: [] },
        { company: 'Delta', firstName: 'Simon', lastName: 'Thomas', phone: '901-234-5678', email: 'simon@delta.com', contactType: 'Client', title: 'Legal Advisor', projects: ['Project K'] },
        { company: 'Epsilon', firstName: 'Tina', lastName: 'Young', phone: '012-345-6789', email: 'tina@epsilon.com', contactType: 'Contractor', title: 'Safety Officer', projects: [] }
    ];

    const handleAttendedSwitchChange = (email: string, value: boolean) => {
        setContacts((prevContacts) =>
            prevContacts.map((contact) =>
                contact.email === email ? { ...contact, attended: value } : contact
            )
        );
        setHasChanges(true);
    };

    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [attachments, setAttachments] = useState<FileWithPreview[]>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newContact, setNewContact] = useState<Contact>({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        contactType: '',
        title: '',
        phone: '',
        projects: [],
        attended: false,
    });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const sortedContacts = useMemo(() => {
        return [...contacts].sort((a, b) => a.firstName.localeCompare(b.firstName));
    }, [contacts]);

    const filteredContacts = useMemo(() => {
        if (!searchQuery) return sortedContacts;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return sortedContacts.filter(
            (contact) =>
                contact.firstName.toLowerCase().includes(lowerCaseQuery) ||
                contact.lastName.toLowerCase().includes(lowerCaseQuery) ||
                contact.email.toLowerCase().includes(lowerCaseQuery) ||
                (contact.company && contact.company.toLowerCase().includes(lowerCaseQuery))
        );
    }, [sortedContacts, searchQuery]);

    const handleAddButtonClick = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setErrorMessage('');
    };

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

        if (contacts.some((contact) => contact.email === newContact.email)) {
            setErrorMessage('This contact already exists.');
            return;
        }

        // Add the new contact to the list
        setContacts((prevContacts) => [...prevContacts, newContact]);

        // Reset the newContact state and close the dialog
        setNewContact({
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            contactType: '',
            title: '',
            phone: '',
            projects: [],
            attended: false,
        });
        setErrorMessage('');
        setIsDialogOpen(false);
        setHasChanges(true);
    };

    const isManualAddDisabled = newContact.firstName.trim() === '' || newContact.email.trim() === '';

    const navigate = useNavigate();

    interface Tab {
        name: string;
        key: string;
    }

    const tabs: Tab[] = [
        { name: 'All Meetings', key: 'All Meetings' },
        { name: 'View Meeting', key: 'View Meeting' },
    ];

    const handleTabClick = (tab: Tab) => {
        if (tab.key === 'All Meetings') {
            navigate('/project/:id/meetings');
        }
        setCurrentTab(tab.key);
    };

    const [currentTab, setCurrentTab] = useState<string>('View Meeting');

    return (
        <>
            <div ref={headerRef} className="px-4 pt-4 overflow-hidden">
                <PageHeader
                    pageTitle="Meetings"
                    pageDescription="A list of all meetings associated with this project."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="Meetings Training"
                />
                <MenuTabs tabs={tabs} currentTab={currentTab} handleTabClick={handleTabClick} />
            </div>

            {/* Scrollable Form Content */}
            <div className="overflow-auto p-4" style={{ height: mainContentHeight }}>
                <div className="relative w-full border border-gray-300 rounded-lg bg-white">
                    <div className="absolute top-4 right-4">
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                            >
                                <p className="text-md font-semibold">Edit Meeting</p>
                            </button>
                        )}
                    </div>
                    <div className="text-xl font-bold pt-2 pb-2 px-4 bg-white rounded-t-lg">
                        <h2>Meeting Details</h2>
                    </div>

                    <div className="grid grid-cols-8 gap-4 p-4">
                        {/* Meeting Title */}
                        <div className="col-span-full md:col-span-4">
                            <label className="block text-sm font-medium text-gray-900">Meeting Title</label>
                            <input
                                type="text"
                                name="meetingTitle"
                                value={meetingDetails.meetingTitle}
                                onChange={handleChange}
                                className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                    !isEditing ? 'bg-gray-100' : ''
                                }`}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Placeholder for spacing */}
                        <div className="hidden md:grid md:col-span-4"></div>

                        {/* Meeting Location */}
                        <div className="col-span-full md:col-span-4">
                            <label className="block text-sm font-medium text-gray-900">Meeting Location</label>
                            <input
                                type="text"
                                name="meetingLocation"
                                value={meetingDetails.meetingLocation}
                                onChange={handleChange}
                                className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                    !isEditing ? 'bg-gray-100' : ''
                                }`}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Video Conferencing Link */}
                        <div className="col-span-full md:col-span-4">
                            <label className="block text-sm font-medium text-gray-900">Video Conferencing Link</label>
                            <input
                                type="url"
                                name="videoLink"
                                value={meetingDetails.videoLink}
                                onChange={handleChange}
                                className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                    !isEditing ? 'bg-gray-100' : ''
                                }`}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Meeting Date */}
                        <div className="col-span-full md:col-span-2">
                            <label className="block text-sm font-medium text-gray-900">Meeting Date</label>
                            <input
                                type="date"
                                name="meetingDate"
                                value={meetingDetails.meetingDate}
                                onChange={handleChange}
                                className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                    !isEditing ? 'bg-gray-100' : ''
                                }`}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Time Zone */}
                        <div className="col-span-full md:col-span-2">
                            <label className="block text-sm font-medium text-gray-900">Time Zone</label>
                            <input
                                type="text"
                                name="timeZone"
                                value={meetingDetails.timeZone}
                                onChange={handleChange}
                                className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                    !isEditing ? 'bg-gray-100' : ''
                                }`}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Start Time */}
                        <div className="col-span-full md:col-span-2">
                            <label className="block text-sm font-medium text-gray-900">Start Time</label>
                            <input
                                type="time"
                                name="startTime"
                                value={meetingDetails.startTime}
                                onChange={handleChange}
                                className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                    !isEditing ? 'bg-gray-100' : ''
                                }`}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* End Time */}
                        <div className="col-span-full md:col-span-2">
                            <label className="block text-sm font-medium text-gray-900">End Time</label>
                            <input
                                type="time"
                                name="endTime"
                                value={meetingDetails.endTime}
                                onChange={handleChange}
                                className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                    !isEditing ? 'bg-gray-100' : ''
                                }`}
                                disabled={!isEditing}
                            />
                        </div>

                        {/* Meeting Description */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-900">Meeting Description</label>
                            <textarea
                                name="meetingDescription"
                                rows={5}
                                value={meetingDetails.meetingDescription}
                                onChange={handleChange}
                                placeholder="Enter meeting details..."
                                className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                    !isEditing ? 'bg-gray-100' : ''
                                }`}
                                disabled={!isEditing}
                            />
                        </div>


                        {/* Attachments Section */}
                        <div className="col-span-full border-t border-gray-200 my-4 pt-4">
                            <h2 className="text-xl font-bold pb-2">Attachments</h2>
                            {isEditing ? (
                                <FileUploader
                                    attachments={attachments}
                                    setAttachments={setAttachments}
                                    accept="image/*,application/pdf"
                                />
                            ) : (
                                <div className="mt-4">
                                    {attachments.length > 0 ? (
                                        <div className="mx-auto border-b border-gray-200 overflow-hidden">
                                            <ul className="divide-y divide-gray-200">
                                                {attachments.map((attachment, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between items-center p-2 hover:bg-gray-100 transition-colors duration-150"
                                                    >
                                                        <div className="flex items-center">
                                                            <span className="text-gray-500 mr-2">📄</span>
                                                            <span
                                                                className="text-sm font-medium text-gray-900 truncate">
                                                                {attachment.file.name}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                console.log(`Downloading ${attachment.file.name}`);
                                                            }}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-xs px-3 py-1 transition-colors duration-200"
                                                        >
                                                            View
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No attachments available.</p>
                                    )}
                                </div>
                            )}
                        </div>
                        {isEditing && (
                        <div className="col-span-full border-t my-4 pt-4">
                            <h2 className="text-xl font-bold pb-2">Invitee Management</h2>

                                <AddAttendeeForm contacts={contacts}/>

                        </div>
                        )}

                        {/* Attendee Management Section */}
                        <div className="col-span-full border-t border-gray-200 my-4 pt-4">
                            <h2 className="text-xl font-bold pb-2">Attendee Management</h2>

                            {/* Attendees Table */}
                            <div className="overflow-y-auto" style={{maxHeight: '300px'}}>
                                <table className="min-w-full rounded-corners">
                                    <thead className="bg-gray-100 sticky top-0 z-30">
                                    <tr>
                                        <th className="py-2 text-left text-sm font-semibold text-gray-900 px-4">
                                            Attended
                                        </th>
                                        <th className="py-2 text-left text-sm font-semibold text-gray-900 px-4 rounded-corners">
                                            Name
                                        </th>
                                        <th className="py-2 text-left text-sm font-semibold text-gray-900 px-4 hidden md:table-cell">
                                            Email
                                        </th>
                                        <th className="py-2 text-left text-sm font-semibold text-gray-900 px-4">
                                            Company
                                        </th>
                                        {isEditing && (
                                            <th className="py-2 text-left text-sm font-semibold text-gray-900 px-4">
                                                Actions
                                            </th>
                                        )}
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredContacts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-4 text-center text-gray-500">
                                                No contacts available.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredContacts.map((contact, index) => (
                                            <tr key={index}>
                                                <td className="py-2 text-left text-sm text-gray-900 px-4">
                                                    <Switch
                                                        checked={contact.attended}
                                                        onChange={(value) =>
                                                            handleAttendedSwitchChange(contact.email, value)
                                                        }
                                                        className={`group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                                                            contact.attended ? 'bg-indigo-600' : 'bg-gray-200'
                                                        } ${!isEditing && 'opacity-50 cursor-not-allowed'}`}
                                                        disabled={!isEditing}
                                                    >
                                                        <span className="sr-only">Toggle attendance</span>
                                                        <span
                                                            className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                                                contact.attended ? 'translate-x-5' : 'translate-x-0'
                                                            }`}
                                                        >
                                        {/* Icons */}
                                                            <span
                                                                aria-hidden="true"
                                                                className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in ${
                                                                    contact.attended ? 'opacity-0 duration-100 ease-out' : 'opacity-100'
                                                                }`}
                                                            >
                                            {/* Cross Icon when not attended */}
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 12 12"
                                                                    className="h-3 w-3 text-gray-400"
                                                                >
                                                <path
                                                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-100 ease-out ${
                                                contact.attended ? 'opacity-100' : 'opacity-0 duration-200 ease-in'
                                            }`}
                                        >
                                            {/* Checkmark Icon when attended */}
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 12 12"
                                                className="h-3 w-3 text-white"
                                            >
                                                <path
                                                    d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                />
                                            </svg>
                                        </span>
                                    </span>
                                                    </Switch>
                                                </td>
                                                <td className="py-2 text-left text-sm text-gray-900 px-4">
                                                    {contact.firstName} {contact.lastName}
                                                </td>
                                                <td className="py-2 text-left text-sm text-gray-900 px-4 hidden md:table-cell">
                                                    {contact.email}
                                                </td>
                                                <td className="py-2 text-left text-sm text-gray-900 px-4">
                                                    {contact.company}
                                                </td>
                                                {isEditing && (
                                                    <td className="py-2 text-left text-sm text-gray-900 px-4">
                                                        <button
                                                            onClick={() =>
                                                                setContacts((prev) =>
                                                                    prev.filter((_, idx) => idx !== index)
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md text-xs px-3 py-1 transition-colors duration-200"
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>




                            <div className="col-span-full border-t border-gray-200 my-4 pt-4">
                                <h2 className="text-xl font-bold pb-2">Meeting Record</h2>
                                <div className="grid grid-cols-8 gap-4 ">


                                {/* Meeting Location */}
                                <div className="col-span-full md:col-span-4">
                                    <label className="block text-sm font-medium text-gray-900">Recorded Notes Link:</label>
                                    <input
                                        type="text"
                                        name="  recordedNotesLink"
                                        value={meetingDetails.recordedNotesLink}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                            !isEditing ? 'bg-gray-100' : ''
                                        }`}
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Video Conferencing Link */}
                                <div className="col-span-full md:col-span-4">
                                    <label className="block text-sm font-medium text-gray-900">Video Recording Link:
                                        </label>
                                    <input
                                        type="url"
                                        name="videoRecordingLink"
                                        value={meetingDetails.videoRecordingLink}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full p-1.5 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                            !isEditing ? 'bg-gray-100' : ''
                                        }`}
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Meeting Description */}
                                    <div className="col-span-full">
                                        <label className="block text-sm font-medium text-gray-900">Meeting
                                            Notes </label>
                                        <textarea
                                            name="meetingNotes"  // Change name to match the state
                                            rows={5}
                                            value={meetingDetails.meetingNotes}  // Link to state field
                                            onChange={handleChange}
                                            placeholder="Enter meeting notes..."
                                            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 ${
                                                !isEditing ? 'bg-gray-100' : ''
                                            }`}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-span-full flex justify-end space-x-2 p-4">
                        <button
                            type="button"
                            // onClick={handleCancel}
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                            >
                                Cancel Changes
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Dialog for Adding a Contact */}
                    {isDialogOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            {/* Grey Overlay */}
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeDialog}></div>

                            {/* Dialog Content */}
                            <div className="bg-white rounded-md p-6 w-full max-w-xl relative z-10 m-4">
                                <h2 className="text-lg font-semibold mb-4">Add a New Contact</h2>
                                {errorMessage && (
                                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                                        {errorMessage}
                                    </div>
                                )}
                                <div className="grid grid-cols-8 gap-4 p-4">
                                    <div className="col-span-full md:col-span-4">
                                        <label className="block text-sm font-medium text-gray-900">First Name</label>
                                        <input
                                            type="text"
                                            value={newContact.firstName}
                                            onChange={handleInputChange('firstName')}
                                            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-300"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="col-span-full md:col-span-4">
                                        <label className="block text-sm font-medium text-gray-900">Last Name</label>
                                        <input
                                            type="text"
                                            value={newContact.lastName}
                                            onChange={handleInputChange('lastName')}
                                            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-300"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                    <div className="col-span-full md:col-span-4">
                                        <label className="block text-sm font-medium text-gray-900">Email</label>
                                        <input
                                            type="email"
                                            value={newContact.email}
                                            onChange={handleInputChange('email')}
                                            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-300"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="col-span-full md:col-span-4">
                                        <label className="block text-sm font-medium text-gray-900">Company</label>
                                        <input
                                            type="text"
                                            value={newContact.company}
                                            onChange={handleInputChange('company')}
                                            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-300"
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
                </div>
            </>
            );
            };

            export default ViewEditMeetingPage;
