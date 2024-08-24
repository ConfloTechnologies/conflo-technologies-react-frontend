import React, { useState } from 'react';

function ObservedWeatherConditions() {
    const [weatherConditions, setWeatherConditions] = useState([
        { timeStart: '', timeEnd: '', temperature: '', rain: '', wind: '', snow: '', comments: '', condition: '', added: false }
    ]);

    const handleWeatherChange = (index, field, value) => {
        const newWeatherConditions = [...weatherConditions];
        newWeatherConditions[index][field] = value;
        setWeatherConditions(newWeatherConditions);
    };

    const addWeatherCondition = (index) => {
        const newWeatherConditions = [...weatherConditions];
        newWeatherConditions[index].added = true; // Mark the current condition as added
        setWeatherConditions(newWeatherConditions);

        // Only add a new entry if it is the last one and it is being marked as added
        if (index === weatherConditions.length - 1) {
            setWeatherConditions(current => [
                ...current,
                { timeStart: '', timeEnd: '', temperature: '', rain: '', wind: '', snow: '', comments: '', condition: '', added: false }
            ]);
        }
    };

    const removeWeatherCondition = (index) => {
        const newWeatherConditions = [...weatherConditions];
        newWeatherConditions.splice(index, 1);
        setWeatherConditions(newWeatherConditions);
    };

    return (
        <div className="grid grid-cols-1 gap-4 border border-2 border-gray-400 bg-gray-50 rounded-md p-4 my-8 mx-4 shadow-xl">
            <label>Observed Weather Conditions</label>
            {weatherConditions.map((condition, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-4 bg-white gap-4 border border-gray-300 rounded-md p-4">
                    {/* Time Start */}
                    <div className="sm:col-span-1">
                        <label htmlFor={`timeStart-${index}`} className="block text-sm font-medium text-gray-900">
                            Time Start
                        </label>
                        <input
                            id={`timeStart-${index}`}
                            type="time"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={condition.timeStart}
                            onChange={(e) => handleWeatherChange(index, 'timeStart', e.target.value)}
                        />
                    </div>
                    {/* Time End */}
                    <div className="sm:col-span-1">
                        <label htmlFor={`timeEnd-${index}`} className="block text-sm font-medium text-gray-900">
                            Time End
                        </label>
                        <input
                            id={`timeEnd-${index}`}
                            type="time"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={condition.timeEnd}
                            onChange={(e) => handleWeatherChange(index, 'timeEnd', e.target.value)}
                        />
                    </div>
                    {/* Temperature */}
                    <div className="sm:col-span-1">
                        <label htmlFor={`temperature-${index}`} className="block text-sm font-medium text-gray-900">
                            Temperature
                        </label>
                        <input
                            id={`temperature-${index}`}
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={condition.temperature}
                            onChange={(e) => handleWeatherChange(index, 'temperature', e.target.value)}
                            placeholder="°F"
                        />
                    </div>
                    {/* Weather Condition Dropdown */}
                    <div className="sm:col-span-1">
                        <label htmlFor={`condition-${index}`} className="block text-sm font-medium text-gray-900">
                            Conditions
                        </label>
                        <select
                            id={`condition-${index}`}
                            name={`condition-${index}`}
                            value={condition.condition}
                            onChange={(e) => handleWeatherChange(index, 'condition', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Select...</option>
                            <option value="rain">Rain</option>
                            <option value="wind">Wind</option>
                            <option value="snow">Snow</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {/* Comments */}
                    <div className="sm:col-span-3 ">
                        <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                            Comments
                        </label>
                        <textarea
                            id={`comments-${index}`}
                            className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                            value={condition.comments}
                            onChange={(e) => handleWeatherChange(index, 'comments', e.target.value)}
                        />
                    </div>

                   {/* Add and Remove Buttons */}
                   <div className="flex items-center justify-center mt-6 sm:col-span-1">
                        {condition.added ? (
                            <button
                                type="button"
                                onClick={() => removeWeatherCondition(index)}
                                className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => addWeatherCondition(index)}
                                className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700"
                            >
                                Add to Daily
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ObservedWeatherConditions;
