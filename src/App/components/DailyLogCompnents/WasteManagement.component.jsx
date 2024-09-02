import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Waste() {
    const [wasteEntries, setWasteEntries] = useState([]);  // Start with an empty array
    const wasteRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setWasteEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addWasteEntry = () => {
        setWasteEntries(current => [
            ...current,
            { time: '', material: '', disposedBy: '', methodOfDisposal: '', disposalLocation: '', approximateQuantity: '', comments: '' }
        ]);
    };

    const removeWasteEntry = (index) => {
        setWasteEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (wasteEntries.length > 0) {
            const element = wasteRefs.current[wasteEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [wasteEntries]);

    return (
        <>
            {wasteEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (wasteRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeWasteEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        <input
                            id={`time-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.time}
                            onChange={e => handleChange(index, 'time', e.target.value)}
                            placeholder="Time"
                        />
                        <input
                            id={`material-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.material}
                            onChange={e => handleChange(index, 'material', e.target.value)}
                            placeholder="Material"
                        />
                        <input
                            id={`disposedBy-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.disposedBy}
                            onChange={e => handleChange(index, 'disposedBy', e.target.value)}
                            placeholder="Disposed By"
                        />
                        <input
                            id={`methodOfDisposal-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.methodOfDisposal}
                            onChange={e => handleChange(index, 'methodOfDisposal', e.target.value)}
                            placeholder="Method of Disposal"
                        />
                        <input
                            id={`disposalLocation-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.disposalLocation}
                            onChange={e => handleChange(index, 'disposalLocation', e.target.value)}
                            placeholder="Disposal Location"
                        />
                        <input
                            id={`approximateQuantity-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.approximateQuantity}
                            onChange={e => handleChange(index, 'approximateQuantity', e.target.value)}
                            placeholder="Approximate Quantity"
                        />
                        <textarea
                            id={`comments-${index}`}
                            className="md:col-span-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                    onClick={addWasteEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Waste Management </h2>
                </div>
            </div>
        </>
    );
}

export default Waste;
