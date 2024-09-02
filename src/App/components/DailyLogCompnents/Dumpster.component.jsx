import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Dumpster() {
    const [dumpsterEntries, setDumpsterEntries] = useState([]);  // Start with an empty array
    const dumpsterRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setDumpsterEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addDumpsterEntry = () => {
        setDumpsterEntries(current => [
            ...current,
            { company: '', numberDelivered: 0, numberRemoved: 0, comments: '' }
        ]);
    };

    const removeDumpsterEntry = (index) => {
        setDumpsterEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (dumpsterEntries.length > 0) {
            const element = dumpsterRefs.current[dumpsterEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [dumpsterEntries]);

    return (
        <>
            {dumpsterEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (dumpsterRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeDumpsterEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            id={`company-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.company}
                            onChange={e => handleChange(index, 'company', e.target.value)}
                            placeholder="Company"
                        />
                        <input
                            id={`numberDelivered-${index}`}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.numberDelivered}
                            onChange={e => handleChange(index, 'numberDelivered', parseInt(e.target.value, 10))}
                            placeholder="# Delivered"
                            min="0"
                        />
                        <input
                            id={`numberRemoved-${index}`}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.numberRemoved}
                            onChange={e => handleChange(index, 'numberRemoved', parseInt(e.target.value, 10))}
                            placeholder="# Removed"
                            min="0"
                        />
                        <textarea
                            id={`comments-${index}`}
                            className="md:col-span-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                    onClick={addDumpsterEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Dumpster Management </h2>
                </div>
            </div>
        </>
    );
}

export default Dumpster;
