import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function PhoneCalls() {
    const [callEntries, setCallEntries] = useState([]);  // Start with an empty array
    const callRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setCallEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addCallEntry = () => {
        setCallEntries(current => [
            ...current,
            { direction: '', start: '', end: '', comments: '' }
        ]);
    };

    const removeCallEntry = (index) => {
        setCallEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (callEntries.length > 0) {
            const element = callRefs.current[callEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [callEntries]);

    return (
        <>
            {callEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (callRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeCallEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <label>Phone Call Entry #{index + 1}</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select
                            id={`direction-${index}`}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                            value={entry.direction}
                            onChange={e => handleChange(index, 'direction', e.target.value)}
                        >
                            <option value="">Select Direction</option>
                            <option value="to">To</option>
                            <option value="from">From</option>
                        </select>
                        <input
                            type="datetime-local"
                            id={`start-${index}`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.start}
                            onChange={e => handleChange(index, 'start', e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            id={`end-${index}`}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.end}
                            onChange={e => handleChange(index, 'end', e.target.value)}
                        />
                        <textarea
                            id={`comments-${index}`}
                            className="md:col-span-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.comments}
                            onChange={e => handleChange(index, 'comments', e.target.value)}
                        />
                    </div>
                </div>
            ))}

            {/* Button Row */}
            <div className="flex justify-start py-2 border-y">
                <button
                    type="button"
                    onClick={addCallEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} /> 
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Phone Calls Management </h2>
                </div>
            </div>
        </>
    );
}

export default PhoneCalls;
