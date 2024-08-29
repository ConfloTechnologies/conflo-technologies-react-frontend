import React, { useState } from 'react';

function Waste() {
    const [wasteEntries, setWasteEntries] = useState([{
        time: '',
        material: '',
        disposedBy: '',
        methodOfDisposal: '',
        disposalLocation: '',
        approximateQuantity: '',
        comments: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...wasteEntries];
        newEntries[index][field] = value;
        setWasteEntries(newEntries);
    };

    const addWasteEntry = () => {
        setWasteEntries([...wasteEntries, {
            time: '',
            material: '',
            disposedBy: '',
            methodOfDisposal: '',
            disposalLocation: '',
            approximateQuantity: '',
            comments: ''
        }]);
    };

    const removeWasteEntry = (index) => {
        const newEntries = [...wasteEntries];
        newEntries.splice(index, 1);
        setWasteEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Waste</label>
            {wasteEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-7 bg-white gap-4 border border-gray-300 rounded-md p-4">
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
                        <label htmlFor={`material-${index}`} className="block text-sm font-medium text-gray-900">Material</label>
                        <input
                            id={`material-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.material}
                            onChange={e => handleChange(index, 'material', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`disposedBy-${index}`} className="block text-sm font-medium text-gray-900">Disposed By</label>
                        <input
                            id={`disposedBy-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.disposedBy}
                            onChange={e => handleChange(index, 'disposedBy', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`methodOfDisposal-${index}`} className="block text-sm font-medium text-gray-900">Method of Disposal</label>
                        <input
                            id={`methodOfDisposal-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.methodOfDisposal}
                            onChange={e => handleChange(index, 'methodOfDisposal', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`disposalLocation-${index}`} className="block text-sm font-medium text-gray-900">Disposal Location</label>
                        <input
                            id={`disposalLocation-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.disposalLocation}
                            onChange={e => handleChange(index, 'disposalLocation', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`approximateQuantity-${index}`} className="block text-sm font-medium text-gray-900">Approximate Quantity</label>
                        <input
                            id={`approximateQuantity-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.approximateQuantity}
                            onChange={e => handleChange(index, 'approximateQuantity', e.target.value)}
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
                    <div className="flex items-center justify-center mt-6 sm:col-span-7">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeWasteEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === wasteEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addWasteEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Waste Entries
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Waste;
