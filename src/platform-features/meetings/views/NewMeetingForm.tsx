import React, { useState, useRef } from 'react';
import PageHeader from '../../../common/components/PageHeader.component';
import MeetingAttachments from '../../../common/components/FileUploader.component';
import AddAttendeeForm from '../components/AddAttendeeForm';
import FileUploader from '../../../common/components/FileUploader.component';
import {useDynamicContentHeight} from "../../../common/utils/useDynamicContentHeightSettingOne";

interface FileWithPreview {
  file: File;
  src: string;
}

interface StickyFooterProps {
  onSave: () => void;
  hasChanges: boolean;
}

function StickyFooter({ onSave, hasChanges }: StickyFooterProps) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 border-t shadow-xl p-2 flex justify-end">
        <div className="flex space-x-3">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white focus-visible:outline-offset-0"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={hasChanges ? onSave : undefined}
            disabled={!hasChanges}
            className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
              hasChanges ? 'bg-green-500 text-white hover:bg-green-700' : 'bg-white text-gray-600 opacity-50 cursor-not-allowed'
            }`}
          >
            Create Meeting
          </button>
        </div>
      </div>
    );
  }
  

const NewMeetingForm: React.FC = () => {
  const contacts = [
    { name: 'Alice Johnson', email: 'alice@example.com', companyName: 'TechCorp' },
    { name: 'Bob Smith', email: 'bob@example.com', companyName: 'HealthPlus' },
    { name: 'Carol Williams', email: 'carol@example.com', companyName: 'TechCorp' },
    { name: 'David Brown', email: 'david@example.com', companyName: 'FinanceWorks' },
    { name: 'Eve Davis', email: 'eve@example.com', companyName: 'HealthPlus' },
    { name: 'Frank Miller', email: 'frank@example.com', companyName: 'RetailHub' },
    { name: 'Grace Wilson', email: 'grace@example.com', companyName: 'TechCorp' },
    { name: 'Henry Moore', email: 'henry@example.com', companyName: 'FinanceWorks' },
    { name: 'Ivy Taylor', email: 'ivy@example.com', companyName: 'RetailHub' },
    { name: 'Jack Anderson', email: 'jack@example.com', companyName: 'HealthPlus' },
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
  });

  const [attachments, setAttachments] = useState<FileWithPreview[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [mainContentHeight, setMainContentHeight] = useState('');
  const paginationHeight = 0;
  useDynamicContentHeight(headerRef, setMainContentHeight, paginationHeight);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setMeetingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    setHasChanges(true); // Mark as changed when any form value changes
  };

  const onSave = () => {
    // Implement your save logic here
    console.log('Form saved:', meetingDetails, attachments);
    setHasChanges(false); // Reset hasChanges after saving
  };

  return (
      <>
        <div ref={headerRef} className="overflow-hidden p-4">
          <PageHeader
              pageTitle="Meetings"
              pageDescription="A list of all meetings associated with this project."
              trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
              trainingTitle="Meetings Training"
          />
        </div>


        <div className="overflow-auto p-4 " style={{height: mainContentHeight}}>


          <div className="border border-gray-300 rounded-lg">

            <div className=" text-xl font-bold pt-2 pb-2 px-4 bg-white rounded-t-lg">
              <h2>New Meeting Form</h2>
            </div>

            <div className="grid grid-cols-8 gap-4 p-4">
              {/* Task Title Field */}

              <div className="col-span-full md:col-span-4">
                <label className="block text-sm font-medium text-gray-900">Meeting Title</label>
                <input
                    type="text"
                    name="meetingTitle"
                    className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={meetingDetails.meetingTitle}
                    onChange={handleChange}
                />
              </div>
              <div className="hidden md:grid md:col-span-4">{/* placeholder */}</div>

              <div className="col-span-full md:col-span-4">
              <label className="block text-sm font-medium text-gray-900">Meeting Location</label>
                <input
                    type="text"
                    name="meetingLocation"
                    className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={meetingDetails.meetingLocation}
                    onChange={handleChange}
                />
              </div>

              <div className="col-span-full md:col-span-4">
                <label className="block text-sm font-medium text-gray-900">Video Conferencing Link</label>
                <input
                    type="text"
                    name="videoLink"
                    className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={meetingDetails.videoLink}
                    onChange={handleChange}
                />
              </div>

              <div className="col-span-full md:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Meeting Date</label>
                <input
                    type="date"
                    name="meetingDate"
                    className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={meetingDetails.meetingDate}
                    onChange={handleChange}
                />
              </div>

              <div className="col-span-full md:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Time Zone</label>
                <input
                    type="text"
                    name="timeZone"
                    className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={meetingDetails.timeZone}
                    onChange={handleChange}
                />
              </div>

              <div className="col-span-full md:col-span-2">
                <label className="block text-sm font-medium text-gray-900">Start Time</label>
                <input
                    type="time"
                    name="startTime"
                    className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={meetingDetails.startTime}
                    onChange={handleChange}
                />
              </div>

              <div className="col-span-full md:col-span-2">
                <label className="block text-sm font-medium text-gray-900">End Time</label>
                <input
                    type="time"
                    name="endTime"
                    className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={meetingDetails.endTime}
                    onChange={handleChange}
                />
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-900">Meeting Description</label>
                <textarea
                    name="meetingDescription"
                    rows={5}
                    className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={meetingDetails.meetingDescription}
                    onChange={handleChange}
                    placeholder="Enter meeting details..."
                />
              </div>
              <div className="col-span-full">
                <FileUploader
                    attachments={attachments}
                    setAttachments={setAttachments}
                />
              </div>

              <div className="col-span-full">
                <AddAttendeeForm contacts={contacts}/>
                {/* Submit Button */}
              </div>
                <div className=" col-span-full flex justify-end space-x-2">
                  <button
                      type="button"
                      // onClick={handleCancel}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                  >
                   Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
        );

        };

export default NewMeetingForm;
