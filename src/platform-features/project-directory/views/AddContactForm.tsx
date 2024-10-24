import React, { useState, FunctionComponent, useRef } from 'react';

import CompanySearchFormComponent from "../components/CompanySearchForm.component";
import ContactSearchFormComponent from "../components/ContactSearchForm.component";
import NewCompanyForm from "../components/NewCompanyForm.component";
import NewContactForm from "../components/NewContactForm.component.jsx";
import AddContactFormButtons from "../components/AddContactFormButtons.component.jsx";
import PageHeader from "../../../common/components/PageHeader.component";
import { useDynamicContentHeight } from "../../../common/utils/useDynamicContentHeightSettingOne";
import companiesWithContacts from "../../../mock-data/companiesWithContacts";
import { Company, Contact } from "../../../types/directory";
import ProgressBar from "../../../common/components/ProgressBar";
import BackToBreadcrumb from "../../../common/components/BackToBreadcrumb";

const NewDirectoryContactForm: FunctionComponent = () => {
    const [mainContentHeight, setMainContentHeight] = useState('');
    const headerRef = useRef<HTMLDivElement>(null);
    const totalSteps = 4;

    useDynamicContentHeight(headerRef, setMainContentHeight, 40);

    const constructionDivisions: string[] = [
        'Division 1 - General Requirements',
        'Division 2 - Site Constructions',
        'Division 3 - Concrete',
        'Division 4 - Masonry',
        'Division 5 - Metals',
        'Division 6 - Wood and Plastics',
        'Division 7 - Thermal and Moisture Protection',
        'Division 8 - Doors and Windows',
        'Division 9 - Finishes',
        'Division 10 - Specialties',
        'Division 11 - Equipment',
        'Division 12 - Furnishings',
        'Division 13 - Special Construction',
        'Division 14 - Conveying Systems',
        'Division 15 - Mechanical',
        'Division 16 - Electrical',
        'Division 20 - ABC Miscellaneous',
    ];

    const [currentStep, setCurrentStep] = useState<number>(0);

    // State for company form data
    const [companyFormData, setCompanyFormData] = useState<Company>({
        entityName: '',
        dba: '',
        phoneNumber: '',
        faxNumber: '',
        physicalAddress: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        email: '',
        website: '',
        licenseNumber: '',
        laborUnion: '',
        constructionDivision: '',
        bidStatus: '',
        contacts: [],
        licenses: []  // Add licenses field
    });

    // State for contact form data
    const [contactFormData, setContactFormData] = useState<Contact>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        contactType: '',
        title: '',
    });

    // Other state variables
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [duplicateCompanyError, setDuplicateCompanyError] = useState<boolean>(false);
    const [duplicateEmailError, setDuplicateEmailError] = useState<string>('');
    const [duplicateNameError, setDuplicateNameError] = useState<string>('');
    const [duplicatePhoneNumberError, setDuplicatePhoneNumberError] = useState<string>('');

    const resetForm = () => {
        setCurrentStep(0);
        setSelectedCompany(null);
        setSelectedContact(null);
        setDuplicateCompanyError(false);
        setDuplicateEmailError('');
        setDuplicateNameError('');
        setDuplicatePhoneNumberError('');
        setCompanyFormData({
            entityName: '',
            dba: '',
            phoneNumber: '',
            faxNumber: '',
            physicalAddress: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            email: '',
            website: '',
            licenseNumber: '',
            laborUnion: '',
            constructionDivision: '',
            bidStatus: '',
            contacts: [],
            licenses: [] // Ensure the licenses field is set
        });
        setContactFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            contactType: '',
            title: '',
        });
    };

    // Handler functions for navigation, submission, etc.
    const handleNext = (step: number) => {
        setCurrentStep(step);
    };

    const handlePrevious = (step: number) => {
        setCurrentStep(step);
    };

    const handleSubmit = () => {
        console.log('Submitting data:', {
            companyFormData,
            contactFormData,
        });
        resetForm();
    };

    const handleCancel = () => {
        resetForm();
    };

    // Existing contacts for duplicate checks
    const existingContacts = selectedCompany
        ? companiesWithContacts[selectedCompany]?.contacts || []
        : [];

    const barLength = currentStep === 0 ? 0 :
                      currentStep === 1 ? 2 :
                      currentStep === 2 ? 1 : 2.75;


    return (
        <>
            <div ref={headerRef}>
                <div className="overflow-hidden pt-4 px-4">
                    <BackToBreadcrumb link={'/project/:id/project-directory'} title={'Directory'}/>
                    <div className="text-xl font-bold py-2 sticky top-0 z-30 bg-white">
                        <ProgressBar
                            currentStep={barLength}
                            totalSteps={totalSteps}
                        />
                    </div>
                </div>
            </div>

                <div className="overflow-auto p-4" style={{ height: mainContentHeight }}>
                    <div className="border border-gray-300 rounded-lg">
                        <div className=" text-xl font-bold pt-2 pb-2 px-4 bg-white rounded-t-lg">
                            <h2>New Contact Form</h2>
                        </div>
                        <div className="overflow-auto">
                            <div className="min-h-[66vh]">
                                {currentStep === 0 && (
                                    <>
                                        <CompanySearchFormComponent
                                            companiesWithContacts={companiesWithContacts}
                                            setSelectedCompany={setSelectedCompany}
                                            selectedCompany={selectedCompany}
                                            setCurrentStep={setCurrentStep}
                                        />
                                    </>
                                )}
                                {currentStep === 1 && selectedCompany && (
                                    <>
                                        <ContactSearchFormComponent
                                            selectedCompany={selectedCompany}
                                            companiesWithContacts={companiesWithContacts}
                                            setSelectedContact={setSelectedContact}
                                            setCurrentStep={setCurrentStep}
                                        />

                                    </>
                                )}
                                {currentStep === 2 && (
                                    <>
                                        <NewCompanyForm
                                            constructionDivisions={constructionDivisions}
                                            companyFormData={companyFormData}
                                            setCompanyFormData={setCompanyFormData}
                                            duplicateCompanyError={duplicateCompanyError}
                                        />

                                    </>
                                )}
                                {currentStep === 3 && (
                                    <>
                                        <NewContactForm
                                            existingContacts={existingContacts}
                                            setContactFormData={setContactFormData}
                                        />

                                    </>
                                )}
                            </div>
                            <AddContactFormButtons
                                currentStep={currentStep}
                                selectedCompany={selectedCompany}
                                selectedContact={selectedContact}
                                duplicateCompanyError={duplicateCompanyError}
                                duplicateEmailError={duplicateEmailError}
                                duplicateNameError={duplicateNameError}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                            />
                        </div>
                    </div>
                </div>
        </>
    );
};

export default NewDirectoryContactForm;
