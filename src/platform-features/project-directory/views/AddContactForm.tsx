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

const NewDirectoryContactForm: FunctionComponent = () => {
    const [mainContentHeight, setMainContentHeight] = useState('');
    const headerRef = useRef<HTMLDivElement>(null);

    useDynamicContentHeight(headerRef, setMainContentHeight);

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

    return (
        <>
            <div ref={headerRef}>
                <PageHeader
                    pageTitle="Project Directory"
                    pageDescription="A directory of all contacts associated with the project."
                    trainingVideoSrc="https://www.youtube.com/watch?v=ztZphO13iIY"
                    trainingTitle="Project Directory Training"
                />
            </div>
            <div className="overflow-auto mt-2" style={{ height: mainContentHeight }}>
                <div className="sticky top-0 z-30 bg-white">
                    <form>
                        {currentStep === 0 && (
                            <CompanySearchFormComponent
                                companiesWithContacts={companiesWithContacts}
                                setSelectedCompany={setSelectedCompany}
                                selectedCompany={selectedCompany}
                                setCurrentStep={setCurrentStep}
                            />
                        )}
                        {currentStep === 1 && selectedCompany && (
                            <ContactSearchFormComponent
                                selectedCompany={selectedCompany}
                                companiesWithContacts={companiesWithContacts}
                                setSelectedContact={setSelectedContact}
                                setCurrentStep={setCurrentStep}
                            />
                        )}
                        {currentStep === 2 && (
                            <NewCompanyForm
                                constructionDivisions={constructionDivisions}
                                companyFormData={companyFormData}
                                setCompanyFormData={setCompanyFormData}
                                duplicateCompanyError={duplicateCompanyError}
                            />
                        )}
                        {currentStep === 3 && (
                            <NewContactForm
                                existingContacts={existingContacts}
                                setContactFormData={setContactFormData}
                            />
                        )}
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
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewDirectoryContactForm;
