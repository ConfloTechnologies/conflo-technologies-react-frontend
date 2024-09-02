import React, { useState, useRef, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';  // Importing icons from Material Design

function ObservedWeatherConditions() {
    const [weatherConditions, setWeatherConditions] = useState([]);
    const weatherRefs = useRef([]);

    const handleWeatherChange = (index, field, value) => {
        setWeatherConditions(current => current.map((condition, idx) =>
            idx === index ? { ...condition, [field]: value } : condition
        ));
    };

    const addWeatherCondition = () => {
        setWeatherConditions(current => [
            ...current,
            { timeStart: '', timeEnd: '', temperature: '', rain: '', wind: '', snow: '', comments: '', condition: '', added: true }
        ]);
    };

    const removeWeatherCondition = (index) => {
        setWeatherConditions(current => current.filter((_, idx) => idx !== index));
    };

    useEffect(() => {
        // Scroll to the last element when a new condition is added
        if (weatherConditions.length > 0 && weatherConditions[weatherConditions.length - 1].added) {
            const element = weatherRefs.current[weatherConditions.length - 1];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [weatherConditions]);

    return (
        <>
            {weatherConditions.map((condition, index) => (
                <div
                    key={index}
                    ref={el => (weatherRefs.current[index] = el)}
                    className="relative border border-gray-300 rounded-md m-4 p-4 shadow-sm mb-4 bg-white"
                >
                    <button
                        onClick={() => removeWeatherCondition(index)}
                        className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600"
                        style={{ margin: '8px' }} // Adjust for padding within the container
                    >
                        <MdClose size={24} />
                    </button>

                    <label>Weather Condition #{index + 1}</label>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {['timeStart', 'timeEnd', 'temperature', 'condition', 'comments'].map(field => (
                            <div key={field} className={`md:col-span-${field === 'comments' ? '4' : '1'}`}>
                                <label htmlFor={`${field}-${index}`} className="block text-sm font-medium text-gray-900">
                                    {field[0].toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}  {/* Formatting label text */}
                                </label>
                                {field !== 'condition' ? (
                                    <input
                                        id={`${field}-${index}`}
                                        type={field === 'temperature' ? 'number' : 'text'}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        value={condition[field]}
                                        onChange={e => handleWeatherChange(index, field, e.target.value)}
                                        placeholder={field === 'temperature' ? '°F' : ''}
                                    />
                                ) : (
                                    <select
                                        id={`${field}-${index}`}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                        value={condition[field]}
                                        onChange={e => handleWeatherChange(index, field, e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="rain">Rain</option>
                                        <option value="wind">Wind</option>
                                        <option value="snow">Snow</option>
                                        <option value="other">Other</option>
                                    </select>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}


            {/* Button Row */}
            <div className="flex justify-start py-2  border-y">
                <button
                    type="button"
                    onClick={addWeatherCondition}
                    className="ml-2 px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center"
                >
                    <MdAdd size={24} />
                </button>
                <div className='flex justify-end px-4 py-2 font-semibold'>
                    <h2> Observed Weather Conditions </h2>
                </div>
            </div>

           
        </>
    );
}

export default ObservedWeatherConditions;
