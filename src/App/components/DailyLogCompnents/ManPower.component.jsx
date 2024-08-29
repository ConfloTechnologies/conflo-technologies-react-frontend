import React, { useState, useRef, useEffect } from 'react';

function Manpower({ companies = [], locations = [] }) {
    const [manpowerEntries, setManpowerEntries] = useState([
        { company: '', workers: '', hours: '', totalHours: '', location: '', comments: '', added: false }
    ]);

    const manpowerRefs = useRef([]);

    const handleManpowerChange = (index, field, value) => {
        setManpowerEntries(current => current.map((entry, idx) =>
            idx === index ? {
                ...entry,
                [field]: value,
                totalHours: (field === 'hours' || field === 'workers')
                    ? Number(entry.workers) * Number(entry.hours)
                    : entry.totalHours
            } : entry
        ));
    };

    const addManpowerEntry = () => {
        setManpowerEntries(current => [
            ...current,
            { company: '', workers: '', hours: '', totalHours: '', location: '', comments: '', added: false }
        ]);

        // Delay the addition of the expand class to allow the element to render first
        setTimeout(() => {
            const index = manpowerEntries.length;
            const element = manpowerRefs.current[index - 1]; // Adjusting to the new index
            if (element) {
                element.classList.add('expand');
            }
        }, 50); // Small delay to ensure the element is added to the DOM
    };

    const removeManpowerEntry = (index) => {
        const element = manpowerRefs.current[index];
        element.classList.add('fade-out', 'shrink');

        // Wait for the animation to complete before removing the element from state
        setTimeout(() => {
            setManpowerEntries(current => current.filter((_, idx) => idx !== index));
        }, 500); // Match this with the CSS transition duration
    };

    useEffect(() => {
        // Scroll the last element into view when a new entry is added
        if (manpowerEntries.length > 1) {
            manpowerRefs.current[manpowerEntries.length - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [manpowerEntries]);

    return (
        <>
            <div className='mt-5'>
                <h2>Manpower Management</h2>
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
                {manpowerEntries.map((entry, index) => (
                    <div
                        key={index}
                        ref={el => (manpowerRefs.current[index] = el)}
                        className={`border border-1 rounded-md p-4 shadow-sm transform transition-transform duration-500 ease-in-out ${
                            index === manpowerEntries.length - 1
                            ? 'bg-blue-50 border-blue-300 '
                            : 'bg-gray-50 border-gray-300 expand'
                        }`}
                    >
                        <label>Manpower Entry #{index + 1}</label>
                        <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-4">
                            <div className="md:col-span-1">
                                <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-900">
                                    Company
                                </label>
                                <select
                                    id={`company-${index}`}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={entry.company}
                                    onChange={e => handleManpowerChange(index, 'company', e.target.value)}
                                >
                                    <option value="">Select Company</option>
                                    {companies.map(company => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-1">
                                <label htmlFor={`workers-${index}`} className="block text-sm font-medium text-gray-900">
                                    Workers
                                </label>
                                <input
                                    id={`workers-${index}`}
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.workers}
                                    onChange={e => handleManpowerChange(index, 'workers', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label htmlFor={`hours-${index}`} className="block text-sm font-medium text-gray-900">
                                    Hours
                                </label>
                                <input
                                    id={`hours-${index}`}
                                    type="number"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.hours}
                                    onChange={e => handleManpowerChange(index, 'hours', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-1">
                                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">
                                    Location
                                </label>
                                <select
                                    id={`location-${index}`}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={entry.location}
                                    onChange={e => handleManpowerChange(index, 'location', e.target.value)}
                                >
                                    <option value="">Select Location</option>
                                    {locations.map(location => (
                                        <option key={location.id} value={location.id}>{location.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-3">
                                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                                    Comments
                                </label>
                                <textarea
                                    id={`comments-${index}`}
                                    className="mt-1 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-indigo-600 sm:text-sm"
                                    value={entry.comments}
                                    onChange={e => handleManpowerChange(index, 'comments', e.target.value)}
                                />
                            </div>
                            {index > 0 && (
                                <div className="flex items-center justify-center mt-6 md:col-span-1">
                                    <button
                                        type="button"
                                        onClick={() => removeManpowerEntry(index)}
                                        className="w-full px-4 py-1 bg-gray-300 border-gray-400 text-gray-900 font-semibold text-md rounded hover:bg-red-600 hover:text-white"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center mt-4">
                    <button
                        type="button"
                        onClick={addManpowerEntry}
                        className="w-full px-4 py-1 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out"
                    >
                        Add More Entries
                    </button>
                </div>
            </div>
        </>
    );
}

export default Manpower;
