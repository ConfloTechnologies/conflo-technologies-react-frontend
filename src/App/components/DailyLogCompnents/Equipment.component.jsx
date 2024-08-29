import React, { useState, useRef, useEffect } from 'react';

function Equipment() {
    const [equipmentEntries, setEquipmentEntries] = useState([{
        name: '',
        hoursOperating: '',
        hoursIdle: '',
        costCode: '',
        location: '',
        inspected: false,
        comments: '',
    }]);

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

        // Delay the addition of the expand class to allow the element to render first
        setTimeout(() => {
            const index = equipmentEntries.length;
            const element = equipmentRefs.current[index - 1]; // Adjusting to the new index
            if (element) {
                element.classList.add('expand');
            }
        }, 50); // Small delay to ensure the element is added to the DOM
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
        if (equipmentEntries.length > 1) {
            equipmentRefs.current[equipmentEntries.length - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [equipmentEntries]);

    return (
        <>
            <div className='mt-5'>
                <h2>Equipment Management</h2>
            </div>
            <style>{`
                .fade-out {
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: opacity 0.9s ease, transform 0.9s ease, background-color 0.5s ease;
                }
                .shrink {
                    height: 0;
                    padding-top: 0;
                    padding-bottom: 0;
                    margin-bottom: 0 !important;
                    overflow: hidden;
                    transition: height 0.5s ease, padding 0.5s ease, margin 0.5s ease, background-color 0.5s ease;
                }
                .expand {
                    opacity: 1;
                    transform: translateY(0);
                    height: auto;
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                    margin-bottom: 2rem;
                    
                    transition: height 0.5s ease, padding 0.5s ease, margin 0.5s ease, background-color 0.5s ease;
                }
                .initial-state {
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: opacity 0.5s ease, transform 0.5s ease, background-color 0.5s ease;
                }
            `}</style>
            <div className="grid grid-cols-1 gap-4">
                {equipmentEntries.map((entry, index) => (
                    <div
                        key={index}
                        ref={el => (equipmentRefs.current[index] = el)}
                        className={`border border-1 rounded-md gap-4 p-4 my-8 shadow-sm transform transition-transform duration-500 ease-in-out ${
                            index === equipmentEntries.length - 1
                            ? 'bg-blue-50 border-gray-300'
                            : 'bg-gray-50 border-blue-300 expand'
                        }`}
                    >
                        <label>Equipment Entry #{index + 1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-4">
                            <div className="md:col-span-1">
                                <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-900">Equipment Name</label>
                                <input
                                    id={`name-${index}`}
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.name}
                                    onChange={e => handleChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label htmlFor={`hoursOperating-${index}`} className="block text-sm font-medium text-gray-900">Hours Operating</label>
                                <input
                                    id={`hoursOperating-${index}`}
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.hoursOperating}
                                    onChange={e => handleChange(index, 'hoursOperating', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label htmlFor={`hoursIdle-${index}`} className="block text-sm font-medium text-gray-900">Hours Idle</label>
                                <input
                                    id={`hoursIdle-${index}`}
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.hoursIdle}
                                    onChange={e => handleChange(index, 'hoursIdle', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label htmlFor={`costCode-${index}`} className="block text-sm font-medium text-gray-900">Cost Code</label>
                                <input
                                    id={`costCode-${index}`}
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.costCode}
                                    onChange={e => handleChange(index, 'costCode', e.target.value)}
                                />
                            </div>
                            
                            <div className="md:col-span-1">
                                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">Location</label>
                                <input
                                    id={`location-${index}`}
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.location}
                                    onChange={e => handleChange(index, 'location', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-1 flex items-center">
                                <label htmlFor={`inspected-${index}`} className="block text-sm font-medium text-gray-900 mr-2">Inspected</label>
                                <input
                                    id={`inspected-${index}`}
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    checked={entry.inspected}
                                    onChange={() => handleCheckboxChange(index, 'inspected')}
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">Comments</label>
                                <textarea
                                    id={`comments-${index}`}
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.comments}
                                    onChange={e => handleChange(index, 'comments', e.target.value)}
                                />
                            </div>
                            {index > 0 && (
                                <div className="flex items-center justify-center mt-6 md:col-span-1">
                                    <button
                                        type="button"
                                        onClick={() => removeEquipmentEntry(index)}
                                        className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center mt-6">
                    <button
                        type="button"
                        onClick={addEquipmentEntry}
                        className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out"
                    >
                        Add More Equipment
                    </button>
                </div>
            </div>
        </>
    );
}

export default Equipment;
