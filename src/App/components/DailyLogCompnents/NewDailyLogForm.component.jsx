import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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

export default function NewDailyLogForm({ isModalOpen, setIsModalOpen, companyData }) {
  const cancelButtonRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const stepRefs = useRef([]); // To hold references to each step element

  const steps = [
    { label: "Weather", component: <ObservedWeatherConditions /> },
    { label: "Manpower", component: <Manpower companies={companyData} /> },
    { label: "Equipment", component: <Equipment /> },
    { label: "Visitors", component: <Visitors /> },
    { label: "Phone Calls", component: <PhoneCalls /> },
    { label: "Inspections", component: <Inspections /> },
    { label: "Deliveries", component: <Deliveries /> },
    { label: "Safety", component: <SafetyViolations /> },
    { label: "Accidents", component: <Accidents /> },
    { label: "Dumpsters", component: <Dumpsters /> },
    { label: "Waste", component: <Waste /> },
    { label: "Scheduled Work", component: <ScheduledWork /> },
    { label: "Delays", component: <Delays /> },
    { label: "Photos", component: <Photos /> },
    { label: "Notes", component: <Notes /> },
  ];

  const handleStepClick = (index) => {
    setCurrentStep(index);
    if (stepRefs.current[index]) {
      stepRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (stepRefs.current[nextStep]) {
        stepRefs.current[nextStep].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (stepRefs.current[prevStep]) {
        stepRefs.current[prevStep].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    // Handle form submission here
    setIsModalOpen(false);
  };

  const renderProgressBar = () => {
    return (
      <nav
        aria-label="Progress"
        className="overflow-x-auto bg-white rounded-sm border-t  border-b py-2 px-2 sm:px-0"
      >
        <ol className="flex">
          {steps.map((step, index) => {
            const status =
              index < currentStep
                ? "complete"
                : index === currentStep
                ? "current"
                : "upcoming";

            const bgColor =
              status === "complete"
                ? "bg-gray-700 text-white"
                : status === "current"
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-500";

            const fillColor =
              status === "complete"
                ? "bg-gray-700"
                : status === "current"
                ? "bg-green-700"
                : "bg-gray-100";

            return (
              <li
                key={step.label}
                ref={(el) => (stepRefs.current[index] = el)} // Set reference for each step
                className={`relative flex-shrink-0 flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 text-xs font-medium rounded-lg ${bgColor}`}
                style={{ width: "120px", minWidth: "120px", height: "30px" }}
                onClick={() => handleStepClick(index)} // Make each step clickable
              >
                {step.label}

                {index !== steps.length - 1 && (
                  <div className="absolute right-0 top-0 h-full w-3 sm:w-5">
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 0L20 40L0 80H22V0H0Z"
                        fill="white"
                      />
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke={fillColor}
                        strokeLinejoin="round"
                        fill={fillColor}
                      />
                    </svg>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

  const renderButtons = () => (
    <div className="flex justify-between mt-6">
      {currentStep > 0 && (
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400"
          onClick={handlePrevious}
        >
          Previous
        </button>
      )}
      {currentStep < steps.length - 1 ? (
        <button
          type="button"
          className="ml-auto inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          onClick={handleNext}
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          className="ml-auto inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" 
        className="relative z-[100]" 
        initialFocus={cancelButtonRef}
        onClose={() => setIsModalOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-5xl sm:mx-4 sm:p-6">
                <div>
                  <div className='align-items-center justify center py-8'>
                  <h1 > 
                    Daily Log Form
                  </h1>
                  </div>
                  {renderProgressBar()}
                  <div className="border-b border-gray-900/10 pb-0">
                    <form>
                      {steps[currentStep].component}
                      {renderButtons()}
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
