import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Contact } from '../../../types/directory';
import PageHeader from '../../../common/components/PageHeader.component';
import ProgressBar from "../../../common/components/ProgressBar";

// Mock fetch function to simulate an API call for fetching contact details
const fetchContact = async (projectId: string, contactId: string): Promise<Contact> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                firstName: 'John',
                lastName: 'Doe',
                phone: '555-123-4567',
                email: 'johndoe@example.com',
                contactType: 'Client',
                title: 'Project Manager',
                projects: ['Project Alpha', 'Project Beta']
            });
        }, 1000);
    });
};

const ViewEditSubmittalPage = () => {
    const { projectId, contactId } = useParams<{ projectId: string; contactId: string }>(); // Extract project and contact IDs from the URL
    const [contact, setContact] = useState<Contact | null>(null);
    const [formData, setFormData] = useState<Contact>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        contactType: '',
        title: '',
    });
    const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
    const [isModified, setIsModified] = useState(false); // To track if form has been modified

    useEffect(() => {
        const getContactData = async () => {
            if (projectId && contactId) {
                const contactData = await fetchContact(projectId, contactId);
                setContact(contactData);
                setFormData(contactData); // Initialize form with fetched data
            }
        };

        getContactData();
    }, [projectId, contactId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setIsModified(true); // Enable the submit button when any change is made
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        console.log('Submitting form with data:', formData);
        setIsEditing(false); // Switch back to view mode after submitting
        setIsModified(false); // Reset modification status
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing); // Toggle between view and edit modes
        setIsModified(false); // Reset modified status when entering or exiting edit mode
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(contact || formData); // Reset the form to the initial contact data
        setIsModified(false);
    };

    return (
        <>
            <div className="ml-0 lg:ml-60 fixed top-12 inset-0 z-50 p-4">
                <PageHeader
                    pageTitle="Project Directory"
                    pageDescription="A directory of all contacts associated with the project."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="Project Directory Training"
                />
                <div className="font-bold py-2 text-sm sticky top-0 z-30 bg-white border-b flex items-center justify-between h-14">
                    <h2 className="text-lg font-semibold leading-7 text-gray-900">Contact Information</h2>

                    {!isEditing && (
                        <button
                            type="button"
                            onClick={toggleEditMode}
                            className="inline-flex border border-gray-300 bg-gray-200 hover:bg-yellow-300 hover:border-amber-50 text-gray-900 rounded-md px-4 py-2"
                        >
                            Edit
                        </button>
                    )}
                </div>
                <div className="bg-gray-900 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white w-full h-full mx-auto p-6 relative">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone Number</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>

                            <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                                <label htmlFor="contactType" className="block text-sm font-medium text-gray-900">Contact Type</label>
                                <select
                                    id="contactType"
                                    name="contactType"
                                    value={formData.contactType}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                >
                                    <option value="">Select...</option>
                                    <option value="internal">Internal Contact</option>
                                    <option value="external">Subcontractor Contact</option>
                                    <option value="client">Client Contact</option>
                                </select>
                            </div>

                            <div className={`${!isEditing ? 'border-b border-gray-300' : ''}`}>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                    className={`mt-1 py-1.5 block w-full ${
                                        isEditing
                                            ? 'border border-gray-300 rounded-md shadow-sm focus:border-blue-300'
                                            : 'border-none focus:ring-0'
                                    }`}
                                />
                            </div>
                        </div>


                        {/* Conditional footer for cancel/submit buttons */}
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
                                        type="submit"
                                        className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${
                                            isModified ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 opacity-50 cursor-not-allowed'
                                        }`}
                                        disabled={!isModified} // Disable submit button until form is modified
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewEditSubmittalPage;
