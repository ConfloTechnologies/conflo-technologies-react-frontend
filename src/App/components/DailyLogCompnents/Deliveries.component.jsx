import React, { useState } from 'react';

function Deliveries() {
    const [deliveryEntries, setDeliveryEntries] = useState([{
        time: '',
        deliveryFrom: '',
        trackingNumber: '',
        contents: ''
    }]);

    const handleChange = (index, field, value) => {
        const newEntries = [...deliveryEntries];
        newEntries[index][field] = value;
        setDeliveryEntries(newEntries);
    };

    const addDeliveryEntry = () => {
        setDeliveryEntries([...deliveryEntries, { time: '', deliveryFrom: '', trackingNumber: '', contents: '' }]);
    };

    const removeDeliveryEntry = (index) => {
        const newEntries = [...deliveryEntries];
        newEntries.splice(index, 1);
        setDeliveryEntries(newEntries);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Deliveries</label>
            {deliveryEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-4 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    <div className="sm:col-span-1">
                        <label htmlFor={`time-${index}`} className="block text-sm font-medium text-gray-900">Time</label>
                        <input
                            id={`time-${index}`}
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.time}
                            onChange={e => handleChange(index, 'time', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`deliveryFrom-${index}`} className="block text-sm font-medium text-gray-900">Delivery From</label>
                        <input
                            id={`deliveryFrom-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.deliveryFrom}
                            onChange={e => handleChange(index, 'deliveryFrom', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`trackingNumber-${index}`} className="block text-sm font-medium text-gray-900">Tracking Number</label>
                        <input
                            id={`trackingNumber-${index}`}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.trackingNumber}
                            onChange={e => handleChange(index, 'trackingNumber', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor={`contents-${index}`} className="block text-sm font-medium text-gray-900">Contents</label>
                        <textarea
                            id={`contents-${index}`}
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={entry.contents}
                            onChange={e => handleChange(index, 'contents', e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mt-6 sm:col-span-4">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeDeliveryEntry(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        )}
                        {index === deliveryEntries.length - 1 && (
                            <button
                                type="button"
                                onClick={addDeliveryEntry}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add More Deliveries
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Deliveries;

