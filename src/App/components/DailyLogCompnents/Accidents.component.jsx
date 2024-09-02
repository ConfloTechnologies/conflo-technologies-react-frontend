import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Accidents() {
    const [accidentEntries, setAccidentEntries] = useState([]);  // Start with an empty array
    const accidentRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setAccidentEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addAccidentEntry = () => {
        setAccidentEntries(current => [
            ...current,
            { time: '', partyInvolved: '', companyInvolved: '', comments: '' }
        ]);
    };

    const removeAccidentEntry = (index) => {
        setAccidentEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (accidentEntries.length > 0) {
            const element = accidentRefs.current[accidentEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [accidentEntries]);

    return (
        <>
            {accidentEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (accidentRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeAccidentEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.time}
                            onChange={e => handleChange(index, 'time', e.target.value)}
                            placeholder="Time"
                        />
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.partyInvolved}
                            onChange={e => handleChange(index, 'partyInvolved', e.target.value)}
                            placeholder="Party Involved"
                        />
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.companyInvolved}
                            onChange={e => handleChange(index, 'companyInvolved', e.target.value)}
                            placeholder="Company Involved"
                        />
                        <textarea
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
                    onClick={addAccidentEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Accident Management </h2>
                </div>
            </div>
        </>
    );
}

export default Accidents;
