import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../../common/components/PageHeader.component';
import MenuTabs from "../../../common/components/MenuTabs.component";
import MeetingAttachments from '../components/MeetingAttachments.component';
import AddAttendeeForm from '../components/AddAttendeeForm';
import { useDynamicContentHeight } from "../../../common/utils/useDynamicContentHeightSettingOne";
import {Add} from "@mui/icons-material";
import {MdAdd, MdPerson} from "react-icons/md";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";


interface FileWithPreview {
    file: File;
    src: string;
}

interface Attendee {
    name: string;
    email: string;
}

const ViewEditMeetingPage: React.FC = () => {
    const { meetingId } = useParams<{ meetingId: string }>();
    const [meetingDetails, setMeetingDetails] = useState({
        meetingTitle: '',
        meetingDate: '',
        timeZone: '',
        meetingLocation: '',
        videoLink: '',
        startTime: '',
        endTime: '',
        meetingDescription: '',
    });
    // const [attachments, setAttachments] = useState<FileWithPreview[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const [mainContentHeight, setMainContentHeight] = useState('');

    useDynamicContentHeight(headerRef, setMainContentHeight);

    useEffect(() => {
        async function fetchMeetingDetails() {
            // Simulated fetch call
            const fetchedDetails = {
                meetingTitle: 'Project Sync',
                meetingDate: '2023-10-03',
                timeZone: 'PST',
                meetingLocation: 'Conference Room 1',
                videoLink: 'https://zoom.us/j/123456789',
                startTime: '09:00',
                endTime: '10:00',
                meetingDescription: 'Weekly project synchronization meeting.',
            };
            setMeetingDetails(fetchedDetails);
        }

        fetchMeetingDetails();
    }, [meetingId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMeetingDetails(prevDetails => ({
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
        setIsEditing(false);
        setHasChanges(false);
    };





    // --------------------------------------- ATTACHMENTS ------------------------------------------- //

    const [dragging, setDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files).map(file => ({
                file,
                src: URL.createObjectURL(file)
            }));
            setAttachments(prevAttachments => [...prevAttachments, ...files]);
        }
    };

    const handleRemoveFile = (index: number) => {
        URL.revokeObjectURL(attachments[index].src);
        setAttachments(prevAttachments => prevAttachments.filter((_, i) => i !== index));
    };

    // Drag-and-drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).map(file => ({
            file,
            src: URL.createObjectURL(file)
        }));
        setAttachments(prevAttachments => [...prevAttachments, ...files]);
        setDragging(false);
    };

    // --------------------------------------- ATTENDEES ------------------------------------------- //

    const [attendees, setAttendees] = useState<Attendee[]>([]);
    // const [contacts, setContacts] = useState<Attendee[]>([]);
    // Mock data for attachments
    const initialAttachments = [
        {
            file: new File(["sample"], "document.pdf", { type: "application/pdf" }),
            src: "URL.createObjectURL(new Blob())"  // Simulated URL for the blob
        },
        {
            file: new File(["another"], "image.png", { type: "image/png" }),
            src: "URL.createObjectURL(new Blob())"  // Simulated URL for the blob
        }
    ];
    const [attachments, setAttachments] = useState<FileWithPreview[]>(initialAttachments);

    // Mock data for contacts
    const initialContacts = [
        { name: "Jane Doe", email: "jane@example.com" },
        { name: "John Smith", email: "john@example.com" }
    ];
    const [contacts, setContacts] = useState<Attendee[]>(initialContacts);

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





    interface Tab {
        name: string;
        key: string;
    }

    const tabs: Tab[] = [
        { name: 'All Meetings', key: 'Meetings' },
        { name: 'View Meeting', key: 'View Meeting' },
    ];

    const handleTabClick = (tab: Tab) => {
        setCurrentTab(tab.key);
    };

    const [currentTab, setCurrentTab] = useState<string>('View Meeting');


    return (
        <>
            <div ref={headerRef} className="px-4 pt-4 overflow-hidden ">
                <PageHeader
                    pageTitle="Meetings"
                    pageDescription="A list of all meetings associated with this project."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="Meetings Training"
                />
                <MenuTabs
                    tabs={tabs}
                    currentTab={currentTab}
                    handleTabClick={handleTabClick}
                />

                {/*<div className="font-bold py-2 text-sm border-b bg-white flex items-center justify-between h-14">*/}
                {/*    /!*    <h2 className="text-lg font-semibold leading-7 text-gray-900"></h2>*!/*/}
                {/*    /!*{!isEditing && (*!/*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        onClick={toggleEditMode}*/}
                {/*        className="inline-flex border border-gray-300 bg-gray-200 hover:bg-yellow-300 hover:border-amber-50 text-gray-900 rounded-md px-4 py-2"*/}
                {/*    >*/}
                {/*        Edit*/}
                {/*    </button>*/}
                {/*    /!*)}*!/*/}
                {/*</div>*/}
                <div className="flex items-center justify-end space-x-2 sm:space-x-4 max-w-full py-2">
                    <div className="flex-grow sm:flex-shrink-0 max-w-xl"></div>

                    <button
                        type="button"
                        onClick={toggleEditMode}
                        className="relative inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                        <p className="hidden sm:block text-md font-semibold ml-1">edit</p>
                    </button>
                </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="overflow-auto " style={{height: mainContentHeight}}>
                <div className="grid grid-cols-6 gap-4 p-4">
                    <div className="col-span-6 grid grid-cols-8 gap-4 p-2 border rounded-lg border-gray-300">
                        <div className="col-span-full border-b border-gray-200 my-4">
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">
                                    Meeting Information
                                </h2>
                            </div>

                            <div className="col-span-full md:col-span-4">
                                <label className="block text-sm font-medium text-gray-900">Meeting Title</label>
                                <input
                                    type="text"
                                    name="meetingTitle"
                                    value={meetingDetails.meetingTitle}
                                    onChange={handleChange}
                                    className={`mt-1  block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className="hidden md:grid md:col-span-4">{/* placeholder */}</div>

                            <div className="col-span-full md:col-span-4">
                                <label className="block text-sm font-medium text-gray-900">Meeting Location</label>
                                <input
                                    type="text"
                                    name="meetingLocation"
                                    value={meetingDetails.meetingLocation}
                                    onChange={handleChange}
                                    className={`mt-1  block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className="col-span-full md:col-span-4">
                                <label className="block text-sm font-medium text-gray-900">Video Conferencing
                                    Link</label>
                                <input
                                    type="text"
                                    name="videoLink"
                                    value={meetingDetails.videoLink}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className="col-span-full md:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">Meeting Date</label>
                                <input
                                    type="date"
                                    name="meetingDate"
                                    value={meetingDetails.meetingDate}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className="col-span-full md:col-span-2 ">
                                <label className="block text-sm font-medium text-gray-900">Time Zone</label>
                                <input
                                    type="text"
                                    name="timeZone"
                                    value={meetingDetails.timeZone}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className="col-span-full md:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">Start Time</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={meetingDetails.startTime}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className="col-span-full md:col-span-2">
                                <label className="block text-sm font-medium text-gray-900">End Time</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={meetingDetails.endTime}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-900">Meeting
                                    Description</label>
                                <textarea
                                    name="meetingDescription"
                                    rows={5}
                                    value={meetingDetails.meetingDescription}
                                    onChange={handleChange}
                                    placeholder="Enter meeting details..."
                                    className={`mt-1 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="col-span-6 grid grid-cols-8 gap-4 p-2 border rounded-lg border-gray-300">
                            <div className="col-span-full">
                                <div className="col-span-full border-b border-gray-200 my-4">
                                    <h2 className="text-lg font-semibold leading-7 text-gray-900">
                                        Attachments
                                    </h2>
                                </div>
                                {isEditing && (
                                    <div
                                        className={`flex flex-col items-center border-2 border-dashed ${dragging ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md mt-2 max-w-xl p-4 text-center justify-center`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            id="file-upload"
                                            className="hidden"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        <p className="mb-2 text-sm text-gray-600 text-center">
                                            {attachments.length > 0 ? `${attachments.length} file${attachments.length > 1 ? 's' : ''} selected` : 'Drag & drop files or click to upload'}
                                        </p>
                                        <label htmlFor="file-upload"
                                               className="cursor-pointer bg-gray-300 hover:bg-green-600 text-gray-800 hover:text-white text-md font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center">
                                            <Add className="mr-2"/> Upload Files
                                        </label>
                                    </div>
                                )}
                                {attachments.length > 0 && (
                                    <div className="mx-auto border-b border-gray-200 overflow-hidden mt-4">
                                        <ul className="divide-y divide-gray-200">
                                            {attachments.map((attachment, index) => (
                                                <li key={index}
                                                    className="flex justify-between items-center p-2 hover:bg-gray-100 transition-colors duration-150">
                                                    <div className="flex items-center">
                                                        {/* Show a preview for images or a file icon for non-images */}
                                                        {attachment.file.type.startsWith('image/') ? (
                                                            <img src={attachment.src} alt={attachment.file.name}
                                                                 className="w-8 h-8 object-cover rounded mr-2"/>
                                                        ) : (
                                                            <span className="text-gray-500 mr-2">📄</span>
                                                        )}
                                                        <span
                                                            className="text-sm font-medium text-gray-900 truncate">{attachment.file.name}</span>
                                                    </div>
                                                    {isEditing && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleRemoveFile(index);
                                                            }}
                                                            className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-xs px-3 py-1 transition-colors duration-200"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-6 grid grid-cols-8 gap-4 p-2 border rounded-lg border-gray-300">
                            <div className="col-span-full">
                                <div className="col-span-full border-b border-gray-200 my-4">
                                    <h2 className="text-lg font-semibold leading-7 text-gray-900">
                                        Attendees
                                    </h2>
                                </div>

                                {isEditing && (
                                    <>
                                        <label className="block text-sm font-medium text-gray-900">
                                            Select a pre-existing contact:
                                        </label>

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
                                                ${isDropdownDisabled ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-green-500 hover:bg-green-700 text-white'}`}
                                                aria-label="Add selected attendee"
                                            >
                                                <MdAdd size={24} className="inline mr-2"/> Add
                                            </button>
                                        </div>


                                        <label className="block text-sm font-medium text-gray-900">Or enter
                                            manually:</label>
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
                                                <MdAdd size={24} className="inline mr-2"/> Add
                                            </button>
                                        </div>
                                    </>
                                )}

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
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <input type="checkbox"
                                                                   className="form-checkbox h-4 w-4 mx-2 text-blue-600 rounded-sm"
                                                                // checked
                                                            />
                                                        </label>

                                                        {/*<MdPerson className="text-gray-500 w-8 h-8 mr-2"/>*/}
                                                        <span
                                                            className="text-sm font-medium text-gray-900 truncate">{attendee.name} - {attendee.email}</span>
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
                            </div>
                        </div>


                        <div className="col-span-6 grid grid-cols-8 gap-4 p-2 border rounded-lg border-gray-300">
                            <div className="col-span-full border-b border-gray-200 my-4">
                                <h2 className="text-lg font-semibold leading-7 text-gray-900">
                                    Meeting Record
                                </h2>
                            </div>

                            <div className="col-span-full md:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Meeting Recording
                                    Link </label>
                                <input
                                    type="text"
                                    name="meetingLocation"
                                    value={meetingDetails.meetingLocation}
                                    onChange={handleChange}
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className="col-span-full md:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">AI Notes (link) </label>
                                <input
                                    type="text"
                                    name="videoLink"
                                    value={meetingDetails.videoLink}
                                    onChange={handleChange}
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>


                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-900">Recorded Meeting Notes
                                </label>
                                <textarea
                                    name="meetingDescription"
                                    rows={5}
                                    value={meetingDetails.meetingDescription}
                                    onChange={handleChange}
                                    placeholder="Enter meeting details..."
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

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
                                type="button"
                                className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${
                                    hasChanges ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 opacity-50 cursor-not-allowed'
                                }`}
                                onClick={onSave}
                                disabled={!hasChanges}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </>
            );
            };

            export default ViewEditMeetingPage;
