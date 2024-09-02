import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Equipment() {
    const [equipmentEntries, setEquipmentEntries] = useState([]);  // Start with an empty array
    const equipmentRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setEquipmentEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const handleCheckboxChange = (index, field) => {
        setEquipmentEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: !entry[field] } : entry
        ));
    };

    const addEquipmentEntry = () => {
        setEquipmentEntries(current => [
            ...current,
            { name: '', hoursOperating: '', hoursIdle: '', costCode: '', location: '', inspected: false, comments: '' }
        ]);
    };

    const removeEquipmentEntry = (index) => {
        const element = equipmentRefs.current[index];
        element.classList.add('fade-out');

        // Wait for the fade-out to complete before shrinking and hiding the element
        setTimeout(() => {
            element.classList.add('shrink');
        }, 400); // Start the shrink after the fade-out

        // Remove from state after both animations are done
        setTimeout(() => {
            setEquipmentEntries(current => current.filter((_, idx) => idx !== index));
        }, 900); // Match this with the combined CSS transition duration
    };

    useEffect(() => {
        // Scroll the last element into view when a new entry is added
        if (equipmentEntries.length > 0) {
            equipmentRefs.current[equipmentEntries.length - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [equipmentEntries]);

    return (
        <>
            {equipmentEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (equipmentRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeEquipmentEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <label>Equipment Entry #{index + 1}</label>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <input
                            type="text"
                            value={entry.name}
                            onChange={e => handleChange(index, 'name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Equipment Name"
                        />
                        <input
                            type="number"
                            value={entry.hoursOperating}
                            onChange={e => handleChange(index, 'hoursOperating', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Hours Operating"
                        />
                        <input
                            type="number"
                            value={entry.hoursIdle}
                            onChange={e => handleChange(index, 'hoursIdle', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Hours Idle"
                        />
                        <input
                            type="text"
                            value={entry.costCode}
                            onChange={e => handleChange(index, 'costCode', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Cost Code"
                        />
                        <input
                            type="text"
                            value={entry.location}
                            onChange={e => handleChange(index, 'location', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Location"
                        />
                        <div className="flex items-center mt-1">
                            <input
                                id={`inspected-${index}`}
                                type="checkbox"
                                checked={entry.inspected}
                                onChange={() => handleCheckboxChange(index, 'inspected')}
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <label htmlFor={`inspected-${index}`} className="ml-2 text-sm font-medium text-gray-900">Inspected</label>
                        </div>
                        <textarea
                            value={entry.comments}
                            onChange={e => handleChange(index, 'comments', e.target.value)}
                            className="md:col-span-6 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Comments"
                        />
                    </div>
                </div>
            ))}

            {/* Button Row */}
            <div className="flex justify-start py-2 border-y">
                <button
                    type="button"
                    onClick={addEquipmentEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Equipment </h2>
                </div>
            </div>
        </>
    );
}

export default Equipment;
