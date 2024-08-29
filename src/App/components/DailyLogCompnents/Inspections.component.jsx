import React, { useState } from 'react';

function Inspections() {
    const [inspectionEntries, setInspectionEntries] = useState([{
        start: '',
        end: '',
        type: '',
        entity: '',
        inspectorName: '',
        location: '',
        area: '',
        comments: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...inspectionEntries];
        newEntries[index][field] = value;
        setInspectionEntries(newEntries);
    };

    const addInspectionEntry = () => {
        setInspectionEntries([...inspectionEntries, {
            start: '',
            end: '',
            type: '',
            entity: '',
            inspectorName: '',
            location: '',
            area: '',
            comments: ''
        }]);
    };

    const removeInspectionEntry = (index) => {
        const newEntries = [...inspectionEntries];
        newEntries.splice(index, 1);
        setInspectionEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Inspections</label>
            {inspectionEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-8 bg-white gap-4 border border-gray-300 rounded-md p-4">
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
                        <label htmlFor={`type-${index}`} className="block text-sm font-medium text-gray-900">Inspection Type</label>
                        <input
                            id={`type-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.type}
                            onChange={e => handleChange(index, 'type', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`entity-${index}`} className="block text-sm font-medium text-gray-900">Inspection Entity</label>
                        <input
                            id={`entity-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.entity}
                            onChange={e => handleChange(index, 'entity', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`inspectorName-${index}`} className="block text-sm font-medium text-gray-900">Inspector Name</label>
                        <input
                            id={`inspectorName-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.inspectorName}
                            onChange={e => handleChange(index, 'inspectorName', e.target.value)}
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
                        <label htmlFor={`area-${index}`} className="block text-sm font-medium text-gray-900">Area</label>
                        <input
                            id={`area-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.area}
                            onChange={e => handleChange(index, 'area', e.target.value)}
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
                                onClick={() => removeInspectionEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === inspectionEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addInspectionEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Inspections
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Inspections;
