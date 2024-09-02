import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Manpower({ companies = [], locations = [] }) {
    const [manpowerEntries, setManpowerEntries] = useState([]);  // Start with an empty array
    const manpowerRefs = useRef([]);

    const handleManpowerChange = (index, field, value) => {
        setManpowerEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addManpowerEntry = () => {
        setManpowerEntries(current => [
            ...current,
            { company: '', workers: '', hours: '', totalHours: '', location: '', comments: '', added: true }
        ]);
    };

    const removeManpowerEntry = (index) => {
        setManpowerEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (manpowerEntries.length > 0 && manpowerEntries[manpowerEntries.length - 1].added) {
            const element = manpowerRefs.current[manpowerEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [manpowerEntries]);

    return (
        <>
            {manpowerEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (manpowerRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeManpowerEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <label>Manpower Entry #{index + 1}</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {['company', 'workers', 'hours', 'location', 'comments'].map(field => (
                            <div key={field} className={`md:col-span-${field === 'comments' ? '4' : '1'}`}>
                                <label htmlFor={`${field}-${index}`} className="block text-sm font-medium text-gray-900">
                                    {field[0].toUpperCase() + field.slice(1)}  {/* Formatting label text */}
                                </label>
                                {['company', 'location'].includes(field) ? (
                                    <select
                                        id={`${field}-${index}`}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                        value={entry[field]}
                                        onChange={e => handleManpowerChange(index, field, e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        {(field === 'company' ? companies : locations).map(option => (
                                            <option key={option.id} value={option.id}>{option.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={`${field}-${index}`}
                                        type={field === 'hours' || field === 'workers' ? 'number' : 'text'}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        value={entry[field]}
                                        onChange={e => handleManpowerChange(index, field, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Button Row */}
            <div className="flex justify-start py-2 border-y">
                <button
                    type="button"
                    onClick={addManpowerEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Manpower Management </h2>
                </div>
            </div>
        </>
    );
}

export default Manpower;
