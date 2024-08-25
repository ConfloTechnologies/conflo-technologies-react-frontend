import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

// Utility functions imports
import { exportToPDF, exportToExcel } from '../../Utils/ProjectDirectoryUtils/exportUtil';

export default function ExportModal({ isModalOpen, setIsModalOpen, data, columns, fileName }) {
    const [exportType, setExportType] = useState('');
    const cancelButtonRef = React.useRef(null);

    const handleExport = () => {
        if (exportType === 'PDF') {
            exportToPDF(data, columns, fileName);
        } else if (exportType === 'Excel') {
            exportToExcel(data, columns, fileName);
        }
        setIsModalOpen(false);
        resetForm();  // Ensure the form is reset after exporting
    };

    const resetForm = () => setExportType(''); // Reset the dropdown to the default value

    const handleClose = () => {
        setIsModalOpen(false);
        resetForm();  // Reset the form when the modal is closed
    };

    return (
        <Transition.Root show={isModalOpen} as={Fragment}>
            <Dialog as="div" 
                className="relative z-[100]" 
                initialFocus={cancelButtonRef}
                onClose={handleClose}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md sm:mx-4 sm:p-6">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Export Data
                                </Dialog.Title>
                                <div className="mt-2">
                                    <label htmlFor="fileType" className="block text-sm font-medium text-gray-700">
                                        Choose export format:
                                    </label>
                                    <select
                                        id="fileType"
                                        name="fileType"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        value={exportType}
                                        onChange={(e) => setExportType(e.target.value)}
                                    >
                                        <option value="">Select a format</option>
                                        <option value="PDF">PDF</option>
                                        <option value="Excel">Excel</option>
                                    </select>
                                </div>
                                <div className="mt-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        onClick={handleClose}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                                        onClick={handleExport}
                                        disabled={!exportType}
                                    >
                                        Export
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
