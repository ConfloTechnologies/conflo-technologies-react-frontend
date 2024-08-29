import React, { useState } from 'react';

function Accidents() {
    const [accidentEntries, setAccidentEntries] = useState([{
        time: '',
        partyInvolved: '',
        companyInvolved: '',
        comments: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...accidentEntries];
        newEntries[index][field] = value;
        setAccidentEntries(newEntries);
    };

    const addAccidentEntry = () => {
        setAccidentEntries([...accidentEntries, {
            time: '',
            partyInvolved: '',
            companyInvolved: '',
            comments: ''
        }]);
    };

    const removeAccidentEntry = (index) => {
        const newEntries = [...accidentEntries];
        newEntries.splice(index, 1);
        setAccidentEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Accidents</label>
            {accidentEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-4 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    <div className="sm:col-span-1">
                        <label htmlFor={`time-${index}`} className="block text-sm font-medium text-gray-900">Time</label>
                        <input
                            id={`time-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.time}
                            onChange={e => handleChange(index, 'time', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`partyInvolved-${index}`} className="block text-sm font-medium text-gray-900">Party Involved</label>
                        <input
                            id={`partyInvolved-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.partyInvolved}
                            onChange={e => handleChange(index, 'partyInvolved', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`companyInvolved-${index}`} className="block text-sm font-medium text-gray-900">Company Involved</label>
                        <input
                            id={`companyInvolved-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.companyInvolved}
                            onChange={e => handleChange(index, 'companyInvolved', e.target.value)}
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
                                onClick={() => removeAccidentEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === accidentEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addAccidentEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Accidents
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accidents;
