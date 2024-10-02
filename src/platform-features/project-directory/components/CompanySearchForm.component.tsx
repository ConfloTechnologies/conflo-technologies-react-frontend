import React, { FC, useState, useRef } from "react";
import ProgressBar from "../../../common/components/ProgressBar";

interface CompanySearchFormProps {
    companiesWithContacts: { [key: string]: any };
    selectedCompany: string | null;
    setSelectedCompany: (company: string | null) => void;
    setCurrentStep: (step: number) => void;
}

const CompanySearchFormComponent: FC<CompanySearchFormProps> = ({
                                                                    companiesWithContacts,
                                                                    selectedCompany,
                                                                    setSelectedCompany,
                                                                    setCurrentStep,
                                                                }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showCompanyError, setShowCompanyError] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    // progress bar information
    const currentStep = selectedCompany ? 1 : 0;
    const totalSteps = 4;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setSelectedCompany(null);
        setShowCompanyError(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 150);
    };

    const handleSelectCompany = (company: string) => {
        setSelectedCompany(company);
        setSearchTerm(company);
        setShowCompanyError(false);
    };

    const handleRemoveCompany = () => {
        setSelectedCompany(null);
        setSearchTerm("");
        setShowCompanyError(false);
        inputRef.current?.focus(); // Focus back to input
    };

    const handleCreateNewCompanyClick = () => {
        if (selectedCompany) {
            setShowCompanyError(true);
        } else {
            setCurrentStep(2); // Proceed to the NewCompanyForm step
        }
    };

    const filteredCompanies = Object.keys(companiesWithContacts).filter((company) =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const buttonMarginTop = isFocused || searchTerm
    //     ? `${Math.min(filteredCompanies.length * 40, 200) + 10}px`
    //     : "20px";

    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-6 px-2">
            <div>
                <div className="text-xl font-bold py-2 sticky top-0 z-30 bg-white">
                    <h2 className="pb-2 border-b border-gray-200">New Project Contact Form:</h2>
                    <ProgressBar
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                    />
                </div>
                <div className="py-5 h-[200px]">
                    <label htmlFor="searchCompanies" className="block text-sm font-medium leading-6 text-gray-900">
                        Select a pre-existing company:
                    </label>
                    <div className="mt-2 relative">
                        <input
                            id="searchCompanies"
                            type="text"
                            placeholder={selectedCompany || "Search companies..."}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {(isFocused || searchTerm) && (
                            <ul className="absolute mt-2 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto">
                                {filteredCompanies.map((company, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setSelectedCompany(company);
                                            setShowCompanyError(false); // Clear error when a new company is selected
                                        }}
                                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {company}
                                    </li>
                                ))}
                                {filteredCompanies.length === 0 && (
                                    <li className="px-3 py-2 text-gray-500">No results found</li>
                                )}
                            </ul>
                        )}
                        {selectedCompany && (
                            <div className="pl-2 mt-4 flex items-center">
                                Selected Company: <strong>{' '}{selectedCompany}</strong>
                                <button
                                    type="button"
                                    className="ml-2 text-red-600 hover:text-red-800"
                                    onClick={handleRemoveCompany}
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <hr className="border-t border-gray-200"/>

                <div className="mt-5"
                    // style={{marginTop: buttonMarginTop}}
                >
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Create a new company:
                    </label>
                    <div className="mt-3">
                        <button
                            type="button"
                            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                                selectedCompany
                                    ? "bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-white"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                            onClick={handleCreateNewCompanyClick}
                        >
                            Create New Company
                        </button>
                        {showCompanyError && (
                            <p className="mt-4 text-sm text-red-600 text-center">
                                To create a new company, you must remove the current company selection
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanySearchFormComponent;
