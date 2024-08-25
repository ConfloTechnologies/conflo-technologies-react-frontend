// src/utils/exportUtil.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


export const exportToPDF = ({ companyData, contactData }, fileName) => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4'
    });

    // Configurations to enhance visual layout
    const pageMargin = 40;
    const tableFontSize = 8;
    doc.setFontSize(12);

    // Add Company Information
    doc.text('Company Directory', pageMargin, 30);
    doc.setFontSize(tableFontSize);
    doc.autoTable({
        head: [['Company', 'Phone', 'Fax', 'Address', 'Email', 'Website', 'License', 'Union', 'Division', 'Bid Status']],
        body: companyData.map(item => [
            item.Company,
            item.Phone,
            item.Fax,
            item.Address,
            item.Email,
            item.Website,
            item.License,
            item.Union,
            item.ConstructionDivision,
            item.BidStatus
        ]),
        startY: 50,
        theme: 'grid',
        styles: { fontSize: tableFontSize, cellPadding: 5, overflow: 'linebreak' },
        columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 70 },
            2: { cellWidth: 70 },
            3: { cellWidth: 140 }, // Wider for Address
            4: { cellWidth: 70 },
            5: { cellWidth: 70 },
            6: { cellWidth: 70 },
            7: { cellWidth: 70 },
            8: { cellWidth: 70 },
            9: { cellWidth: 70 }
        },
        margin: { left: pageMargin, right: pageMargin }
    });

    // Add a new page for Contacts
    doc.addPage();
    doc.setFontSize(12);
    doc.text('Contacts Directory', pageMargin, 30);
    doc.setFontSize(tableFontSize);
    doc.autoTable({
        head: [['Company', 'Name', 'Title', 'Phone', 'Email', 'Contact Type']],
        body: contactData.map(item => [
            item.Company,
            item.Name,
            item.Title,
            item.Phone,
            item.Email,
            item.ContactType
        ]),
        startY: 50,
        theme: 'grid',
        styles: { fontSize: tableFontSize, cellPadding: 5, overflow: 'linebreak' },
        columnStyles: {
            0: { cellWidth: 110 },
            1: { cellWidth: 110 },
            2: { cellWidth: 110 },
            3: { cellWidth: 110 },
            4: { cellWidth: 110 },
            5: { cellWidth: 110 },
            6: { cellWidth: 110 }
        },
        margin: { left: pageMargin, right: pageMargin }
    });

    // Save the PDF
    doc.save(`Project_Directory.pdf`);
};


export const exportToExcel = ({ companyData, contactData }, fileName) => {
    const workbook = XLSX.utils.book_new();

    // Sheet for Companies
    const companySheet = XLSX.utils.json_to_sheet(companyData, {
        header: ['Company', 'Phone', 'Fax', 'Address', 'Email', 'Website', 'License', 'Union', 'Division', 'BidStatus']
    });
    companySheet['!cols'] = [
        { wpx: 140 }, // Company
        { wpx: 140 }, // Phone
        { wpx: 140 }, // Fax
        { wpx: 260 }, // Address
        { wpx: 200 }, // Email
        { wpx: 140 }, // Website
        { wpx: 140 }, // License
        { wpx: 200 }, // Union
        { wpx: 140 }, // Construction Division
        { wpx: 140 }  // Bid Status
    ];
    XLSX.utils.book_append_sheet(workbook, companySheet, 'Companies');

    // Sheet for Contacts
    const contactSheet = XLSX.utils.json_to_sheet(contactData, {
        header: ['Company', 'Name', 'Title', 'Phone', 'Email', 'ContactType']
    });
    contactSheet['!cols'] = [
        { wpx: 140 }, // Company
        { wpx: 140 }, // Name
        { wpx: 140 }, // Title
        { wpx: 140 }, // Phone
        { wpx: 200 }, // Email
        { wpx: 140 }, // Contact Type
    ];
    XLSX.utils.book_append_sheet(workbook, contactSheet, 'Contacts');

    // Save the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `project_directory.xlsx`);
};