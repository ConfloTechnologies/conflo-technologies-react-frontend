import React, {useState, FunctionComponent, useRef} from 'react';
import { useLocation } from 'react-router-dom';
// Import the components you'll use in the different steps
import CompanySearchFormComponent from "../components/CompanySearchForm.component";
import ContactSearchFormComponent from "../components/ContactSearchForm.component";
import NewCompanyForm from "../components/NewCompanyForm.component";
import NewContactForm from "../components/NewContactForm.component.jsx";
import AddContactFormButtons from "../components/AddContactFormButtons.component.jsx";
import PageHeader from "../../../common/components/PageHeader.component";
import {useDynamicContentHeight} from "../../../common/utils/useDynamicContentHeightSettingOne";

// Define the types for your props and state
interface AddContactFormProps {
    // companiesWithContacts: { [key: string]: any };  // Replace 'any' with the actual type if available
    // projectId: number;
    // constructionDivisions: string[];
}

interface CompanyFormData {
    entityName: string;
    dba: string;
    professionalRelationship: string;
    phoneNumber: string;
    faxNumber: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    website: string;
    bidStatus: string;
    laborUnion: string;
    constructionDivision: string;
    licenses: { licenseNumber: string; state: string }[];
}

interface ContactFormData {
    firstName: string;
    lastName: string;
    contactTitle: string;
    contactType: string;
    contactPhoneNumber: string;
    contactEmail: string;
}

const NewDirectoryContactForm: FunctionComponent<AddContactFormProps> = () => {
    // Use `useLocation` hook to get state passed via `navigate`
    const location = useLocation();
    const { companiesWithContacts, constructionDivisions, projectId } = location.state || {};
    const [mainContentHeight, setMainContentHeight] = useState('');
    const headerRef = useRef<HTMLDivElement>(null);

    useDynamicContentHeight(headerRef, setMainContentHeight, );


    const [currentStep, setCurrentStep] = useState<number>(0);
    const totalSteps = 4;

    // State for company form data
    const [companyFormData, setCompanyFormData] = useState<CompanyFormData>({
        entityName: '',
        dba: '',
        professionalRelationship: '',
        phoneNumber: '',
        faxNumber: '',
        address1: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        email: '',
        website: '',
        bidStatus: '',
        laborUnion: '',
        constructionDivision: '',
        licenses: [{ licenseNumber: '', state: '' }],
    });

    // State for contact form data
    const [contactFormData, setContactFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        contactTitle: '',
        contactType: '',
        contactPhoneNumber: '',
        contactEmail: '',
    });

    // Other state variables
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
    const [selectedContact, setSelectedContact] = useState<any>(null); // Define this type based on your actual data structure
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
            professionalRelationship: '',
            phoneNumber: '',
            faxNumber: '',
            address1: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            email: '',
            website: '',
            bidStatus: '',
            laborUnion: '',
            constructionDivision: '',
            licenses: [{ licenseNumber: '', state: '' }],
        });
        setContactFormData({
            firstName: '',
            lastName: '',
            contactTitle: '',
            contactType: '',
            contactPhoneNumber: '',
            contactEmail: '',
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
        // Implement your submit logic here
        console.log('Submitting data:', {
            companyFormData,
            contactFormData,
        });
        // After submission, reset the form or navigate away
        resetForm();
    };

    const handleCancel = () => {
        resetForm();
        // If you need to navigate away or perform other actions, do so here
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
            <div className="overflow-auto mt-2" style={{ height: mainContentHeight }}> {/*ADJUST WITH DYNAMIC HEIGHT FUNCTION*/}
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
    )
        ;
};

export default NewDirectoryContactForm;
