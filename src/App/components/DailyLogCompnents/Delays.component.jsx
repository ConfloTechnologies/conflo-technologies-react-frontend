import React, { useState } from 'react';

function Delays() {
    const [delayEntries, setDelayEntries] = useState([{
        delayType: '',
        startTime: '',
        endTime: '',
        duration: '',
        location: '',
        comments: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...delayEntries];
        newEntries[index][field] = value;
        setDelayEntries(newEntries);

        // Automatically calculate and update the duration when start or end time changes
        if (field === 'startTime' || field === 'endTime') {
            const startTime = new Date(newEntries[index].startTime);
            const endTime = new Date(newEntries[index].endTime);
            const duration = (endTime - startTime) / 3600000; // Convert milliseconds to hours
            newEntries[index].duration = duration > 0 ? duration.toFixed(2) : '0'; // Update duration if positive
        }
    };

    const addDelayEntry = () => {
        setDelayEntries([...delayEntries, {
            delayType: '',
            startTime: '',
            endTime: '',
            duration: '',
            location: '',
            comments: ''
        }]);
    };

    const removeDelayEntry = (index) => {
        const newEntries = [...delayEntries];
        newEntries.splice(index, 1);
        setDelayEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Delays</label>
            {delayEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-8 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    <div className="sm:col-span-1">
                        <label htmlFor={`delayType-${index}`} className="block text-sm font-medium text-gray-900">Delay Type</label>
                        <input
                            id={`delayType-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-600 sm:text-sm"
                            value={entry.delayType}
                            onChange={e => handleChange(index, 'delayType', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor={`startTime-${index}`} className="block text-sm font-medium text-gray-900">Start Time</label>
                        <input
                            id={`startTime-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-600 sm:text-sm"
                            value={entry.startTime}
                            onChange={e => handleChange(index, 'startTime', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor={`endTime-${index}`} className="block text-sm font-medium text-gray-900">End Time</label>
                        <input
                            id={`endTime-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-600 sm:text-sm"
                            value={entry.endTime}
                            onChange={e => handleChange(index, 'endTime', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`duration-${index}`} className="block text-sm font-medium text-gray-900">Duration (hours)</label>
                        <input
                            id={`duration-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-600 sm:text-sm"
                            value={entry.duration}
                            readOnly
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">Location</label>
                        <input
                            id={`location-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-600 sm:text-sm"
                            value={entry.location}
                            onChange={e => handleChange(index, 'location', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">Comments</label>
                        <textarea
                            id={`comments-${index}`}
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-600 sm:text-sm"
                            value={entry.comments}
                            onChange={e => handleChange(index, 'comments', e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4 sm:col-span-8">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeDelayEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === delayEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addDelayEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Delays
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Delays;
