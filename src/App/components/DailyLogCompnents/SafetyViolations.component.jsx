import React, { useState } from 'react';

function SafetyViolations() {
    const [violationEntries, setViolationEntries] = useState([{
        time: '',
        subject: '',
        safetyNotice: '',
        issuesTo: '',
        complianceDue: '',
        comments: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...violationEntries];
        newEntries[index][field] = value;
        setViolationEntries(newEntries);
    };

    const addViolationEntry = () => {
        setViolationEntries([...violationEntries, {
            time: '',
            subject: '',
            safetyNotice: '',
            issuesTo: '',
            complianceDue: '',
            comments: ''
        }]);
    };

    const removeViolationEntry = (index) => {
        const newEntries = [...violationEntries];
        newEntries.splice(index, 1);
        setViolationEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Safety Violations</label>
            {violationEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-6 bg-white gap-4 border border-gray-300 rounded-md p-4">
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
                        <label htmlFor={`subject-${index}`} className="block text-sm font-medium text-gray-900">Subject</label>
                        <input
                            id={`subject-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.subject}
                            onChange={e => handleChange(index, 'subject', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`safetyNotice-${index}`} className="block text-sm font-medium text-gray-900">Safety Notice</label>
                        <input
                            id={`safetyNotice-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.safetyNotice}
                            onChange={e => handleChange(index, 'safetyNotice', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`issuesTo-${index}`} className="block text-sm font-medium text-gray-900">Issues To</label>
                        <input
                            id={`issuesTo-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.issuesTo}
                            onChange={e => handleChange(index, 'issuesTo', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`complianceDue-${index}`} className="block text-sm font-medium text-gray-900">Compliance Due</label>
                        <input
                            id={`complianceDue-${index}`}
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.complianceDue}
                            onChange={e => handleChange(index, 'complianceDue', e.target.value)}
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
                    <div className="flex items-center justify-center mt-6 sm:col-span-6">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeViolationEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === violationEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addViolationEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Violations
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SafetyViolations;
