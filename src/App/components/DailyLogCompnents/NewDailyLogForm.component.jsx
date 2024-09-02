import React from 'react';
import ObservedWeatherConditions from './ObservedWeatherConditions.component';
import Manpower from './ManPower.component';
import Notes from './Notes.component';
import Equipment from './Equipment.component';
import Visitors from './Visitors.component';
import PhoneCalls from './PhoneCalls.component';
import Inspections from './Inspections.component';
import Deliveries from './Deliveries.component';
import SafetyViolations from './SafetyViolations.component';
import Accidents from './Accidents.component';
import Dumpsters from './Dumpster.component';
import Waste from './WasteManagement.component';
import ScheduledWork from './ScheduledWork.component';
import Delays from './Delays.component';
import Photos from './Photos.component';

export default function NewDailyLogForm({ companyData }) {
  return (
    <>
      <div className="bg-gray-200 py-6"></div>
      <ObservedWeatherConditions />
      <div className="bg-gray-100 py-6"></div>
      <Manpower companies={companyData} />
      <div className="bg-gray-100 py-6"></div>
      <Equipment />
      <div className="bg-gray-100 py-6"></div>
      <Visitors />
      <div className="bg-gray-100 py-6"></div>
      <PhoneCalls />
      <div className="bg-gray-100 py-6"></div>
      <Inspections />
      <div className="bg-gray-100 py-6"></div>
      <Deliveries />
      <div className="bg-gray-100 py-6"></div>
      <SafetyViolations /> 
      <div className="bg-gray-100 py-6"></div>
      <Accidents />
      <div className="bg-gray-100 py-6"></div>
      <Dumpsters />
      <div className="bg-gray-100 py-6"></div>
      <Waste />
      <div className="bg-gray-100 py-6"></div>
      <ScheduledWork />
      <div className="bg-gray-100 py-6"></div>
      <Delays />
      <div className="bg-gray-100 py-6"></div>
      <Notes /> 
      <div className="bg-gray-100 py-6"></div>
      <Photos />
      <div className="bg-gray-100 py-6"></div>
    </>
  );
}
