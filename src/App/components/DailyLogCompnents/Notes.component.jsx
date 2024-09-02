import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Notes() {
    const [entries, setEntries] = useState([]);  // Start with an empty array
    const entryRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addEntry = () => {
        setEntries(current => [
            ...current,
            { issue: '', location: '', comment: '', attachment: '' }
        ]);
    };

    const removeEntry = (index) => {
        setEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (entries.length > 0) {
            const element = entryRefs.current[entries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [entries]);

    return (
        <>
            {entries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (entryRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            id={`issue-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.issue}
                            onChange={e => handleChange(index, 'issue', e.target.value)}
                            placeholder="Issue"
                        />
                        <input
                            id={`location-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.location}
                            onChange={e => handleChange(index, 'location', e.target.value)}
                            placeholder="Location"
                        />
                        <input
                            id={`comment-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.comment}
                            onChange={e => handleChange(index, 'comment', e.target.value)}
                            placeholder="Comment"
                        />
                        <input
                            id={`attachment-${index}`}
                            type="file"
                            className="mt-1 block w-full text-gray-900 py-1.5 rounded-md border-gray-300 shadow-sm focus:ring-indigo-600"
                            onChange={e => handleChange(index, 'attachment', e.target.files[0])} // Update to handle file inputs properly
                        />
                    </div>
                </div>
            ))}

            <div className="flex justify-start py-2 border-y">
                <button
                    type="button"
                    onClick={addEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} /> 
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Project Notes Management </h2>
                </div>
            </div>
        </>
    );
}

export default Notes;
