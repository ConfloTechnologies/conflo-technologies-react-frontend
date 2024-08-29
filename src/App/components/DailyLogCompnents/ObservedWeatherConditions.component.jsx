import React, { useState, useRef, useEffect } from 'react';

function ObservedWeatherConditions() {
    const [weatherConditions, setWeatherConditions] = useState([
        { timeStart: '', timeEnd: '', temperature: '', rain: '', wind: '', snow: '', comments: '', condition: '', added: false }
    ]);

    const weatherRefs = useRef([]);

    const handleWeatherChange = (index, field, value) => {
        setWeatherConditions(current => current.map((condition, idx) => 
            idx === index ? {...condition, [field]: value} : condition
        ));
    };

    const addWeatherCondition = () => {
        setWeatherConditions(current => [
            ...current,
            { timeStart: '', timeEnd: '', temperature: '', rain: '', wind: '', snow: '', comments: '', condition: '', added: false }
        ]);

        // Delay the addition of the expand class to allow the element to render first
        setTimeout(() => {
            const index = weatherConditions.length;
            const element = weatherRefs.current[index - 1]; // Adjusting to the new index
            if (element) {
                element.classList.add('expand');
            }
        }, 50); // Small delay to ensure the element is added to the DOM
    };

    const removeWeatherCondition = (index) => {
        const element = weatherRefs.current[index];
        element.classList.add('fade-out', 'shrink');

        // Wait for the animation to complete before removing the element from state
        setTimeout(() => {
            setWeatherConditions(current => current.filter((_, idx) => idx !== index));
        }, 500); // Match this with the CSS transition duration
    };

    useEffect(() => {
        // Scroll the last element into view when a new condition is added
        if (weatherConditions.length > 1) {
            weatherRefs.current[weatherConditions.length - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [weatherConditions]);

    return (
        <>
            <div className='mt-5'>
                <h2>Observed Weather Conditions</h2>
            </div>
            <style>{`
                .initial-state {
                    opacity: 0;
                    transform: translateY(-10px);
                    margin-bottom: .25rem; 
                    transition: opacity .50s ease, transform .50s ease, margin-bottom .50s ease, background-color .50s ease;
                }
                
                .fade-out {
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: opacity  .50s ease, transform 0.9s ease, background-color .50s ease;
                }
    
                .shrink {
                    height: 0;
                    padding-top: 0;
                    padding-bottom: 0;
                    margin-bottom: 0 !important;
                    overflow: hidden;
                    transition: height .50s ease, padding .50s ease, margin .50s ease, background-color .50s ease;
                }
    
                .expand {
                    opacity: 1;
                    transform: translateY(0);
                    height: auto;
                    padding-bottom: 1rem;
                    margin-bottom: 1.5rem; /* Final margin after expansion */
                    transition: height  .50s ease, margin-bottom  .50s ease, background-color  .50s ease;
                }
            `}</style>

            <div className="grid grid-cols-1 ">
                {weatherConditions.map((condition, index) => (
                    <div
                        key={index}
                        ref={el => (weatherRefs.current[index] = el)}
                        className={`border border-1 rounded-md  p-4 shadow-sm transform transition-transform duration-500 ease-in-out ${
                            index === weatherConditions.length - 1
                           ? 'bg-blue-50 border-blue-300 '
                            : 'bg-gray-50 border-gray-300 expand'
                        }`}
                    >
                        <label>Condition #{index + 1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-4">
                            {['timeStart', 'timeEnd'].map(field => (
                                <div className="md:col-span-1" key={field}>
                                    <label htmlFor={`${field}-${index}`} className="block text-sm font-medium text-gray-900">
                                        {field === 'timeStart' ? 'Time Start' : 'Time End'}
                                    </label>
                                    <input
                                        id={`${field}-${index}`}
                                        type="time"
                                        className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                        value={condition[field]}
                                        onChange={e => handleWeatherChange(index, field, e.target.value)}
                                    />
                                </div>
                            ))}
                            <div className="md:col-span-1">
                                <label htmlFor={`temperature-${index}`} className="block text-sm font-medium text-gray-900">
                                    Temperature
                                </label>
                                <input
                                    id={`temperature-${index}`}
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={condition.temperature}
                                    onChange={e => handleWeatherChange(index, 'temperature', e.target.value)}
                                    placeholder="°F"
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label htmlFor={`condition-${index}`} className="block text-sm font-medium text-gray-900">
                                    Conditions
                                </label>
                                <select
                                    id={`condition-${index}`}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={condition.condition}
                                    onChange={e => handleWeatherChange(index, 'condition', e.target.value)}
                                >
                                    <option value="">Select...</option>
                                    <option value="rain">Rain</option>
                                    <option value="wind">Wind</option>
                                    <option value="snow">Snow</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="md:col-span-3">
                                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                                    Comments
                                </label>
                                <textarea
                                    id={`comments-${index}`}
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={condition.comments}
                                    onChange={e => handleWeatherChange(index, 'comments', e.target.value)}
                                />
                            </div>
                            {index > 0 && (
                                <div className="flex items-center justify-center mt-6">
                                    <button
                                        type="button"
                                        onClick={() => removeWeatherCondition(index)}
                                        className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center mt-4 ">
                    <button
                        type="button"
                        onClick={addWeatherCondition}
                        className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out"
                    >
                        Add More Conditions
                    </button>
                </div>
            </div>
        </>
    );
}

export default ObservedWeatherConditions;
