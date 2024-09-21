import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MdAdd, MdRemove, MdClose, MdCloudUpload } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import MenuTabs from '../MenuTabs.component';
import { MdPhotoCamera } from 'react-icons/md';



// NEED TO ADJUST THIS TO PREVENT OR DISABLE THE BUTTON WHEN NO INFORMATION HAS BEEN ADDED
function StickyFooter({ onSave, hasChanges }) {
  return (
<div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 border-t shadow-xl p-3 flex justify-end">
<button
        type="button"
        className={`mr-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          hasChanges ? 'bg-green-500 text-white hover:bg-green-700 focus:ring-green-500' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
        }`}
        onClick={hasChanges ? onSave : undefined}
        disabled={!hasChanges}
      >
        Save Daily Log
      </button>
    </div>
  );
}

function RemoveButton({ title, onClick }) {
  return (
    <div className="flex items-center justify-start py-2 ">
      <button
        type="button"
        onClick={onClick}
        className="ml-4 bg-red-500 text-white font-semibold rounded hover:bg-red-700  flex items-center justify-center w-6 h-6 md:w-7 md:h-7"
      >
        <MdRemove className="w-full h-full" />
      </button>
      <div className="flex items-center justify-end px-4 font-semibold">
        <h2 className='hidden md:block'>{title}</h2>
      </div>
    </div>
  );
}

