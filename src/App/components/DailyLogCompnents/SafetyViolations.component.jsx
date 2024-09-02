import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function SafetyViolations() {
    const [violationEntries, setViolationEntries] = useState([]);  // Start with an empty array
    const violationRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setViolationEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addViolationEntry = () => {
        setViolationEntries(current => [
            ...current,
            { time: '', subject: '', safetyNotice: '', issuesTo: '', complianceDue: '', comments: '' }
        ]);
    };

    const removeViolationEntry = (index) => {
        setViolationEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (violationEntries.length > 0) {
            const element = violationRefs.current[violationEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [violationEntries]);

    return (
        <>
            {violationEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (violationRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeViolationEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        {[
                            { label: 'Time', id: 'time', type: 'datetime-local' },
                            { label: 'Subject', id: 'subject', type: 'text' },
                            { label: 'Safety Notice', id: 'safetyNotice', type: 'text' },
                            { label: 'Issues To', id: 'issuesTo', type: 'text' },
                            { label: 'Compliance Due', id: 'complianceDue', type: 'date' },
                            { label: 'Comments', id: 'comments', type: 'textarea' }
                        ].map(field => (
                            <div key={field.id} className={`md:col-span-1 ${field.id === 'comments' ? 'md:col-span-6' : ''}`}>
                                <label htmlFor={`${field.id}-${index}`} className="block text-sm font-medium text-gray-900">{field.label}</label>
                                {field.type !== 'textarea' ? (
                                    <input
                                        id={`${field.id}-${index}`}
                                        type={field.type}
                                        className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                        value={entry[field.id]}
                                        onChange={e => handleChange(index, field.id, e.target.value)}
                                    />
                                ) : (
                                    <textarea
                                        id={`${field.id}-${index}`}
                                        className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                        value={entry[field.id]}
                                        onChange={e => handleChange(index, field.id, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex justify-start py-2 border-y">
                <button
                    type="button"
                    onClick={addViolationEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Safety Violations Management </h2>
                </div>
            </div>
        </>
    );
}

export default SafetyViolations;
