import React, { useState } from 'react';
import { Add } from '@mui/icons-material'; // Ensure you are using Material Icons correctly

interface FileWithPreview {
  file: File;
  src: string;
}

interface MeetingAttachmentsProps {
  attachments: FileWithPreview[];
  setAttachments: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}

const MeetingAttachments: React.FC<MeetingAttachmentsProps> = ({ attachments, setAttachments }) => {
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

  return (
    <div className="py-4">
      <label className="block text-sm font-medium text-gray-900">Attachments</label>

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
        <label htmlFor="file-upload" className="cursor-pointer bg-gray-300 hover:bg-green-600 text-gray-800 hover:text-white text-md font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center">
          <Add className="mr-2" /> Upload Files
        </label>
      </div>

      {attachments.length > 0 && (
        <div className="mx-auto border-b border-gray-200 overflow-hidden mt-4">
          <ul className="divide-y divide-gray-200">
            {attachments.map((attachment, index) => (
              <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 transition-colors duration-150">
                <div className="flex items-center">
                  {/* Show a preview for images or a file icon for non-images */}
                  {attachment.file.type.startsWith('image/') ? (
                    <img src={attachment.src} alt={attachment.file.name} className="w-8 h-8 object-cover rounded mr-2" />
                  ) : (
                    <span className="text-gray-500 mr-2">📄</span>
                  )}
                  <span className="text-sm font-medium text-gray-900 truncate">{attachment.file.name}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFile(index);
                  }}
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
  );
};

export default MeetingAttachments;
