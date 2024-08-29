import React, { useState } from 'react';

function Notes() {
    const [entries, setEntries] = useState([{
        issue: '',
        location: '',
        comment: '',
        attachment: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const addEntry = () => {
        setEntries([...entries, { issue: '', location: '', comment: '', attachment: '' }]);
    };

    const removeEntry = (index) => {
        const newEntries = [...entries];
        newEntries.splice(index, 1);
        setEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Project Notes</label>
            {entries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-4 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    <div className="sm:col-span-1">
                        <label htmlFor={`issue-${index}`} className="block text-sm font-medium text-gray-900">Issue</label>
                        <input
                            id={`issue-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.issue}
                            onChange={e => handleChange(index, 'issue', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">Location</label>
                        <input
                            id={`location-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.location}
                            onChange={e => handleChange(index, 'location', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`comment-${index}`} className="block text-sm font-medium text-gray-900">Comment</label>
                        <input
                            id={`comment-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.comment}
                            onChange={e => handleChange(index, 'comment', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`attachment-${index}`} className="block text-sm font-medium text-gray-900">Attachment</label>
                        <input
                            id={`attachment-${index}`}
                            type="file"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            onChange={e => handleChange(index, 'attachment', e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-6 sm:col-span-4">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === entries.length - 1 && (
                            <button
                                type="button"
                                onClick={addEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Notes
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Notes;
