import React, { useRef, useState } from 'react';
import PageHeader from '../../../common/components/PageHeader.component';
import { useDynamicContentHeight } from "../../../common/utils/useDynamicContentHeightSettingOne";
import FileUpload from '../../../common/components/FileUpload.component';

interface Photo {
        src: string;
        file: File;
    }

    const NewSubmittalForm: React.FC = () => {
        const headerRef = useRef<HTMLDivElement>(null);
        const [mainContentHeight, setMainContentHeight] = useState('');
        const [hasChanges, setHasChanges] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [photos, setPhotos] = useState<Photo[]>([]); // Adding state for photos
        useDynamicContentHeight(headerRef, setMainContentHeight);

        const [submittalDetails, setSubmittalDetails] = useState({
            title: '',
            specSection: '',
            numberRevisions: '',
            submittalType: '',
            submittalPackage: '',
            responsibleContractor: '',
            receivedFrom: '',
            submittalManager: '',
            status: '',
            dateReceived: '',
            issueDate: '',
            location: '',
            distributionList: '',
            leadTime: '',
            requiredOnSiteDate: '',
            description: '',
            photos: []
        });

        const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = event.target;
            setSubmittalDetails(prevDetails => ({
                ...prevDetails,
                [name]: value,
            }));
            setHasChanges(true);
        };

        const onSave = () => {
            console.log('Form saved:', submittalDetails);
            setHasChanges(false);
        };

        const handleCancel = () => {
            setIsEditing(false);
            setHasChanges(false);
        };
    return (
        <>
            <div ref={headerRef} className="overflow-hidden p-4">
                <PageHeader
                    pageTitle="Submittals"
                    pageDescription="A list of all submittals associated with this project."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="Submittals Training"
                />
            </div>
            <div className="overflow-auto px-4" style={{height: mainContentHeight}}>


                <div className="border border-gray-300 rounded-lg">

                    <div className="border-b border-gray-300 text-xl font-bold pt-2 pb-2 px-4 bg-white rounded-t-lg">
                        <h2>New Submittal Form</h2>
                    </div>

                    <div className="grid grid-cols-6 gap-4 p-4">
                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={submittalDetails.title}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Spec Section</label>
                            <select
                                name="specSection"
                                value={submittalDetails.specSection}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select a Section</option>
                                <option value="Structural">Structural</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Plumbing">Plumbing</option>
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Number and Revisions</label>
                            <input
                                type="text"
                                name="numberRevisions"
                                value={submittalDetails.numberRevisions}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Submittal Type</label>
                            <select
                                name="submittalType"
                                value={submittalDetails.submittalType}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Type</option>
                                <option value="Initial">Initial</option>
                                <option value="Revised">Revised</option>
                                <option value="Final">Final</option>
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Submittal Package</label>
                            <select
                                name="submittalPackage"
                                value={submittalDetails.submittalPackage}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Package</option>
                                <option value="Basic">Basic</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Responsible
                                Contractor</label>
                            <input
                                type="text"
                                name="responsibleContractor"
                                value={submittalDetails.responsibleContractor}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Received From</label>
                            <select
                                name="receivedFrom"
                                value={submittalDetails.receivedFrom}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Source</option>
                                <option value="Vendor A">Vendor A</option>
                                <option value="Vendor B">Vendor B</option>
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Submittal Manager</label>
                            <input
                                type="text"
                                name="submittalManager"
                                value={submittalDetails.submittalManager}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Status</label>
                            <select
                                name="status"
                                value={submittalDetails.status}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Date Received</label>
                            <input
                                type="date"
                                name="dateReceived"
                                value={submittalDetails.dateReceived}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Issue Date</label>
                            <input
                                type="date"
                                name="issueDate"
                                value={submittalDetails.issueDate}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={submittalDetails.location}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Distribution List</label>
                            <input
                                type="text"
                                name="distributionList"
                                value={submittalDetails.distributionList}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Lead time</label>
                            <input
                                type="date"
                                name="leadTime"
                                value={submittalDetails.leadTime}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">Required on site date</label>
                            <input
                                type="date"
                                name="requiredOnSiteDate"
                                value={submittalDetails.requiredOnSiteDate}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="col-span-6">
                            <label className="block text-sm font-medium text-gray-900">Description</label>
                            <textarea
                                name="description"
                                value={submittalDetails.description}
                                onChange={handleChange}
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter submittal details..."
                            />
                        </div>

                        <div className="col-span-6">
                            <FileUpload photos={photos} setPhotos={setPhotos}/>
                        </div>
                    </div>

                </div>
            </div>


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
        </>
    );
};



export default NewSubmittalForm;

