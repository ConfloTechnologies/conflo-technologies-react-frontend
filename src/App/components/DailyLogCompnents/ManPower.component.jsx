import React, { useState } from 'react';

function Manpower({ companies = [] }) {  // Default to an empty array if not provided
    const [manpowerEntries, setManpowerEntries] = useState([
        { company: '', workers: '', hours: '', totalHours: '', location: '', comments: '' }
    ]);

    const handleManpowerChange = (index, field, value) => {
        const newEntries = [...manpowerEntries];
        newEntries[index][field] = value;
        if (field === 'hours' || field === 'workers') {
            newEntries[index].totalHours = calculateTotalHours(newEntries[index].workers, newEntries[index].hours);
        }
        setManpowerEntries(newEntries);
    };

    const calculateTotalHours = (workers, hours) => {
        return Number(workers) * Number(hours);
    };

    const addManpowerEntry = () => {
        setManpowerEntries([...manpowerEntries, { company: '', workers: '', hours: '', totalHours: '', location: '', comments: '' }]);
    };

    const removeManpowerEntry = (index) => {
        const newEntries = [...manpowerEntries];
        newEntries.splice(index, 1);
        setManpowerEntries(newEntries);
    };

    if (!companies.length) {
        return <p>Loading companies or no companies available...</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 border border-2 border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Manpower </label>
            {manpowerEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-5 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    <div className="sm:col-span-1">
                        <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-900">Company</label>
                        <select
                            id={`company-${index}`}
                            name={`company-${index}`}
                            value={entry.company}
                            onChange={e => handleManpowerChange(index, 'company', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Select Company</option>
                            {companies.map(company => (
                                <option key={company.id} value={company.id}>{company.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`workers-${index}`} className="block text-sm font-medium text-gray-900">Workers</label>
                        <input
                            id={`workers-${index}`}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.workers}
                            onChange={e => handleManpowerChange(index, 'workers', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`hours-${index}`} className="block text-sm font-medium text-gray-900">Hours</label>
                        <input
                            id={`hours-${index}`}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.hours}
                            onChange={e => handleManpowerChange(index, 'hours', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`totalHours-${index}`} className="block text-sm font-medium text-gray-900">Total Hours</label>
                        <input
                            id={`totalHours-${index}`}
                            type="text"
                            disabled
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.totalHours}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">Location/Area</label>
                        <input
                            id={`location-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.location}
                            onChange={e => handleManpowerChange(index, 'location', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">Comments</label>
                        <textarea
                            id={`comments-${index}`}
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.comments}
                            onChange={e => handleManpowerChange(index, 'comments', e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-6 sm:col-span-1">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeManpowerEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === manpowerEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addManpowerEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Manpower
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

}

export default Manpower;
