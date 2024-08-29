import React, { useState } from 'react';

function PhoneCalls() {
    const [callEntries, setCallEntries] = useState([{
        direction: '',
        start: '',
        end: '',
        comments: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...callEntries];
        newEntries[index][field] = value;
        setCallEntries(newEntries);
    };

    const addCallEntry = () => {
        setCallEntries([...callEntries, { direction: '', start: '', end: '', comments: '' }]);
    };

    const removeCallEntry = (index) => {
        const newEntries = [...callEntries];
        newEntries.splice(index, 1);
        setCallEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Phone Calls</label>
            {callEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-4 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    <div className="sm:col-span-1">
                        <label htmlFor={`direction-${index}`} className="block text-sm font-medium text-gray-900">To/From</label>
                        <select
                            id={`direction-${index}`}
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.direction}
                            onChange={e => handleChange(index, 'direction', e.target.value)}
                        >
                            <option value="">Select Direction</option>
                            <option value="to">To</option>
                            <option value="from">From</option>
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`start-${index}`} className="block text-sm font-medium text-gray-900">Start Time</label>
                        <input
                            id={`start-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.start}
                            onChange={e => handleChange(index, 'start', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`end-${index}`} className="block text-sm font-medium text-gray-900">End Time</label>
                        <input
                            id={`end-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.end}
                            onChange={e => handleChange(index, 'end', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">Comments</label>
                        <textarea
                            id={`comments-${index}`}
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.comments}
                            onChange={e => handleChange(index, 'comments', e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-6 sm:col-span-4">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeCallEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === callEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addCallEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Calls
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PhoneCalls;
