import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Inspections() {
    const [inspectionEntries, setInspectionEntries] = useState([]);  // Start with an empty array
    const inspectionRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setInspectionEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addInspectionEntry = () => {
        setInspectionEntries(current => [
            ...current,
            { start: '', end: '', type: '', entity: '', inspectorName: '', location: '', area: '', comments: '' }
        ]);
    };

    const removeInspectionEntry = (index) => {
        setInspectionEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (inspectionEntries.length > 0) {
            const element = inspectionRefs.current[inspectionEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [inspectionEntries]);

    return (
        <>
            {inspectionEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (inspectionRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeInspectionEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <label>Inspection Entry #{index + 1}</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.start}
                            onChange={e => handleChange(index, 'start', e.target.value)}
                            placeholder="Start Time"
                        />
                        <input
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.end}
                            onChange={e => handleChange(index, 'end', e.target.value)}
                            placeholder="End Time"
                        />
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.type}
                            onChange={e => handleChange(index, 'type', e.target.value)}
                            placeholder="Inspection Type"
                        />
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.entity}
                            onChange={e => handleChange(index, 'entity', e.target.value)}
                            placeholder="Inspection Entity"
                        />
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.inspectorName}
                            onChange={e => handleChange(index, 'inspectorName', e.target.value)}
                            placeholder="Inspector Name"
                        />
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.location}
                            onChange={e => handleChange(index, 'location', e.target.value)}
                            placeholder="Location"
                        />
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.area}
                            onChange={e => handleChange(index, 'area', e.target.value)}
                            placeholder="Area"
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
                    onClick={addInspectionEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Inspection Management </h2>
                </div>
            </div>
        </>
    );
}

export default Inspections;
