
export interface Contact {
    companyName?: string;
    companyOfficePhone?: string;
    companyEmail?: string;
    websiteURL?: string;
    constructionDivision?: string;
    bidStatus?: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    phone?: string;
    email?: string;
    contactType?: string;
    projects?: any[];
    company?: string; 
    tradeCode?: string;
}

export interface Company {
    entityName: string;
    dba: string;
    phoneNumber: string;
    faxNumber: string;
    physicalAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    website: string;
    licenseNumber: string;
    laborUnion: string;
    constructionDivision: string;
    bidStatus: string;
    contacts: Contact[];
    professionalRelationship?: string;
}

export interface User {
    isCompanyRow: boolean;
    companyName?: string;
    companyOfficePhone?: string;
    companyEmail?: string;
    websiteURL?: string;
    constructionDivision?: string;
    bidStatus?: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    phone?: string;
    email?: string;
    contactType?: string;
    projects?: any[];
    company?: string; 
}

export interface CompaniesWithContacts {
    [companyName: string]: Company;
}

export interface CompaniesTableProps {
    searchQuery: string;
    companiesWithContacts: CompaniesWithContacts;
    handleViewCompanyClick: (companyName: string) => void;
}

export interface ContactsTableProps {
    currentTab: string
    searchQuery: string;
    companiesWithContacts: CompaniesWithContacts;
    handleViewContactClick: (contact: Contact, company: Company) => void;
  }
  
