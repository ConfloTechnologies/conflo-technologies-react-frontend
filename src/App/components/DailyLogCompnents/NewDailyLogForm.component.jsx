import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MdAdd, MdClose, MdCloudUpload } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';

function SectionButton({ title, onClick }) {
  return (
    <div className="flex items-center justify-start py-2 border-y">
      <button
        type="button"
        onClick={onClick}
        className="ml-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition ease-in-out duration-300 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
      >
        <MdAdd className="w-full h-full" />
      </button>
      <div className="flex items-center justify-end px-4 font-semibold">
        <h2>{title}</h2>
      </div>
    </div>
  );
}



function ObservedWeatherConditions({}) {
  const [weatherConditions, setWeatherConditions] = useState([]);
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >  
          <div className='border-b p-2'>
            <button
              onClick={() => removeWeatherCondition(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove weather condition ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className='font-semibold text-gray-700'> Weather Condition #{index + 1}</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`timeStart-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Time Start
              </label>
              <input
                id={`timeStart-${index}`}
                type="text"
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={condition.timeStart}
                onChange={(e) =>
                  handleWeatherChange(index, 'timeStart', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`timeEnd-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Time End
              </label>
              <input
                id={`timeEnd-${index}`}
                type="text"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={condition.timeEnd}
                onChange={(e) =>
                  handleWeatherChange(index, 'timeEnd', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`temperature-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Temperature
              </label>
              <input
                id={`temperature-${index}`}
                type="number"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={condition.temperature}
                onChange={(e) =>
                  handleWeatherChange(index, 'temperature', e.target.value)
                }
                placeholder="°F"
              />
            </div>

            <div>
              <label
                htmlFor={`condition-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Condition
              </label>
              <select
                id={`condition-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={condition.condition}
                onChange={(e) =>
                  handleWeatherChange(index, 'condition', e.target.value)
                }
              >
                <option value="">Select...</option>
                <option value="rain">Rain</option>
                <option value="wind">Wind</option>
                <option value="snow">Snow</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={condition.comments}
                onChange={(e) =>
                  handleWeatherChange(index, 'comments', e.target.value)
                }
                placeholder="Enter your comments here..."
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Weather Condition" onClick={addWeatherCondition} />
    </>
  );
}


function Manpower({ companies = [], locations = [] }) {
  const [manpowerEntries, setManpowerEntries] = useState([]);
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
        numWorkers: 0,
        numHours: 0,
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >  
          <div className='border-b p-2'>
            <button
              onClick={() => removeManpowerEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove manpower entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className='font-semibold text-gray-700'> Manpower Entry #{index + 1}</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`company-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Company
              </label>
              <select
                id={`company-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.company}
                onChange={(e) =>
                  handleManpowerChange(index, 'company', e.target.value)
                }
              >
                <option value="">Select...</option>
                {companies.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`workers-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Workers
              </label>
              <input
                id={`workers-${index}`}
                type="number"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.workers}
                onChange={(e) =>
                  handleManpowerChange(index, 'workers', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`hours-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Hours
              </label>
              <input
                id={`hours-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.hours}
                onChange={(e) =>
                  handleManpowerChange(index, 'hours', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`location-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Location
              </label>
              <select
                id={`location-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.location}
                onChange={(e) =>
                  handleManpowerChange(index, 'location', e.target.value)
                }
              >
                <option value="">Select...</option>
                {locations.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleManpowerChange(index, 'comments', e.target.value)
                }
                placeholder="Enter your comments here..."
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Manpower Entry" onClick={addManpowerEntry} />
    </>
  );
}


function Equipment({ locations = [], costCodes = [], equipmentTypes = [] }) {
  const [equipmentEntries, setEquipmentEntries] = useState([]);
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeEquipmentEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove equipment entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Equipment Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`type-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Equipment Type
              </label>
              <select
                id={`type-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.type}
                onChange={(e) =>
                  handleEquipmentChange(index, 'type', e.target.value)
                }
              >
                <option value="">Select...</option>
                {equipmentTypes.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`hoursOperating-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Hours Operating
              </label>
              <input
                id={`hoursOperating-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.hoursOperating}
                onChange={(e) =>
                  handleEquipmentChange(index, 'hoursOperating', parseInt(e.target.value, 10))
                }
                placeholder="Hours Operating"
                min="0"
              />
            </div>

            <div>
              <label
                htmlFor={`hoursIdle-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Hours Idle
              </label>
              <input
                id={`hoursIdle-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.hoursIdle}
                onChange={(e) =>
                  handleEquipmentChange(index, 'hoursIdle', parseInt(e.target.value, 10))
                }
                placeholder="Hours Idle"
                min="0"
              />
            </div>

            <div>
              <label
                htmlFor={`costCode-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Cost Code
              </label>
              <select
                id={`costCode-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.costCode}
                onChange={(e) =>
                  handleEquipmentChange(index, 'costCode', e.target.value)
                }
              >
                <option value="">Select...</option>
                {costCodes.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`location-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Location
              </label>
              <select
                id={`location-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.location}
                onChange={(e) =>
                  handleEquipmentChange(index, 'location', e.target.value)
                }
              >
                <option value="">Select...</option>
                {locations.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`inspected-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Inspected
              </label>
              <select
                id={`inspected-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.inspected}
                onChange={(e) =>
                  handleEquipmentChange(index, 'inspected', e.target.value)
                }
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleEquipmentChange(index, 'comments', e.target.value)
                }
                placeholder="Enter your comments here..."
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Equipment Entry" onClick={addEquipmentEntry} />
    </>
  );
}


function Visitors() {
  const [visitorEntries, setVisitorEntries] = useState([]);
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeVisitorEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove visitor entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Visitor Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`name-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                id={`name-${index}`}
                type="text"
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.name}
                onChange={(e) =>
                  handleVisitorChange(index, 'name', e.target.value)
                }
                placeholder="Name"
              />
            </div>

            <div>
              <label
                htmlFor={`start-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Start
              </label>
              <input
                id={`start-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.start}
                onChange={(e) =>
                  handleVisitorChange(index, 'start', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`end-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                End
              </label>
              <input
                id={`end-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.end}
                onChange={(e) =>
                  handleVisitorChange(index, 'end', e.target.value)
                }
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleVisitorChange(index, 'comments', e.target.value)
                }
                placeholder="Enter your comments here..."
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Visitor Entry" onClick={addVisitorEntry} />
    </>
  );
}

function PhoneCalls({ people = [], companies = [] }) {
  const [callEntries, setCallEntries] = useState([]);
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeCallEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove phone call entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Phone Call Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`toFrom-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                To/From
              </label>
              <select
                id={`toFrom-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.toFrom}
                onChange={(e) =>
                  handleCallChange(index, 'toFrom', e.target.value)
                }
              >
                <option value="">Select...</option>
                <option value="to">TO:</option>
                <option value="from">FROM:</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={`toFromName-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                id={`toFromName-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border-b border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.toFromName}
                onChange={(e) =>
                  handleCallChange(index, 'toFromName', e.target.value)
                }
                placeholder={`${entry.toFrom === 'to' ? 'Recipient' : 'Caller'} name`}
              />
            </div>

            <div>
              <label
                htmlFor={`company-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Company
              </label>
              <select
                id={`company-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.company}
                onChange={(e) =>
                  handleCallChange(index, 'company', e.target.value)
                }
              >
                <option value="">Select...</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`start-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Start
              </label>
              <input
                id={`start-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.start}
                onChange={(e) =>
                  handleCallChange(index, 'start', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`end-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                End
              </label>
              <input
                id={`end-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.end}
                onChange={(e) =>
                  handleCallChange(index, 'end', e.target.value)
                }
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleCallChange(index, 'comments', e.target.value)
                }
                placeholder="Enter your comments here..."
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Phone Call Entry" onClick={addCallEntry} />
    </>
  );
}

function Inspections({ locations = [] }) {
  const [inspectionEntries, setInspectionEntries] = useState([]);
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeInspectionEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove inspection entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Inspection Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`start-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Start
              </label>
              <input
                id={`start-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.start}
                onChange={(e) =>
                  handleInspectionChange(index, 'start', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`end-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                End
              </label>
              <input
                id={`end-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.end}
                onChange={(e) =>
                  handleInspectionChange(index, 'end', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`inspectionType-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Inspection Type
              </label>
              <input
                id={`inspectionType-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.inspectionType}
                onChange={(e) =>
                  handleInspectionChange(index, 'inspectionType', e.target.value)
                }
                placeholder="Inspection Type"
              />
            </div>

            <div>
              <label
                htmlFor={`inspectionEntity-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Inspection Entity
              </label>
              <input
                id={`inspectionEntity-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.inspectionEntity}
                onChange={(e) =>
                  handleInspectionChange(index, 'inspectionEntity', e.target.value)
                }
                placeholder="Inspection Entity"
              />
            </div>

            <div>
              <label
                htmlFor={`inspectorName-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Inspector Name
              </label>
              <input
                id={`inspectorName-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.inspectorName}
                onChange={(e) =>
                  handleInspectionChange(index, 'inspectorName', e.target.value)
                }
                placeholder="Inspector Name"
              />
            </div>

            <div>
              <label
                htmlFor={`location-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Location
              </label>
              <select
                id={`location-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.location}
                onChange={(e) =>
                  handleInspectionChange(index, 'location', e.target.value)
                }
              >
                <option value="">Select...</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleInspectionChange(index, 'comments', e.target.value)
                }
                placeholder="Enter your comments here..."
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Inspection Entry" onClick={addInspectionEntry} />
    </>
  );
}


function Deliveries() {
  const [deliveryEntries, setDeliveryEntries] = useState([]);
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeDeliveryEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove delivery entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Delivery Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`time-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Time
              </label>
              <input
                id={`time-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.time}
                onChange={(e) =>
                  handleDeliveryChange(index, 'time', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`deliveryFrom-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Delivery From
              </label>
              <input
                id={`deliveryFrom-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.deliveryFrom}
                onChange={(e) =>
                  handleDeliveryChange(index, 'deliveryFrom', e.target.value)
                }
                placeholder="Delivery From"
              />
            </div>

            <div>
              <label
                htmlFor={`trackingNumber-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Tracking Number
              </label>
              <input
                id={`trackingNumber-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.trackingNumber}
                onChange={(e) =>
                  handleDeliveryChange(index, 'trackingNumber', e.target.value)
                }
                placeholder="Tracking Number"
              />
            </div>
            <div className="md:col-span-3">
              <label
                htmlFor={`contents-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Contents
              </label>
              <input
                id={`contents-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.contents}
                onChange={(e) =>
                  handleDeliveryChange(index, 'contents', e.target.value)
                }
                placeholder="Contents"
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleDeliveryChange(index, 'comments', e.target.value)
                }
                placeholder="Enter your comments here..."
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Delivery Entry" onClick={addDeliveryEntry} />
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeViolationEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove safety violation entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Safety Violation Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`time-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Time
              </label>
              <input
                id={`time-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.time}
                onChange={(e) =>
                  handleViolationChange(index, 'time', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`subject-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Subject
              </label>
              <input
                id={`subject-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.subject}
                onChange={(e) =>
                  handleViolationChange(index, 'subject', e.target.value)
                }
                placeholder="Subject"
              />
            </div>

            <div>
              <label
                htmlFor={`safetyNotice-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Safety Notice
              </label>
              <input
                id={`safetyNotice-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.safetyNotice}
                onChange={(e) =>
                  handleViolationChange(index, 'safetyNotice', e.target.value)
                }
                placeholder="Safety Notice"
              />
            </div>

            <div>
              <label
                htmlFor={`issuesTo-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Issues To
              </label>
              <select
                id={`issuesTo-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.issuesTo}
                onChange={(e) =>
                  handleViolationChange(index, 'issuesTo', e.target.value)
                }
              >
                <option value="">Select...</option>
                {issuesToOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`complianceDue-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Compliance Due
              </label>
              <input
                id={`complianceDue-${index}`}
                type="date"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.complianceDue}
                onChange={(e) =>
                  handleViolationChange(index, 'complianceDue', e.target.value)
                }
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleViolationChange(index, 'comments', e.target.value)
                }
                placeholder="Enter your comments here..."
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Safety Violation Entry" onClick={addViolationEntry} />
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeAccidentEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove accident entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Accident Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`time-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Time
              </label>
              <input
                id={`time-${index}`}
                type="time"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.time}
                onChange={(e) =>
                  handleAccidentChange(index, 'time', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`partyInvolved-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Party Involved
              </label>
              <input
                id={`partyInvolved-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.partyInvolved}
                onChange={(e) =>
                  handleAccidentChange(index, 'partyInvolved', e.target.value)
                }
                placeholder="Party Involved"
              />
            </div>

            <div>
              <label
                htmlFor={`companyInvolved-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Company Involved
              </label>
              <input
                id={`companyInvolved-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.companyInvolved}
                onChange={(e) =>
                  handleAccidentChange(index, 'companyInvolved', e.target.value)
                }
                placeholder="Company Involved"
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Additional Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleAccidentChange(index, 'comments', e.target.value)
                }
                placeholder="Additional Comments"
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Accident Entry" onClick={addAccidentEntry} />
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeDumpsterEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove dumpster entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Dumpster Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`company-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Company
              </label>
              <input
                id={`company-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.company}
                onChange={(e) =>
                  handleDumpsterChange(index, 'company', e.target.value)
                }
                placeholder="Company"
              />
            </div>

            <div>
              <label
                htmlFor={`delivered-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                # Delivered
              </label>
              <input
                id={`delivered-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.delivered}
                onChange={(e) =>
                  handleDumpsterChange(index, 'delivered', e.target.value)
                }
                placeholder="# Delivered"
                min="0"
              />
            </div>

            <div>
              <label
                htmlFor={`removed-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                # Removed
              </label>
              <input
                id={`removed-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.removed}
                onChange={(e) =>
                  handleDumpsterChange(index, 'removed', e.target.value)
                }
                placeholder="# Removed"
                min="0"
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleDumpsterChange(index, 'comments', e.target.value)
                }
                placeholder="Comments"
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Dumpster Entry" onClick={addDumpsterEntry} />
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeWasteEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove waste entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Waste Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`time-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Time
              </label>
              <input
                id={`time-${index}`}
                type="datetime-local"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.time}
                onChange={(e) => handleChange(index, 'time', e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor={`material-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Material
              </label>
              <input
                id={`material-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.material}
                onChange={(e) => handleChange(index, 'material', e.target.value)}
                placeholder="Material"
              />
            </div>

            <div>
              <label
                htmlFor={`disposedBy-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Disposed By
              </label>
              <input
                id={`disposedBy-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.disposedBy}
                onChange={(e) => handleChange(index, 'disposedBy', e.target.value)}
                placeholder="Disposed By"
              />
            </div>

            <div>
              <label
                htmlFor={`methodOfDisposal-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Method of Disposal
              </label>
              <input
                id={`methodOfDisposal-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.methodOfDisposal}
                onChange={(e) =>
                  handleChange(index, 'methodOfDisposal', e.target.value)
                }
                placeholder="Method of Disposal"
              />
            </div>

            <div>
              <label
                htmlFor={`disposalLocation-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Disposal Location
              </label>
              <input
                id={`disposalLocation-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.disposalLocation}
                onChange={(e) =>
                  handleChange(index, 'disposalLocation', e.target.value)
                }
                placeholder="Disposal Location"
              />
            </div>

            <div>
              <label
                htmlFor={`approximateQuantity-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Approximate Quantity
              </label>
              <input
                id={`approximateQuantity-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.approximateQuantity}
                onChange={(e) =>
                  handleChange(index, 'approximateQuantity', e.target.value)
                }
                placeholder="Approximate Quantity"
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) => handleChange(index, 'comments', e.target.value)}
                placeholder="Comments"
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Waste Entry" onClick={addWasteEntry} />
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeRestroomEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove restroom entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Restroom Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`company-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Company
              </label>
              <input
                id={`company-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.company}
                onChange={(e) =>
                  handleRestroomChange(index, 'company', e.target.value)
                }
                placeholder="Company"
              />
            </div>

            <div>
              <label
                htmlFor={`delivered-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                # Delivered
              </label>
              <input
                id={`delivered-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.delivered}
                onChange={(e) =>
                  handleRestroomChange(index, 'delivered', e.target.value)
                }
                placeholder="# Delivered"
                min="0"
              />
            </div>

            <div>
              <label
                htmlFor={`removed-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                # Removed
              </label>
              <input
                id={`removed-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.removed}
                onChange={(e) =>
                  handleRestroomChange(index, 'removed', e.target.value)
                }
                placeholder="# Removed"
                min="0"
              />
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleRestroomChange(index, 'comments', e.target.value)
                }
                placeholder="Comments"
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Restroom Entry" onClick={addRestroomEntry} />
    </>
  );
}


function ScheduledWork() {
  const [workEntries, setWorkEntries] = useState([]);
  const workRefs = useRef([]);

  const handleChange = (index, field, value) => {
    setWorkEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeWorkEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove work entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Work Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`resource-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Resource
              </label>
              <input
                id={`resource-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.resource}
                onChange={(e) =>
                  handleChange(index, 'resource', e.target.value)
                }
                placeholder="Resource"
              />
            </div>

            <div>
              <label
                htmlFor={`scheduledTasks-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Scheduled Tasks
              </label>
              <input
                id={`scheduledTasks-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.scheduledTasks}
                onChange={(e) =>
                  handleChange(index, 'scheduledTasks', e.target.value)
                }
                placeholder="Scheduled Tasks"
              />
            </div>

            <div>
              <label
                htmlFor={`showed-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Showed?
              </label>
              <select
                id={`showed-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.showed}
                onChange={(e) =>
                  handleChange(index, 'showed', e.target.value)
                }
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={`reimbursed-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Reimbursed?
              </label>
              <select
                id={`reimbursed-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.reimbursed}
                onChange={(e) =>
                  handleChange(index, 'reimbursed', e.target.value)
                }
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label
                htmlFor={`workers-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Workers
              </label>
              <input
                id={`workers-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.workers}
                onChange={(e) =>
                  handleChange(index, 'workers', parseInt(e.target.value, 10))
                }
                min="0"
                placeholder="Workers"
              />
            </div>

            <div>
              <label
                htmlFor={`hours-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Hours
              </label>
              <input
                id={`hours-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.hours}
                onChange={(e) =>
                  handleChange(index, 'hours', parseFloat(e.target.value))
                }
                min="0"
                placeholder="Hours"
              />
            </div>

            <div>
              <label
                htmlFor={`rate-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Rate
              </label>
              <input
                id={`rate-${index}`}
                type="number"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.rate}
                onChange={(e) =>
                  handleChange(index, 'rate', parseFloat(e.target.value))
                }
                min="0"
                step="0.01"
                placeholder="Rate"
              />
            </div>

            <div className="md:col-span-4">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleChange(index, 'comments', e.target.value)
                }
                placeholder="Comments"
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Work Entry" onClick={addWorkEntry} />
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

          // Automatically calculate and update the duration when start or end time changes
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
      { delayType: '', startTime: '', endTime: '', duration: '', location: '', comments: '', added: true },
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
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeDelayEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove delay entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Delay Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            

            <div>
              <label
                htmlFor={`startTime-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Start Time
              </label>
              <input
                id={`startTime-${index}`}
                type="datetime-local"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.startTime}
                onChange={(e) =>
                  handleChange(index, 'startTime', e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor={`endTime-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                End Time
              </label>
              <input
                id={`endTime-${index}`}
                type="datetime-local"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.endTime}
                onChange={(e) =>
                  handleChange(index, 'endTime', e.target.value)
                }
              />
            </div>

            <div className='hidden sm:block'></div>

            <div>
              <label
                htmlFor={`delayType-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Delay Type
              </label>
              <input
                id={`delayType-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.delayType}
                onChange={(e) =>
                  handleChange(index, 'delayType', e.target.value)
                }
                placeholder="Delay Type"
              />
            </div>

            <div>
              <label
                htmlFor={`duration-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Duration (hours)
              </label>
              <input
                id={`duration-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.duration}
                readOnly
                placeholder="Duration (hours)"
              />
            </div>

            <div>
              <label
                htmlFor={`location-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Location
              </label>
              <select
                id={`location-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.location}
                onChange={(e) =>
                  handleChange(index, 'location', e.target.value)
                }
              >
                <option value="">Select Location...</option>
                {locations.map((location, idx) => (
                  <option key={idx} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comments-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comments
              </label>
              <textarea
                id={`comments-${index}`}
                rows="2"
                className="mt-1 block w-full py-1 md:py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comments}
                onChange={(e) =>
                  handleChange(index, 'comments', e.target.value)
                }
                placeholder="Comments"
              />
            </div>
          </div>
        </div>
      ))}
      <SectionButton title="Add Delay Entry" onClick={addDelayEntry} />
    </>
  );
}


function Notes({ locations = [] }) {
  const [entries, setEntries] = useState([]);
  const entryRefs = useRef([]);

  const handleChange = (index, field, value) => {
    setEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addEntry = () => {
    setEntries((current) => [
      ...current,
      { issue: '', location: '', comment: '', attachment: '', added: true },
    ]);
  };

  const removeEntry = (index) => {
    setEntries((current) => current.filter((_, idx) => idx !== index));
  };

  const handleFileChange = (index, file) => {
    setEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, attachment: file } : entry
      )
    );
  };

  const removeFile = (index) => {
    setEntries((current) =>
      current.map((entry, idx) =>
        idx === index ? { ...entry, attachment: null } : entry
      )
    );
  };

  useEffect(() => {
    if (entries.length > 0 && entries[entries.length - 1].added) {
      const element = entryRefs.current[entries.length - 1];
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [entries]);

  return (
    <>
      {entries.map((entry, index) => (
        <div
          key={index}
          ref={(el) => (entryRefs.current[index] = el)}
          className="relative border border-gray-300 rounded-md m-4 shadow-sm mb-4 bg-white"
        >
          <div className="border-b p-2">
            <button
              onClick={() => removeEntry(index)}
              className="absolute top-0 right-0 pr-2 pt-1 text-red-500 hover:text-red-600"
              aria-label={`Remove note entry ${index + 1}`}
            >
              <MdClose size={24} />
            </button>
            <label className="font-semibold text-gray-700">
              Note Entry #{index + 1}
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 p-2">
            <div>
              <label
                htmlFor={`issue-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Issue
              </label>
              <input
                id={`issue-${index}`}
                type="text"
                className="mt-1 block w-full rounded-md py-1 md:py-2 border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.issue}
                onChange={(e) => handleChange(index, 'issue', e.target.value)}
                placeholder="Issue"
              />
            </div>

            <div>
              <label
                htmlFor={`location-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Location
              </label>
              <select
                id={`location-${index}`}
                className="mt-1 block w-full pl-3 pr-10 py-1 md:py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                value={entry.location}
                onChange={(e) =>
                  handleChange(index, 'location', e.target.value)
                }
              >
                <option value="">Select Location...</option>
                {locations.map((location, idx) => (
                  <option key={idx} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`attachment-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Attachment
              </label>
              <div className="mt-1 flex items-center border rounded-md p-1">
                <label
                  htmlFor={`attachment-${index}`}
                  className="bg-gray-100 text-black border py-1 px-2 rounded-md cursor-pointer hover:bg-gray-300 hover:text-gray-800 "
                >
                  Choose File
                </label>
                <input
                  id={`attachment-${index}`}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                />
                <span className="ml-3 text-sm text-gray-600 flex items-center">
                  {entry.attachment ? (
                    <>
                      {entry.attachment.name}
                      <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => removeFile(index)}
                        aria-label="Remove file"
                      >
                        <MdClose size={16} />
                      </button>
                    </>
                  ) : (
                    'No file chosen'
                  )}
                </span>
              </div>
            </div>

            <div className="md:col-span-3">
              <label
                htmlFor={`comment-${index}`}
                className="block text-sm font-medium text-gray-900"
              >
                Comment
              </label>
              <textarea
                id={`comment-${index}`}
                className="mt-1 block w-full rounded-md py-1 md:py-2 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={entry.comment}
                onChange={(e) => handleChange(index, 'comment', e.target.value)}
                placeholder="Comment"
              />
            </div>
          </div>
        </div>
      ))}

      <SectionButton title="Add Note Entry" onClick={addEntry} />
    </>
  );
}


function Photos() {
    const [photos, setPhotos] = useState([]);  // Holds an array of photos

    const onDrop = useCallback(acceptedFiles => {
        // Map over each file and convert to readable URL
        const newPhotos = acceptedFiles.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise(resolve => {
                reader.onloadend = () => {
                    resolve({ file, preview: reader.result });
                };
            });
        });

        // Resolve all FileReader promises and update state
        Promise.all(newPhotos).then(newPhotos => {
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        });
    }, []);

    const removePhoto = (index) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, idx) => idx !== index));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true  // Allow multiple files to be dropped
    });

    return (
        <div className="grid grid-cols-1 gap-4 rounded-md p-4 shadow-lg bg-white">
            <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-dashed border-4 border-gray-300 rounded-md text-center cursor-pointer hover:border-indigo-500">
                <input {...getInputProps()} capture="user" />
                <MdCloudUpload size={48} className="text-gray-400 mb-2" />
                <p className="text-lg font-medium text-gray-700">
                    {isDragActive ? "Drop the photos here ..." : "Drag 'n' drop photos here, or tap to select photos"}
                </p>
                <p className="text-sm text-gray-500">(Tap to use your camera on mobile)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="relative mt-4 border rounded-lg">
                        <img src={photo.preview} alt="Preview" className="rounded-md" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                        <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-0 right-0 text-red-500 rounded-2xl hover:text-red-600"
                            style={{ margin: '8px' }}
                        >
                            <MdClose size={30} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default function NewDailyLogForm({ companyData }) {
  return (
      <>
          <div className="bg-gray-200 sm:py-5 py-3"></div>
          <ObservedWeatherConditions />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Manpower companies={companyData} />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Equipment />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Visitors />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <PhoneCalls />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Inspections />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Deliveries />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <SafetyViolations />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Accidents />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Dumpster />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Waste />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Restrooms />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <ScheduledWork />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Delays />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Notes />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
          <Photos />
          <div className="bg-gray-100 sm:py-5 py-3"></div>
      </>
  );
}

