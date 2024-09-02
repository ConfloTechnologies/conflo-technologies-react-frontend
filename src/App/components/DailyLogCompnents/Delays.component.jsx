import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Delays() {
    const [delayEntries, setDelayEntries] = useState([]);  // Start with an empty array
    const delayRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setDelayEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));

        // Automatically calculate and update the duration when start or end time changes
        if (field === 'startTime' || field === 'endTime') {
            const startTime = new Date(delayEntries[index].startTime);
            const endTime = new Date(delayEntries[index].endTime);
            const duration = (endTime - startTime) / 3600000; // Convert milliseconds to hours
            delayEntries[index].duration = duration > 0 ? duration.toFixed(2) : '0'; // Update duration if positive
        }
    };

    const addDelayEntry = () => {
        setDelayEntries(current => [
            ...current,
            { delayType: '', startTime: '', endTime: '', duration: '', location: '', comments: '' }
        ]);
    };

    const removeDelayEntry = (index) => {
        setDelayEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (delayEntries.length > 0) {
            const element = delayRefs.current[delayEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [delayEntries]);

    return (
        <>
            {delayEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (delayRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeDelayEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                        <input
                            id={`delayType-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.delayType}
                            onChange={e => handleChange(index, 'delayType', e.target.value)}
                            placeholder="Delay Type"
                        />
                        <input
                            id={`startTime-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.startTime}
                            onChange={e => handleChange(index, 'startTime', e.target.value)}
                            placeholder="Start Time"
                        />
                        <input
                            id={`endTime-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.endTime}
                            onChange={e => handleChange(index, 'endTime', e.target.value)}
                            placeholder="End Time"
                        />
                        <input
                            id={`duration-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.duration}
                            readOnly
                            placeholder="Duration (hours)"
                        />
                        <input
                            id={`location-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.location}
                            onChange={e => handleChange(index, 'location', e.target.value)}
                            placeholder="Location"
                        />
                        <textarea
                            id={`comments-${index}`}
                            className="md:col-span-8 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                    onClick={addDelayEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Delay Management </h2>
                </div>
            </div>
        </>
    );
}

export default Delays;
