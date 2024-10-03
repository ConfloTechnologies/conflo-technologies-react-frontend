import React, { FC } from "react";

interface AddContactFormButtonsProps {
    currentStep: number;
    selectedCompany: string | null;
    selectedContact: any; // Type this more specifically if possible
    duplicateCompanyError: boolean;
    duplicateEmailError: string;
    duplicateNameError: string;
    onPrevious: (step: number) => void;
    onNext: (step: number) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

const AddContactFormButtons: FC<AddContactFormButtonsProps> = ({
                                                                   currentStep,
                                                                   selectedCompany,
                                                                   selectedContact,
                                                                   duplicateCompanyError,
                                                                   duplicateEmailError,
                                                                   duplicateNameError,
                                                                   onPrevious,
                                                                   onNext,
                                                                   onSubmit,
                                                                   onCancel,
                                                               }) => {
    const handlePrevious = () => {
        if ([1, 2].includes(currentStep)) {
            onPrevious(0);
        } else if (currentStep === 3) {
            if (selectedCompany && !selectedContact) {
                onPrevious(1); // Go back to the contact search form
            } else {
                onPrevious(2); // Go back to the new contact form
            }
        }
    };

    const handleNext = () => {
        if (currentStep === 0) {
            onNext(1);
        } else if (currentStep === 2) {
            onNext(3);
        }
    };


    return (
        <>
            <div
                className="fixed ml-0 lg:ml-60 mt-10 inset-x-0 bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 sm:px-6 z-50">
                <div className="sm:grid grid-cols-2">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-red-600 hover:text-white sm:col-span-2"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
                <div className="grid grid-flow-row-dense grid-cols-2 gap-3">
                    {currentStep > 0 ? (
                        <button
                            type="button"
                            className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1"
                            onClick={handlePrevious}
                        >
                            Previous
                        </button>
                    ): (
                        <div className="inline-flex w-full justify-center px-3 py-2">
                        {/* Placeholder for spacing */}
                        </div>
                    )}

                    {(currentStep === 0 || currentStep === 2) && (
                        <button
                            type="button"
                            className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm sm:col-start-2 ${
                                (currentStep === 0 && selectedCompany) || (currentStep === 2 && !duplicateCompanyError)
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-blue-600 opacity-50 cursor-not-allowed'
                            }`}
                            disabled={
                                (currentStep === 0 && !selectedCompany) ||
                                (currentStep === 2 && duplicateCompanyError)
                            }
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    )}

                    {(currentStep === 1 || currentStep === 3) && (
                        <button
                            type="button"
                            className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm sm:col-start-2 ${
                                (currentStep === 1 && selectedContact) ||
                                (currentStep === 3 && !duplicateEmailError && !duplicateNameError)
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-green-600 opacity-50 cursor-not-allowed'
                            }`}
                            disabled={
                                (currentStep === 1 && !selectedContact) ||
                                (currentStep === 3 && (duplicateEmailError !== '' || duplicateNameError !== ''))
                            }
                            onClick={onSubmit}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddContactFormButtons;
