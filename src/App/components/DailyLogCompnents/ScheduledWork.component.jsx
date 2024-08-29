import React, { useState } from 'react';

function ScheduledWork() {
    const [workEntries, setWorkEntries] = useState([{
        resource: '',
        scheduledTasks: '',
        showed: false,
        reimbursed: false,
        workers: 0,
        hours: 0,
        rate: 0,
        comments: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...workEntries];
        newEntries[index][field] = value;
        setWorkEntries(newEntries);
    };

    const handleCheckboxChange = (index, field) => {
        const newEntries = [...workEntries];
        newEntries[index][field] = !newEntries[index][field];
        setWorkEntries(newEntries);
    };

    const addWorkEntry = () => {
        setWorkEntries([...workEntries, {
            resource: '',
            scheduledTasks: '',
            showed: false,
            reimbursed: false,
            workers: 0,
            hours: 0,
            rate: 0,
            comments: ''
        }]);
    };

    const removeWorkEntry = (index) => {
        const newEntries = [...workEntries];
        newEntries.splice(index, 1);
        setWorkEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Scheduled Work</label>
            {workEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-8 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    <div className="sm:col-span-1">
                        <label htmlFor={`resource-${index}`} className="block text-sm font-medium text-gray-900">Resource</label>
                        <input
                            id={`resource-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.resource}
                            onChange={e => handleChange(index, 'resource', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`scheduledTasks-${index}`} className="block text-sm font-medium text-gray-900">Scheduled Tasks</label>
                        <input
                            id={`scheduledTasks-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.scheduledTasks}
                            onChange={e => handleChange(index, 'scheduledTasks', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1 flex items-center">
                        <label htmlFor={`showed-${index}`} className="block text-sm font-medium text-gray-900 mr-2">Showed?</label>
                        <input
                            id={`showed-${index}`}
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            checked={entry.showed}
                            onChange={() => handleCheckboxChange(index, 'showed')}
                        />
                    </div>
                    <div className="sm:col-span-1 flex items-center">
                        <label htmlFor={`reimbursed-${index}`} className="block text-sm font-medium text-gray-900 mr-2">Reimbursed?</label>
                        <input
                            id={`reimbursed-${index}`}
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            checked={entry.reimbursed}
                            onChange={() => handleCheckboxChange(index, 'reimbursed')}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`workers-${index}`} className="block text-sm font-medium text-gray-900">Workers</label>
                        <input
                            id={`workers-${index}`}
                            type="number"
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.workers}
                            onChange={e => handleChange(index, 'workers', parseInt(e.target.value, 10))}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`hours-${index}`} className="block text-sm font-medium text-gray-900">Hours</label>
                        <input
                            id={`hours-${index}`}
                            type="number"
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.hours}
                            onChange={e => handleChange(index, 'hours', parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`rate-${index}`} className="block text-sm font-medium text-gray-900">Rate</label>
                        <input
                            id={`rate-${index}`}
                            type="number"
                            min="0"
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.rate}
                            onChange={e => handleChange(index, 'rate', parseFloat(e.target.value))}
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
                    <div className="flex items-center justify-center mt-6 sm:col-span-8">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeWorkEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === workEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addWorkEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Work Entries
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ScheduledWork;