function AddButton({ title, onClick }) {
  return (
    <div className="flex items-center justify-start py-2">
      <button
        type="button"
        onClick={onClick}
        className="ml-4 bg-green-500 text-white font-semibold rounded hover:bg-green-700  flex items-center justify-center w-6 h-6 md:w-7 md:h-7"
      >
        <MdAdd className="w-full h-full" />
      </button>
      <div className="flex items-center justify-end px-4 font-semibold">
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function ObservedWeatherConditions({ weatherConditions = [], setWeatherConditions }) {
  const weatherRefs = useRef([]);

  const handleWeatherChange = (index, field, value) => {
    setWeatherConditions((current) =>
      current.map((condition, idx) =>
        idx === index ? { ...condition, [field]: value } : condition
      )
    );
  };

  const addWeatherCondition = () => {
    setWeatherConditions((current) => [
      ...current,
      {
        timeStart: '',
        timeEnd: '',
        temperature: '',
        condition: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeWeatherCondition = (index) => {
    setWeatherConditions((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      weatherConditions.length > 0 &&
      weatherConditions[weatherConditions.length - 1].added
      
    ) {
      const element = weatherRefs.current[weatherConditions.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [weatherConditions]);

  return (
    <>
      {weatherConditions.map((condition, index) => (
        <div
          key={index}
          ref={(el) => (weatherRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px',  }} 
            >
              <RemoveButton title="Weather Condition" onClick={() => removeWeatherCondition(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-4 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Weather Condition </h2>
                </div>
                {/* <div className="flex items-center justify-end text-gray-400 text-sm  col-span-1">
                  <h2>Edited by: Wyatt Cooper</h2>
                </div> */}
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`timeStart-${index}`} className="block text-sm font-medium text-gray-900">
                  Time Start
                </label>
                <input
                  id={`timeStart-${index}`}
                  type="text"
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={condition.timeStart}
                  onChange={(e) => handleWeatherChange(index, 'timeStart', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`timeEnd-${index}`} className="block text-sm font-medium text-gray-900">
                  Time End
                </label>
                <input
                  id={`timeEnd-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={condition.timeEnd}
                  onChange={(e) => handleWeatherChange(index, 'timeEnd', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`temperature-${index}`} className="block text-sm font-medium text-gray-900">
                  Temperature
                </label>
                <input
                  id={`temperature-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={condition.temperature}
                  onChange={(e) => handleWeatherChange(index, 'temperature', e.target.value)}
                  placeholder="°F"
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`condition-${index}`} className="block text-sm font-medium text-gray-900">
                  Condition
                </label>
                <select
                  id={`condition-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={condition.condition}
                  onChange={(e) => handleWeatherChange(index, 'condition', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="rain">Rain</option>
                  <option value="wind">Wind</option>
                  <option value="snow">Snow</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={condition.comments}
                  onChange={(e) => handleWeatherChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
                </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Weather Condition" onClick={addWeatherCondition} />
    </>
  );
}

function Manpower({ companies = [], locations = [], manpowerEntries, setManpowerEntries }) {
  const manpowerRefs = useRef([]);

  const handleManpowerChange = (index, field, value) => {
    setManpowerEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addManpowerEntry = () => {
    setManpowerEntries((current) => [
      ...current,
      {
        company: '',
        workers: 0,
        hours: 0,
        location: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeManpowerEntry = (index) => {
    setManpowerEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      manpowerEntries.length > 0 &&
      manpowerEntries[manpowerEntries.length - 1].added
    ) {
      const element = manpowerRefs.current[manpowerEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [manpowerEntries]);

  return (
    <>
      {manpowerEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (manpowerRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }} 
            >
              <RemoveButton title="Manpower Entry" onClick={() => removeManpowerEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-4 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Manpower Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-900">
                  Company
                </label>
                <select
                  id={`company-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.company}
                  onChange={(e) => handleManpowerChange(index, 'company', e.target.value)}
                >
                  <option value="">Select...</option>
                  {companies.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`workers-${index}`} className="block text-sm font-medium text-gray-900">
                  Workers
                </label>
                <input
                  id={`workers-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.workers}
                  onChange={(e) => handleManpowerChange(index, 'workers', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`hours-${index}`} className="block text-sm font-medium text-gray-900">
                  Hours
                </label>
                <input
                  id={`hours-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.hours}
                  onChange={(e) => handleManpowerChange(index, 'hours', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">
                  Location
                </label>
                <select
                  id={`location-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.location}
                  onChange={(e) => handleManpowerChange(index, 'location', e.target.value)}
                >
                  <option value="">Select...</option>
                  {locations.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleManpowerChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Manpower Entry" onClick={addManpowerEntry} />
    </>
  );
}

function Equipment({ locations = [], costCodes = [], equipmentTypes = [], equipmentEntries, setEquipmentEntries }) {
  const equipmentRefs = useRef([]);

  const handleEquipmentChange = (index, field, value) => {
    setEquipmentEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addEquipmentEntry = () => {
    setEquipmentEntries((current) => [
      ...current,
      {
        type: '',
        hoursOperating: '',
        hoursIdle: '',
        costCode: '',
        location: '',
        inspected: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeEquipmentEntry = (index) => {
    setEquipmentEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      equipmentEntries.length > 0 &&
      equipmentEntries[equipmentEntries.length - 1].added
    ) {
      const element = equipmentRefs.current[equipmentEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [equipmentEntries]);

  return (
    <>
      {equipmentEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (equipmentRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Equipment Entry" onClick={() => removeEquipmentEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Equipment Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`type-${index}`} className="block text-sm font-medium text-gray-900">
                  Equipment Type
                </label>
                <select
                  id={`type-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.type}
                  onChange={(e) => handleEquipmentChange(index, 'type', e.target.value)}
                >
                  <option value="">Select...</option>
                  {equipmentTypes.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`hoursOperating-${index}`} className="block text-sm font-medium text-gray-900">
                  Hours Operating
                </label>
                <input
                  id={`hoursOperating-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.hoursOperating}
                  onChange={(e) =>
                    handleEquipmentChange(index, 'hoursOperating', parseInt(e.target.value, 10))
                  }
                  placeholder="Hours Operating"
                  min="0"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`hoursIdle-${index}`} className="block text-sm font-medium text-gray-900">
                  Hours Idle
                </label>
                <input
                  id={`hoursIdle-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.hoursIdle}
                  onChange={(e) =>
                    handleEquipmentChange(index, 'hoursIdle', parseInt(e.target.value, 10))
                  }
                  placeholder="Hours Idle"
                  min="0"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`costCode-${index}`} className="block text-sm font-medium text-gray-900">
                  Cost Code
                </label>
                <select
                  id={`costCode-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.costCode}
                  onChange={(e) => handleEquipmentChange(index, 'costCode', e.target.value)}
                >
                  <option value="">Select...</option>
                  {costCodes.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">
                  Location
                </label>
                <select
                  id={`location-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.location}
                  onChange={(e) => handleEquipmentChange(index, 'location', e.target.value)}
                >
                  <option value="">Select...</option>
                  {locations.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`inspected-${index}`} className="block text-sm font-medium text-gray-900">
                  Inspected
                </label>
                <select
                  id={`inspected-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.inspected}
                  onChange={(e) => handleEquipmentChange(index, 'inspected', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleEquipmentChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Equipment Entry" onClick={addEquipmentEntry} />
    </>
  );
}

function Visitors({ visitorEntries, setVisitorEntries }) {
  const visitorRefs = useRef([]);

  const handleVisitorChange = (index, field, value) => {
    setVisitorEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addVisitorEntry = () => {
    setVisitorEntries((current) => [
      ...current,
      {
        name: '',
        start: '',
        end: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeVisitorEntry = (index) => {
    setVisitorEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      visitorEntries.length > 0 &&
      visitorEntries[visitorEntries.length - 1].added
    ) {
      const element = visitorRefs.current[visitorEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [visitorEntries]);

  return (
    <>
      {visitorEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (visitorRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Visitor Entry" onClick={() => removeVisitorEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Visitor Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-6 xl:col-span-2">
                <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  id={`name-${index}`}
                  type="text"
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.name}
                  onChange={(e) => handleVisitorChange(index, 'name', e.target.value)}
                  placeholder="Name"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`start-${index}`} className="block text-sm font-medium text-gray-900">
                  Start
                </label>
                <input
                  id={`start-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.start}
                  onChange={(e) => handleVisitorChange(index, 'start', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`end-${index}`} className="block text-sm font-medium text-gray-900">
                  End
                </label>
                <input
                  id={`end-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.end}
                  onChange={(e) => handleVisitorChange(index, 'end', e.target.value)}
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleVisitorChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Visitor Entry" onClick={addVisitorEntry} />
    </>
  );
}

function PhoneCalls({ people = [], companies = [], callEntries, setCallEntries }) {
  const callRefs = useRef([]);

  const handleCallChange = (index, field, value) => {
    setCallEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addCallEntry = () => {
    setCallEntries((current) => [
      ...current,
      {
        toFrom: '',
        toFromName: '', // New field to store the associated name
        company: '',
        start: '',
        end: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeCallEntry = (index) => {
    setCallEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      callEntries.length > 0 &&
      callEntries[callEntries.length - 1].added
    ) {
      const element = callRefs.current[callEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [callEntries]);

  return (
    <>
      {callEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (callRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Phone Call Entry" onClick={() => removeCallEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Phone Call Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-900">
                  Company
                </label>
                <select
                  id={`company-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.company}
                  onChange={(e) => handleCallChange(index, 'company', e.target.value)}
                >
                  <option value="">Select...</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.name}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>


              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`toFrom-${index}`} className="block text-sm font-medium text-gray-900">
                  To/From
                </label>
                <select
                  id={`toFrom-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.toFrom}
                  onChange={(e) => handleCallChange(index, 'toFrom', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="to">TO:</option>
                  <option value="from">FROM:</option>
                </select>
              </div>

              <div className="col-span-full md:col-span-6 xl:col-span-2">
                <label htmlFor={`toFromName-${index}`} className="block text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  id={`toFromName-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.toFromName}
                  onChange={(e) => handleCallChange(index, 'toFromName', e.target.value)}
                  placeholder={`${entry.toFrom === 'to' ? 'Recipient' : 'Caller'} name`}
                />
              </div>

              
              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`start-${index}`} className="block text-sm font-medium text-gray-900">
                  Start
                </label>
                <input
                  id={`start-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.start}
                  onChange={(e) => handleCallChange(index, 'start', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`end-${index}`} className="block text-sm font-medium text-gray-900">
                  End
                </label>
                <input
                  id={`end-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.end}
                  onChange={(e) => handleCallChange(index, 'end', e.target.value)}
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleCallChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Phone Call Entry" onClick={addCallEntry} />
    </>
  );
}

function Inspections({ locations = [], inspectionEntries, setInspectionEntries }) {
  const inspectionRefs = useRef([]);

  const handleInspectionChange = (index, field, value) => {
    setInspectionEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addInspectionEntry = () => {
    setInspectionEntries((current) => [
      ...current,
      {
        start: '',
        end: '',
        inspectionType: '',
        inspectionEntity: '',
        inspectorName: '',
        location: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeInspectionEntry = (index) => {
    setInspectionEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      inspectionEntries.length > 0 &&
      inspectionEntries[inspectionEntries.length - 1].added
    ) {
      const element = inspectionRefs.current[inspectionEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [inspectionEntries]);

  return (
    <>
      {inspectionEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (inspectionRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Inspection Entry" onClick={() => removeInspectionEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Inspection Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`start-${index}`} className="block text-sm font-medium text-gray-900">
                  Start
                </label>
                <input
                  id={`start-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.start}
                  onChange={(e) => handleInspectionChange(index, 'start', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`end-${index}`} className="block text-sm font-medium text-gray-900">
                  End
                </label>
                <input
                  id={`end-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.end}
                  onChange={(e) => handleInspectionChange(index, 'end', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`inspectionType-${index}`} className="block text-sm font-medium text-gray-900">
                  Inspection Type
                </label>
                <input
                  id={`inspectionType-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.inspectionType}
                  onChange={(e) => handleInspectionChange(index, 'inspectionType', e.target.value)}
                  placeholder="Inspection Type"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`inspectionEntity-${index}`} className="block text-sm font-medium text-gray-900">
                  Inspection Entity
                </label>
                <input
                  id={`inspectionEntity-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.inspectionEntity}
                  onChange={(e) => handleInspectionChange(index, 'inspectionEntity', e.target.value)}
                  placeholder="Inspection Entity"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`inspectorName-${index}`} className="block text-sm font-medium text-gray-900">
                  Inspector Name
                </label>
                <input
                  id={`inspectorName-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.inspectorName}
                  onChange={(e) => handleInspectionChange(index, 'inspectorName', e.target.value)}
                  placeholder="Inspector Name"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">
                  Location
                </label>
                <select
                  id={`location-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.location}
                  onChange={(e) => handleInspectionChange(index, 'location', e.target.value)}
                >
                  <option value="">Select...</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleInspectionChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Inspection Entry" onClick={addInspectionEntry} />
    </>
  );
}

function Deliveries({ deliveryEntries, setDeliveryEntries }) {
  const deliveryRefs = useRef([]);

  const handleDeliveryChange = (index, field, value) => {
    setDeliveryEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addDeliveryEntry = () => {
    setDeliveryEntries((current) => [
      ...current,
      {
        time: '',
        deliveryFrom: '',
        trackingNumber: '',
        contents: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeDeliveryEntry = (index) => {
    setDeliveryEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      deliveryEntries.length > 0 &&
      deliveryEntries[deliveryEntries.length - 1].added
    ) {
      const element = deliveryRefs.current[deliveryEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [deliveryEntries]);

  return (
    <>
      {deliveryEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (deliveryRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Delivery Entry" onClick={() => removeDeliveryEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Delivery Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-2">
                <label htmlFor={`time-${index}`} className="block text-sm font-medium text-gray-900">
                 Delivery Time:
                </label>
                <input
                  id={`time-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.time}
                  onChange={(e) => handleDeliveryChange(index, 'time', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-2">
                <label htmlFor={`deliveryFrom-${index}`} className="block text-sm font-medium text-gray-900">
                  Delivered From:
                </label>
                <input
                  id={`deliveryFrom-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.deliveryFrom}
                  onChange={(e) => handleDeliveryChange(index, 'deliveryFrom', e.target.value)}
                  placeholder="Delivery From"
                />
              </div>

              <div className="col-span-full md:col-span-2">
                <label htmlFor={`trackingNumber-${index}`} className="block text-sm font-medium text-gray-900">
                  Tracking Number
                </label>
                <input
                  id={`trackingNumber-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.trackingNumber}
                  onChange={(e) => handleDeliveryChange(index, 'trackingNumber', e.target.value)}
                  placeholder="Tracking Number"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`contents-${index}`} className="block text-sm font-medium text-gray-900">
                  Delivery Contents
                </label>
                <textarea
                  id={`contents-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.contents}
                  onChange={(e) => handleDeliveryChange(index, 'contents', e.target.value)}
                  placeholder="Describe what was delivered here..."
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleDeliveryChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Delivery Entry" onClick={addDeliveryEntry} />
    </>
  );
}

function SafetyViolations({ issuesToOptions = [] }) {
  const [violationEntries, setViolationEntries] = useState([]);
  const violationRefs = useRef([]);

  const handleViolationChange = (index, field, value) => {
    setViolationEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addViolationEntry = () => {
    setViolationEntries((current) => [
      ...current,
      {
        time: '',
        subject: '',
        safetyNotice: '',
        issuesTo: '',
        complianceDue: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeViolationEntry = (index) => {
    setViolationEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      violationEntries.length > 0 &&
      violationEntries[violationEntries.length - 1].added
    ) {
      const element = violationRefs.current[violationEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [violationEntries]);

  return (
    <>
      {violationEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (violationRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Safety Violation" onClick={() => removeViolationEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Safety Violation #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full xl:col-span-3">
                <label htmlFor={`subject-${index}`} className="block text-sm font-medium text-gray-900">
                  Subject of Violation
                </label>
                <input
                  id={`subject-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.subject}
                  onChange={(e) => handleViolationChange(index, 'subject', e.target.value)}
                  placeholder="Subject"
                />
              </div>

              <div className="col-span-full md:col-span-3">
                <label htmlFor={`safetyNotice-${index}`} className="block text-sm font-medium text-gray-900">
                  Safety Notice
                </label>
                <input
                  id={`safetyNotice-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.safetyNotice}
                  onChange={(e) => handleViolationChange(index, 'safetyNotice', e.target.value)}
                  placeholder="Safety Notice"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
              <label htmlFor={`issuesTo-${index}`} className="block text-sm font-medium text-gray-900">
                  Issues To (Safety Manager)
                </label>
                <input
                  id={`issuesTo-${index}`}                  
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.issuesTo}
                  onChange={(e) => handleViolationChange(index, 'issuesTo', e.target.value)}
                  placeholder="Full Name"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`time-${index}`} className="block text-sm font-medium text-gray-900">
                  Time Discovered
                </label>
                <input
                  id={`time-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.time}
                  onChange={(e) => handleViolationChange(index, 'time', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`complianceDue-${index}`} className="block text-sm font-medium text-gray-900">
                  Correction due by:
                </label>
                <input
                  id={`complianceDue-${index}`}
                  type="date"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.complianceDue}
                  onChange={(e) => handleViolationChange(index, 'complianceDue', e.target.value)}
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleViolationChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Safety Violation" onClick={addViolationEntry} />
    </>
  );
}

function Accidents() {
  const [accidentEntries, setAccidentEntries] = useState([]);
  const accidentRefs = useRef([]);

  const handleAccidentChange = (index, field, value) => {
    setAccidentEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addAccidentEntry = () => {
    setAccidentEntries((current) => [
      ...current,
      {
        time: '',
        partyInvolved: '',
        companyInvolved: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeAccidentEntry = (index) => {
    setAccidentEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      accidentEntries.length > 0 &&
      accidentEntries[accidentEntries.length - 1].added
    ) {
      const element = accidentRefs.current[accidentEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [accidentEntries]);

  return (
    <>
      {accidentEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (accidentRefs.current[index] = el)}
          className="relative bg-white border-b"
        >
          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Accident Entry" onClick={() => removeAccidentEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Accident Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-2">
                <label htmlFor={`time-${index}`} className="block text-sm font-medium text-gray-900">
                  Time
                </label>
                <input
                  id={`time-${index}`}
                  type="time"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.time}
                  onChange={(e) => handleAccidentChange(index, 'time', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-2">
                <label htmlFor={`partyInvolved-${index}`} className="block text-sm font-medium text-gray-900">
                  Party Involved
                </label>
                <input
                  id={`partyInvolved-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.partyInvolved}
                  onChange={(e) => handleAccidentChange(index, 'partyInvolved', e.target.value)}
                  placeholder="Party Involved"
                />
              </div>

              <div className="col-span-full md:col-span-2">
                <label htmlFor={`companyInvolved-${index}`} className="block text-sm font-medium text-gray-900">
                  Company Involved
                </label>
                <input
                  id={`companyInvolved-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.companyInvolved}
                  onChange={(e) => handleAccidentChange(index, 'companyInvolved', e.target.value)}
                  placeholder="Company Involved"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Additional Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleAccidentChange(index, 'comments', e.target.value)}
                  placeholder="Additional Comments"
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Accident Entry" onClick={addAccidentEntry} />
    </>
  );
}

function Dumpster() {
  const [dumpsterEntries, setDumpsterEntries] = useState([]);
  const dumpsterRefs = useRef([]);

  const handleDumpsterChange = (index, field, value) => {
    setDumpsterEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addDumpsterEntry = () => {
    setDumpsterEntries((current) => [
      ...current,
      {
        company: '',
        delivered: '',
        removed: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeDumpsterEntry = (index) => {
    setDumpsterEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      dumpsterEntries.length > 0 &&
      dumpsterEntries[dumpsterEntries.length - 1].added
    ) {
      const element = dumpsterRefs.current[dumpsterEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [dumpsterEntries]);

  return (
    <>
      {dumpsterEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (dumpsterRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Dumpster Entry" onClick={() => removeDumpsterEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Dumpster Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-1">
                <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-900">
                  Company
                </label>
                <input
                  id={`company-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.company}
                  onChange={(e) => handleDumpsterChange(index, 'company', e.target.value)}
                  placeholder="Company"
                />
              </div>

              <div className="col-span-full md:col-span-1">
                <label htmlFor={`delivered-${index}`} className="block text-sm font-medium text-gray-900">
                  # Delivered
                </label>
                <input
                  id={`delivered-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.delivered}
                  onChange={(e) => handleDumpsterChange(index, 'delivered', e.target.value)}
                  placeholder="# Delivered"
                  min="0"
                />
              </div>

              <div className="col-span-full md:col-span-1">
                <label htmlFor={`removed-${index}`} className="block text-sm font-medium text-gray-900">
                  # Removed
                </label>
                <input
                  id={`removed-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.removed}
                  onChange={(e) => handleDumpsterChange(index, 'removed', e.target.value)}
                  placeholder="# Removed"
                  min="0"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleDumpsterChange(index, 'comments', e.target.value)}
                  placeholder="Comments"
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Dumpster Entry" onClick={addDumpsterEntry} />
    </>
  );
}

function Waste() {
  const [wasteEntries, setWasteEntries] = useState([]);
  const wasteRefs = useRef([]);

  const handleChange = (index, field, value) => {
    setWasteEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addWasteEntry = () => {
    setWasteEntries((current) => [
      ...current,
      {
        time: '',
        material: '',
        disposedBy: '',
        methodOfDisposal: '',
        disposalLocation: '',
        approximateQuantity: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeWasteEntry = (index) => {
    setWasteEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      wasteEntries.length > 0 &&
      wasteEntries[wasteEntries.length - 1].added
    ) {
      const element = wasteRefs.current[wasteEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [wasteEntries]);

  return (
    <>
      {wasteEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (wasteRefs.current[index] = el)}
          className="relative bg-white border-b"
        >

          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Waste Entry" onClick={() => removeWasteEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Waste Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`time-${index}`} className="block text-sm font-medium text-gray-900">
                  Time
                </label>
                <input
                  id={`time-${index}`}
                  type="datetime-local"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.time}
                  onChange={(e) => handleChange(index, 'time', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`material-${index}`} className="block text-sm font-medium text-gray-900">
                  Materials
                </label>
                <input
                  id={`material-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.material}
                  onChange={(e) => handleChange(index, 'material', e.target.value)}
                  placeholder="Material"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`approximateQuantity-${index}`} className="block text-sm font-medium text-gray-900">
                  Approximate Quantity
                </label>
                <input
                  id={`approximateQuantity-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.approximateQuantity}
                  onChange={(e) =>
                    handleChange(index, 'approximateQuantity', e.target.value)
                  }
                  placeholder="Approximate Quantity"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`disposedBy-${index}`} className="block text-sm font-medium text-gray-900">
                  Disposed By
                </label>
                <input
                  id={`disposedBy-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.disposedBy}
                  onChange={(e) => handleChange(index, 'disposedBy', e.target.value)}
                  placeholder="Disposed By"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`methodOfDisposal-${index}`} className="block text-sm font-medium text-gray-900">
                  Method of Disposal
                </label>
                <input
                  id={`methodOfDisposal-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.methodOfDisposal}
                  onChange={(e) =>
                    handleChange(index, 'methodOfDisposal', e.target.value)
                  }
                  placeholder="Method of Disposal"
                />
              </div>

              <div className="col-span-full md:col-span-3 xl:col-span-2">
                <label htmlFor={`disposalLocation-${index}`} className="block text-sm font-medium text-gray-900">
                  Disposal Location
                </label>
                <input
                  id={`disposalLocation-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.disposalLocation}
                  onChange={(e) =>
                    handleChange(index, 'disposalLocation', e.target.value)
                  }
                  placeholder="Disposal Location"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleChange(index, 'comments', e.target.value)}
                  placeholder="Comments"
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Waste Entry" onClick={addWasteEntry} />
    </>
  );
}

function Restrooms() {
  const [restroomEntries, setRestroomEntries] = useState([]);
  const restroomRefs = useRef([]);

  const handleRestroomChange = (index, field, value) => {
    setRestroomEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addRestroomEntry = () => {
    setRestroomEntries((current) => [
      ...current,
      {
        company: '',
        delivered: '',
        removed: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeRestroomEntry = (index) => {
    setRestroomEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      restroomEntries.length > 0 &&
      restroomEntries[restroomEntries.length - 1].added
    ) {
      const element = restroomRefs.current[restroomEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [restroomEntries]);

  return (
    <>
      {restroomEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (restroomRefs.current[index] = el)}
          className="relative bg-white border-b"
        >
          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Restroom Entry" onClick={() => removeRestroomEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Restroom Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-1">
                <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-900">
                  Company
                </label>
                <input
                  id={`company-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.company}
                  onChange={(e) => handleRestroomChange(index, 'company', e.target.value)}
                  placeholder="Company"
                />
              </div>

              <div className="col-span-full md:col-span-1">
                <label htmlFor={`delivered-${index}`} className="block text-sm font-medium text-gray-900">
                  # Delivered
                </label>
                <input
                  id={`delivered-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.delivered}
                  onChange={(e) => handleRestroomChange(index, 'delivered', e.target.value)}
                  placeholder="# Delivered"
                  min="0"
                />
              </div>

              <div className="col-span-full md:col-span-1">
                <label htmlFor={`removed-${index}`} className="block text-sm font-medium text-gray-900">
                  # Removed
                </label>
                <input
                  id={`removed-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.removed}
                  onChange={(e) => handleRestroomChange(index, 'removed', e.target.value)}
                  placeholder="# Removed"
                  min="0"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleRestroomChange(index, 'comments', e.target.value)}
                  placeholder="Comments"
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                  <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Restroom Entry" onClick={addRestroomEntry} />
    </>
  );
}

function ScheduledWork() {
  const [workEntries, setWorkEntries] = useState([]);
  const workRefs = useRef([]);

  const handleWorkDataChange = (index, field, value) => {
    setWorkEntries((current) =>
      current.map((entry, idx) => {
        if (idx === index) {
          const updatedEntry = { ...entry, [field]: value };
          const total = updatedEntry.workers * updatedEntry.hours * updatedEntry.rate;
          return { ...updatedEntry, total };
        }
        return entry;
      })
    );
  };

  const addWorkEntry = () => {
    setWorkEntries((current) => [
      ...current,
      {
        resource: '',
        scheduledTasks: '',
        showed: '',
        reimbursed: '',
        workers: 0,
        hours: 0,
        rate: 0,
        total: 0,
        comments: '',
        added: true,
      },
    ]);
  };

  const removeWorkEntry = (index) => {
    setWorkEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      workEntries.length > 0 &&
      workEntries[workEntries.length - 1].added
    ) {
      const element = workRefs.current[workEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [workEntries]);

  return (
    <>
      {workEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (workRefs.current[index] = el)}
          className="relative bg-white border-b"
        >
          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton title="Scheduled Work Entry" onClick={() => removeWorkEntry(index)} />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-4 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Work Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`resource-${index}`} className="block text-sm font-medium text-gray-900">
                  Company / Resource
                </label>
                <input
                  id={`resource-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.resource}
                  onChange={(e) => handleWorkDataChange(index, 'resource', e.target.value)}
                  placeholder="Company / Resource"
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`scheduledTasks-${index}`} className="block text-sm font-medium text-gray-900">
                  Scheduled Tasks
                </label>
                <input
                  id={`scheduledTasks-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.scheduledTasks}
                  onChange={(e) => handleWorkDataChange(index, 'scheduledTasks', e.target.value)}
                  placeholder="Scheduled Tasks"
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`showed-${index}`} className="block text-sm font-medium text-gray-900">
                  Showed?
                </label>
                <select
                  id={`showed-${index}`}
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.showed}
                  onChange={(e) => handleWorkDataChange(index, 'showed', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`reimbursed-${index}`} className="block text-sm font-medium text-gray-900">
                  Reimbursed?
                </label>
                <select
                  id={`reimbursed-${index}`}
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.reimbursed}
                  onChange={(e) => handleWorkDataChange(index, 'reimbursed', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`workers-${index}`} className="block text-sm font-medium text-gray-900">
                  Workers
                </label>
                <input
                  id={`workers-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.workers}
                  onChange={(e) => handleWorkDataChange(index, 'workers', parseInt(e.target.value, 10))}
                  min="0"
                  placeholder="Workers"
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`hours-${index}`} className="block text-sm font-medium text-gray-900">
                  Hours
                </label>
                <input
                  id={`hours-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.hours}
                  onChange={(e) => handleWorkDataChange(index, 'hours', parseFloat(e.target.value))}
                  min="0"
                  placeholder="Hours"
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`rate-${index}`} className="block text-sm font-medium text-gray-900">
                  Hourly Rate
                </label>
                <input
                  id={`rate-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.rate}
                  onChange={(e) => handleWorkDataChange(index, 'rate', parseFloat(e.target.value))}
                  min="0"
                  step="0.01"
                  placeholder="Hourly Rate"
                />
              </div>

              <div className="col-span-full md:col-span-2 xl:col-span-1">
                <label htmlFor={`total-${index}`} className="block text-sm font-medium text-gray-900">
                  Total
                </label>
                <input
                  id={`total-${index}`}
                  type="number"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.total}
                  readOnly
                  placeholder="Total"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleWorkDataChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Work Entry" onClick={addWorkEntry} />
    </>
  );
}

function Delays({ locations = [] }) {
  const [delayEntries, setDelayEntries] = useState([]);
  const delayRefs = useRef([]);

  const handleChange = (index, field, value) => {
    setDelayEntries((current) =>
      current.map((entry, idx) => {
        if (idx === index) {
          const updatedEntry = { ...entry, [field]: value };

          if (field === 'startTime' || field === 'endTime') {
            const startTime = new Date(updatedEntry.startTime);
            const endTime = new Date(updatedEntry.endTime);
            const duration = (endTime - startTime) / 3600000; // Convert milliseconds to hours
            updatedEntry.duration = duration > 0 ? duration.toFixed(2) : '0';
          }

          return updatedEntry;
        }
        return entry;
      })
    );
  };

  const addDelayEntry = () => {
    setDelayEntries((current) => [
      ...current,
      {
        delayType: '',
        startTime: '',
        endTime: '',
        duration: '',
        location: '',
        comments: '',
        added: true,
      },
    ]);
  };

  const removeDelayEntry = (index) => {
    setDelayEntries((current) =>
      current.filter((_, idx) => idx !== index)
    );
  };

  useEffect(() => {
    if (
      delayEntries.length > 0 &&
      delayEntries[delayEntries.length - 1].added
    ) {
      const element = delayRefs.current[delayEntries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [delayEntries]);

  return (
    <>
      {delayEntries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (delayRefs.current[index] = el)}
          className="relative bg-white border-b"
        >
          <div className="grid grid-cols-7 gap-4 py-2">
            <div
              className="col-span-1 md:col-span-2 flex items-center justify-start"
              style={{ width: '350px' }}
            >
              <RemoveButton
                title="Delay Entry"
                onClick={() => removeDelayEntry(index)}
              />
            </div>
            <div className="col-span-6 md:col-span-5 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4">
              <div className="col-span-full grid grid-cols-2 md:hidden">
                <div className="flex items-center justify-start pl-1 font-semibold col-span-2">
                  <h2> Delay Entry #{index + 1} </h2>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor={`delayType-${index}`} className="block text-sm font-medium text-gray-900">
                  Delay Type
                </label>
                <input
                  id={`delayType-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.delayType}
                  onChange={(e) => handleChange(index, 'delayType', e.target.value)}
                  placeholder="Delay Type"
                />
              </div>

              <div className="col-span-full md:col-span-3">
                <label htmlFor={`duration-${index}`} className="block text-sm font-medium text-gray-900">
                  Duration (hours)
                </label>
                <input
                  id={`duration-${index}`}
                  type="text"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.duration}
                  readOnly
                  placeholder="Duration (hours)"
                />
              </div>

              <div className="col-span-full md:col-span-3">
                <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-900">
                  Location
                </label>
                <select
                  id={`location-${index}`}
                  className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={entry.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                >
                  <option value="">Select Location...</option>
                  {locations.map((location, idx) => (
                    <option key={idx} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full md:col-span-3">
                <label htmlFor={`startTime-${index}`} className="block text-sm font-medium text-gray-900">
                  Start Time
                </label>
                <input
                  id={`startTime-${index}`}
                  type="datetime-local"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.startTime}
                  onChange={(e) => handleChange(index, 'startTime', e.target.value)}
                />
              </div>

              <div className="col-span-full md:col-span-3">
                <label htmlFor={`endTime-${index}`} className="block text-sm font-medium text-gray-900">
                  End Time
                </label>
                <input
                  id={`endTime-${index}`}
                  type="datetime-local"
                  className="mt-1 block w-full py-1 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.endTime}
                  onChange={(e) => handleChange(index, 'endTime', e.target.value)}
                />
              </div>

              <div className="col-span-full">
                <label htmlFor={`comments-${index}`} className="block text-sm font-medium text-gray-900">
                  Comments
                </label>
                <textarea
                  id={`comments-${index}`}
                  rows="2"
                  className="mt-1 block w-full py-1 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={entry.comments}
                  onChange={(e) => handleChange(index, 'comments', e.target.value)}
                  placeholder="Enter your comments here..."
                />
              </div>
              <div className="flex items-center justify-end text-gray-400 text-sm col-span-full">
                <h2>Edited by: Wyatt Cooper</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      <AddButton title="Add Delay Entry" onClick={addDelayEntry} />
    </>
  );
}

function Photos({ photos, setPhotos }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);  // Ref for the hidden file input

  const handleDragOver = (e) => {
      e.preventDefault();
      setDragOver(true);
  };

  const handleDragLeave = (e) => {
      e.preventDefault();
      setDragOver(false);
  };

  const handleDrop = (e) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files) {
          handleFileChange(e.dataTransfer.files);
      }
  };

  const handleFileChange = (files) => {
      Array.from(files).forEach(file => {
          if (!file.type.startsWith('image/')) return;
          const reader = new FileReader();
          reader.onload = (e) => {
              setPhotos(prevPhotos => [...prevPhotos, { src: e.target.result, file }]);
          };
          reader.readAsDataURL(file);
      });
  };

  const handleAreaClick = () => {
      fileInputRef.current.click();  // Trigger the hidden file input click
  };

  const removePhoto = (e, index) => {
    e.stopPropagation();  // Prevent any parent handlers from being executed
    e.preventDefault();   // Prevent the browser default behavior
    setPhotos(prev => prev.filter((_, idx) => idx !== index));
};

  return (
      <div className="grid grid-cols-1 gap-6 pt-6">
          <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleAreaClick}  // Attach click handler to trigger file input
              className={`flex flex-col items-center justify-center px-10 py-16 border-4 rounded-lg cursor-pointer transition-colors 
                          ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:bg-blue-100'}`}
          >
              <input 
                  ref={fileInputRef} 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
              />
              <MdPhotoCamera size={60} className="text-blue-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">
                  {dragOver ? "Release to upload" : "Drag 'n' drop or click to upload"}
              </p>
              <p className="text-sm text-gray-500">You can also use your camera on mobile.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                      <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                          <img
                              src={photo.src}
                              alt="Preview"
                              className="object-cover h-full w-full transition-transform duration-200 group-hover:scale-105"
                          />
                      </div>
                      <button
                          onClick={(e) => removePhoto(e, index)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500 hover:text-red-600 transition-colors shadow-lg"
                      >
                          <MdClose size={24} />
                      </button>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default function NewDailyLogForm({ companyData, currentTab, handleTabClick, tabs }) {
  const [weatherConditions, setWeatherConditions] = useState([]);
  const [manpowerEntries, setManpowerEntries] = useState([]);
  const [equipmentEntries, setEquipmentEntries] = useState([]);
  const [visitorEntries, setVisitorEntries] = useState([]);
  const [callEntries, setCallEntries] = useState([]);
  const [inspectionEntries, setInspectionEntries] = useState([]);
  const [deliveryEntries, setDeliveryEntries] = useState([]);
  const [violationEntries, setViolationEntries] = useState([]);
  const [accidentEntries, setAccidentEntries] = useState([]);
  const [dumpsterEntries, setDumpsterEntries] = useState([]);
  const [wasteEntries, setWasteEntries] = useState([]);
  const [restroomEntries, setRestroomEntries] = useState([]);
  const [workEntries, setWorkEntries] = useState([]);
  const [delayEntries, setDelayEntries] = useState([]);
  const [noteEntries, setNoteEntries] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(true);
  }, [
    weatherConditions,
    manpowerEntries,
    equipmentEntries,
    visitorEntries,
    callEntries,
    inspectionEntries,
    deliveryEntries,
    violationEntries,
    accidentEntries,
    dumpsterEntries,
    wasteEntries,
    restroomEntries,
    workEntries,
    delayEntries,
    noteEntries,
    photos,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Weather Conditions:', weatherConditions);
    console.log('Manpower Entries:', manpowerEntries);
    console.log('Equipment Entries:', equipmentEntries);
    console.log('Visitor Entries:', visitorEntries);
    console.log('Call Entries:', callEntries);
    console.log('Inspection Entries:', inspectionEntries);
    console.log('Delivery Entries:', deliveryEntries);
    console.log('Violation Entries:', violationEntries);
    console.log('Accident Entries:', accidentEntries);
    console.log('Dumpster Entries:', dumpsterEntries);
    console.log('Waste Entries:', wasteEntries);
    console.log('Restroom Entries:', restroomEntries);
    console.log('Work Entries:', workEntries);
    console.log('Delay Entries:', delayEntries);
    console.log('Note Entries:', noteEntries);
    console.log('Photos:', photos);

    // Reset the form state and set hasChanges to false
    setWeatherConditions([]);
    setManpowerEntries([]);
    setEquipmentEntries([]);
    setVisitorEntries([]);
    setCallEntries([]);
    setInspectionEntries([]);
    setDeliveryEntries([]);
    setViolationEntries([]);
    setAccidentEntries([]);
    setDumpsterEntries([]);
    setWasteEntries([]);
    setRestroomEntries([]);
    setWorkEntries([]);
    setDelayEntries([]);
    setNoteEntries([]);
    setPhotos([]);
    setHasChanges(false);
  };


  return (
    <>

      {/* Sticky MenuTabs */}
<div className="sticky top-0 z-50 bg-white pt-2 ">
  <MenuTabs
    tabs={tabs}
    currentTab={currentTab}
    handleTabClick={handleTabClick}
  />
  <div className="flex items-center justify-between pb-4 py-2.5">
    <button
      type="button"
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
    >
      <span className="sr-only">Previous month</span>
      <ChevronLeftIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
    </button>
    <div className="text-sm font-semibold text-gray-900">
      10/18/2024
    </div>
    <button
      type="button"
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
    >
      <span className="sr-only">Next month</span>
      <ChevronRightIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
    </button>
  </div>
</div>

    <form>
    <div className="rounded-md md:py-2 py-1.5 ">
<hr />
    </div>
      <ObservedWeatherConditions
        weatherConditions={weatherConditions}
        setWeatherConditions={setWeatherConditions}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Manpower
        companies={companyData}
        manpowerEntries={manpowerEntries}
        setManpowerEntries={setManpowerEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Equipment
        equipmentEntries={equipmentEntries}
        setEquipmentEntries={setEquipmentEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Visitors
        visitorEntries={visitorEntries}
        setVisitorEntries={setVisitorEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <PhoneCalls
        callEntries={callEntries}
        setCallEntries={setCallEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Inspections
        inspectionEntries={inspectionEntries}
        setInspectionEntries={setInspectionEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Deliveries
        deliveryEntries={deliveryEntries}
        setDeliveryEntries={setDeliveryEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <SafetyViolations
        violationEntries={violationEntries}
        setViolationEntries={setViolationEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Accidents
        accidentEntries={accidentEntries}
        setAccidentEntries={setAccidentEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Dumpster
        dumpsterEntries={dumpsterEntries}
        setDumpsterEntries={setDumpsterEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Waste
        wasteEntries={wasteEntries}
        setWasteEntries={setWasteEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Restrooms
        restroomEntries={restroomEntries}
        setRestroomEntries={setRestroomEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <ScheduledWork
        workEntries={workEntries}
        setWorkEntries={setWorkEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Delays
        delayEntries={delayEntries}
        setDelayEntries={setDelayEntries}
      />
      <div className=" rounded-md md:py-2 py-1.5"><hr /></div>
      <Photos photos={photos} setPhotos={setPhotos} />
       {/* padding at the bottom of the form */}
       <div className="pb-24"></div>
    </form>
    <StickyFooter onSave={handleSubmit} hasChanges={hasChanges}/>
    </>
  );
}