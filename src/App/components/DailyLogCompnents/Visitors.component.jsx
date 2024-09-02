import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Visitors() {
    const [visitorEntries, setVisitorEntries] = useState([]);  // Start with an empty array
    const visitorRefs = useRef([]);

    // Define visitor fields statically as they do not require dynamic sourcing like companies or locations
    const visitorFields = [
        { name: 'name', type: 'text', placeholder: 'Name' },
        { name: 'start', type: 'datetime-local', placeholder: 'Start Time' },
        { name: 'end', type: 'datetime-local', placeholder: 'End Time' },
        { name: 'comments', type: 'textarea', placeholder: 'Comments' }
    ];

    const handleChange = (index, field, value) => {
        setVisitorEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addVisitorEntry = () => {
        const newEntry = visitorFields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {});
        setVisitorEntries(current => [...current, newEntry]);
    };

    const removeVisitorEntry = (index) => {
        setVisitorEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (visitorEntries.length > 0) {
            const element = visitorRefs.current[visitorEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [visitorEntries]);

    return (
        <>
            {visitorEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (visitorRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeVisitorEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <label>Visitor Entry #{index + 1}</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {visitorFields.map(field => (
                            <div key={field.name} className={`md:col-span-${field.name === 'comments' ? '4' : '1'}`}>
                                <label htmlFor={`${field.name}-${index}`} className="block text-sm font-medium text-gray-900">
                                    {field.placeholder}
                                </label>
                                {field.type !== 'textarea' ? (
                                    <input
                                        id={`${field.name}-${index}`}
                                        type={field.type}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        value={entry[field.name]}
                                        onChange={e => handleChange(index, field.name, e.target.value)}
                                        placeholder={field.placeholder}
                                    />
                                ) : (
                                    <textarea
                                        id={`${field.name}-${index}`}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        value={entry[field.name]}
                                        onChange={e => handleChange(index, field.name, e.target.value)}
                                        placeholder={field.placeholder}
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
                    onClick={addVisitorEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Visitor Management </h2>
                </div>
            </div>
        </>
    );
}

export default Visitors;
