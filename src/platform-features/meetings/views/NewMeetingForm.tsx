import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../../../common/components/PageHeader.component';
import MeetingAttachments from '../../../common/components/FileUploader.component';
import AddAttendeeForm from '../components/AddAttendeeForm';
import FileUploader from '../../../common/components/FileUploader.component';
import { useDynamicContentHeight } from '../../../common/utils/useDynamicContentHeightSettingOne';

export interface Contact {
  company: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactType: string;
  title: string;
  projects?: string[];
}

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
  const [contacts, setContacts] = useState<Contact[]>([]);
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

  useEffect(() => {
    // Mock fetch function to simulate API call
    const fetchContacts = async () => {
      // Simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockContacts = [
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

      setContacts(mockContacts);
    };

    fetchContacts();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setMeetingDetails((prevDetails) => ({
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

        <div className="overflow-auto p-4 " style={{ height: mainContentHeight }}>
          <div className="border border-gray-300 rounded-lg">
            <div className=" text-xl font-bold pt-2 pb-2 px-4 bg-white rounded-t-lg">
              <h2>New Meeting Form</h2>
            </div>

            <div className="grid grid-cols-8 gap-4 p-4">


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
                <FileUploader attachments={attachments} setAttachments={setAttachments} />
              </div>

              <div className="col-span-full">
                <AddAttendeeForm contacts={contacts}/>
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