import React, { useState } from 'react';

function Dumpster() {
    const [dumpsterEntries, setDumpsterEntries] = useState([{
        company: '',
        numberDelivered: 0,
        numberRemoved: 0,
        comments: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...dumpsterEntries];
        newEntries[index][field] = value;
        setDumpsterEntries(newEntries);
    };

    const addDumpsterEntry = () => {
        setDumpsterEntries([...dumpsterEntries, {
            company: '',
            numberDelivered: 0,
            numberRemoved: 0,
            comments: ''
        }]);
    };

    const removeDumpsterEntry = (index) => {
        const newEntries = [...dumpsterEntries];
        newEntries.splice(index, 1);
        setDumpsterEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Dumpsters</label>
            {dumpsterEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-4 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    <div className="sm:col-span-1">
                        <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-900">Company</label>
                        <input
                            id={`company-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.company}
                            onChange={e => handleChange(index, 'company', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`numberDelivered-${index}`} className="block text-sm font-medium text-gray-900"># Delivered</label>
                        <input
                            id={`numberDelivered-${index}`}
                            type="number"
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.numberDelivered}
                            onChange={e => handleChange(index, 'numberDelivered', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`numberRemoved-${index}`} className="block text-sm font-medium text-gray-900"># Removed</label>
                        <input
                            id={`numberRemoved-${index}`}
                            type="number"
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.numberRemoved}
                            onChange={e => handleChange(index, 'numberRemoved', e.target.value)}
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
                                onClick={() => removeDumpsterEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === dumpsterEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addDumpsterEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Dumpsters
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dumpster;
