import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ObservedWeatherConditions from './ObservedWeatherConditions.component';
import Manpower from './ManPower.component';

export default function NewDailyLogForm({ isModalOpen, setIsModalOpen, companyData }) {
  const cancelButtonRef = useRef(null);



  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderCompanyForm = () => (
    <div className=" border-b pb-6 border-gray-900/10">
      <h2 className="text-lg font-semibold leading-7 text-gray-900 pt-4 pb-4 border-t border-gray-900/10">
        Company Information
      </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="hidden sm:col-span-1"></div>
        <div className="sm:col-span-2">
            <ObservedWeatherConditions/>
            <Manpower
            companies={companyData}
            />
        </div>
       
        </div>

    </div>
  );

  

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" 
        className="relative z-[100]" 
        initialFocus={cancelButtonRef}
        onClose={() => {
          setIsModalOpen(false);
        }}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full  md:max-w-6xl sm:mx-4 sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Update Company Information
                    </Dialog.Title>
                  </div>
                  <div className="border-b border-gray-900/10 pb-4">
                    <form>
                      {renderCompanyForm()}
                      
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
