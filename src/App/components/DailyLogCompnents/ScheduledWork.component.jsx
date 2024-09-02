import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function ScheduledWork() {
    const [workEntries, setWorkEntries] = useState([]);  // Start with an empty array
    const workRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setWorkEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const handleCheckboxChange = (index, field) => {
        setWorkEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: !entry[field] } : entry
        ));
    };

    const addWorkEntry = () => {
        setWorkEntries(current => [
            ...current,
            { resource: '', scheduledTasks: '', showed: false, reimbursed: false, workers: 0, hours: 0, rate: 0, comments: '' }
        ]);
    };

    const removeWorkEntry = (index) => {
        setWorkEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (workEntries.length > 0) {
            const element = workRefs.current[workEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [workEntries]);

    return (
        <>
            {workEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (workRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeWorkEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                        <input
                            id={`resource-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.resource}
                            onChange={e => handleChange(index, 'resource', e.target.value)}
                            placeholder="Resource"
                        />
                        <input
                            id={`scheduledTasks-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.scheduledTasks}
                            onChange={e => handleChange(index, 'scheduledTasks', e.target.value)}
                            placeholder="Scheduled Tasks"
                        />
                        <div className="flex items-center">
                            <label htmlFor={`showed-${index}`} className="text-sm font-medium text-gray-900 mr-2">Showed?</label>
                            <input
                                id={`showed-${index}`}
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                checked={entry.showed}
                                onChange={() => handleCheckboxChange(index, 'showed')}
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor={`reimbursed-${index}`} className="text-sm font-medium text-gray-900 mr-2">Reimbursed?</label>
                            <input
                                id={`reimbursed-${index}`}
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                checked={entry.reimbursed}
                                onChange={() => handleCheckboxChange(index, 'reimbursed')}
                            />
                        </div>
                        <input
                            id={`workers-${index}`}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.workers}
                            onChange={e => handleChange(index, 'workers', parseInt(e.target.value, 10))}
                            min="0"
                            placeholder="Workers"
                        />
                        <input
                            id={`hours-${index}`}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.hours}
                            onChange={e => handleChange(index, 'hours', parseFloat(e.target.value))}
                            min="0"
                            placeholder="Hours"
                        />
                        <input
                            id={`rate-${index}`}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.rate}
                            onChange={e => handleChange(index, 'rate', parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                            placeholder="Rate"
                        />
                        <textarea
                            id={`comments-${index}`}
                            className="md:col-span-8 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.comments}
                            onChange={e => handleChange(index, 'comments', e.target.value)}
                            placeholder="Comments"
                        />
                    </div>
                </div>
            ))}

            <div className="flex justify-start py-2 border-y">
                <button
                    type="button"
                    onClick={addWorkEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} /> 
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Scheduled Work Management </h2>
                </div>
            </div>
        </>
    );
}

export default ScheduledWork;
