import React, { useState } from 'react';
import PageHeader from '../../../common/components/PageHeader.component';
import MeetingAttachments from '../components/MeetingAttachments.component';
import AddAttendeeForm from '../components/AddAttendeeForm';

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
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
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
    <div className="flex flex-col h-[85vh]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white">
        <PageHeader
          pageTitle="Meetings"
          pageDescription="A list of all meetings associated with this project"
          trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
          trainingTitle="Meeting Setup Training"
        />
        <div className="border-b border-gray-300 text-xl font-bold pt-2 pb-2 pl-2 bg-white">
          <h2>New Meeting</h2>
        </div>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-grow overflow-y-auto p-4 ">
        <form>
          <div className="grid grid-cols-6 gap-4 ">
            <div className="col-span-6 grid grid-cols-8 gap-4">
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
            </div>
          </div>
          <MeetingAttachments attachments={attachments} setAttachments={setAttachments} />
          <AddAttendeeForm contacts={contacts} />
        </form>
      </div>

      {/* Sticky Footer */}
      <StickyFooter onSave={onSave} hasChanges={hasChanges} />
    </div>
  );
};

export default NewMeetingForm;
