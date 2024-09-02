import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function Deliveries() {
    const [deliveryEntries, setDeliveryEntries] = useState([]);  // Start with an empty array
    const deliveryRefs = useRef([]);

    const handleChange = (index, field, value) => {
        setDeliveryEntries(current => current.map((entry, idx) =>
            idx === index ? { ...entry, [field]: value } : entry
        ));
    };

    const addDeliveryEntry = () => {
        setDeliveryEntries(current => [
            ...current,
            { time: '', deliveryFrom: '', trackingNumber: '', contents: '' }
        ]);
    };

    const removeDeliveryEntry = (index) => {
        setDeliveryEntries(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new entry is added
        if (deliveryEntries.length > 0) {
            const element = deliveryRefs.current[deliveryEntries.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [deliveryEntries]);

    return (
        <>
            {deliveryEntries.map((entry, index) => (
                <div
                    key={index}
                    ref={el => (deliveryRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeDeliveryEntry(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }}
                    >
                        <MdClose size={24} />
                    </button>
                    <label>Delivery Entry #{index + 1}</label>
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
                            value={entry.deliveryFrom}
                            onChange={e => handleChange(index, 'deliveryFrom', e.target.value)}
                            placeholder="Delivery From"
                        />
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.trackingNumber}
                            onChange={e => handleChange(index, 'trackingNumber', e.target.value)}
                            placeholder="Tracking Number"
                        />
                        <textarea
                            className="md:col-span-4 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={entry.contents}
                            onChange={e => handleChange(index, 'contents', e.target.value)}
                            placeholder="Contents"
                        />
                    </div>
                </div>
            ))}

            {/* Button Row */}
            <div className="flex justify-start py-2 border-y">
                <button
                    type="button"
                    onClick={addDeliveryEntry}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex pl-4 py-2 font-semibold'>
                    <h2> Delivery Management </h2>
                </div>
            </div>
        </>
    );
}

export default Deliveries;
