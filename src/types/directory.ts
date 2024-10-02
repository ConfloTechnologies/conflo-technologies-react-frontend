import React from 'react';

export interface Contact {
    firstName: string;
    lastName: string;
    phone: string;           // Updated to phone
    email: string;           // Updated to email
    contactType: string;
    title: string;           // Updated to title
    projects?: string[];     // Added projects field
}

export interface License {
    licenseNumber: string;
    state: string;
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
    professionalRelationship?: string;
    bidStatus: string;
    contacts: Contact[];  // List of contacts
    licenses: License[];  // List of licenses
}

export interface CompaniesWithContacts {
    [companyName: string]: Company;
}

export interface CompaniesTableProps {
    searchQuery: string;
    companiesWithContacts: CompaniesWithContacts;
    handleViewCompanyClick: (companyName: string) => void;
    paginationRef: React.RefObject<HTMLDivElement>;  // Correct type for paginationRef
}

export interface ContactsTableProps {
    currentTab: string;
    searchQuery: string;
    companiesWithContacts: CompaniesWithContacts;
    handleViewContactClick: (contact: Contact, company: Company) => void;
    paginationRef: React.RefObject<HTMLDivElement>;  // Correct type for paginationRef
}

export interface Tab {
    name: string;
    key: string;
}
