import { Company } from '../types/directory';

const companiesWithContacts: Record<string, Company> = {
    "Alpha Corp": {
      entityName: "Alpha Corporation",
      dba: "Alpha Corp",
      phoneNumber: "123-456-7890",
      faxNumber: "123-456-7891",
      physicalAddress: "123 Alpha St",
      city: "Alpha City",
      state: "AC",
      postalCode: "12345",
      country: "USA",
      email: "info@alphacorp.com",
      website: "https://alphacorp.com",
      licenseNumber: "ALPHA-123456",
      laborUnion: "Carpenters Local 123",
      constructionDivision: "Carpentry-001",
      bidStatus: "Pending",
      professionalRelationship: "contractor",
      contacts: [
        { 
          firstName: "Edward", 
          lastName: "Fiona", 
          phone: "123-456-7802", 
          email: "edward.fiona@example.com", 
          contactType: "external", 
          title: "Carpenter", 
          projects: [] 
        },
        { 
          firstName: "George", 
          lastName: "Hannah", 
          phone: "123-456-7803", 
          email: "george.hannah@example.com", 
          contactType: "external", 
          title: "Electrician", 
          projects: [] 
        }
      ]
    },
    "Beta LLC": {
      entityName: "Beta Limited Liability Company",
      dba: "Beta LLC",
      phoneNumber: "123-456-7890",
      faxNumber: "123-456-7891",
      physicalAddress: "456 Beta Ave",
      city: "Beta Town",
      state: "BT",
      postalCode: "67890",
      country: "USA",
      email: "info@betallc.com",
      website: "https://betallc.com",
      licenseNumber: "BETA-67890",
      laborUnion: "Plumbers Union Local 456",
      constructionDivision: "Plumbing-003",
      professionalRelationship: "contractor",
      bidStatus: "Pending",
      contacts: [
        { 
          firstName: "Oliver", 
          lastName: "Paula", 
          phone: "123-456-7807", 
          email: "oliver.paula@example.com", 
          contactType: "client", 
          title: "Plumber", 
          projects: [] 
        },
        { 
          firstName: "Quincy", 
          lastName: "Rachel", 
          phone: "123-456-7808", 
          email: "quincy.rachel@example.com", 
          contactType: "external", 
          title: "Civil Engineer", 
          projects: [] 
        }
      ]
    },
    "Gamma Inc": {
      entityName: "Gamma Incorporated",
      dba: "Gamma Inc",
      phoneNumber: "123-456-7890",
      faxNumber: "123-456-7891",
      physicalAddress: "789 Gamma Blvd",
      city: "Gamma City",
      state: "GC",
      postalCode: "23456",
      country: "USA",
      email: "info@gammainc.com",
      website: "https://gammainc.com",
      licenseNumber: "GAMMA-23456",
      laborUnion: "Carpenters Local 789",
      constructionDivision: "Carpentry-005",
      professionalRelationship: "contractor",
      bidStatus: "Bidding",
      contacts: [
        { 
          firstName: "Wanda", 
          lastName: "Xavier", 
          phone: "123-456-7811", 
          email: "wanda.xavier@example.com", 
          contactType: "external", 
          title: "Carpenter", 
          projects: [] 
        },
        { 
          firstName: "Adam", 
          lastName: "Bellamy", 
          phone: "123-456-7813", 
          email: "adam.bellamy@example.com", 
          contactType: "external", 
          title: "Plumber", 
          projects: [] 
        }
      ]
    },
    "Delta Ltd": {
      entityName: "Delta Limited",
      constructionDivision: "na",
      dba: "Delta Ltd",
      phoneNumber: "123-456-7890",
      faxNumber: "123-456-7891",
      physicalAddress: "101 Delta St",
      city: "Delta Town",
      state: "DT",
      postalCode: "34567",
      country: "USA",
      email: "info@deltaltd.com",
      website: "https://deltaltd.com",
      licenseNumber: "DELTA-34567",
      laborUnion: "Electricians Union Local 101",
      professionalRelationship: "contractor",
      bidStatus: "Accepted",
      contacts: [
        { 
          firstName: "Ian", 
          lastName: "Jennings", 
          phone: "123-456-7817", 
          email: "ian.jennings@example.com", 
          contactType: "external", 
          title: "Carpenter", 
          projects: [] 
        },
        { 
          firstName: "Kyle", 
          lastName: "Laurent", 
          phone: "123-456-7818", 
          email: "kyle.laurent@example.com", 
          contactType: "external", 
          title: "Electrician", 
          projects: [] 
        }
      ]
    },
    "Epsilon GmbH": {
      entityName: "Epsilon GmbH",
      dba: "Epsilon GmbH",
      phoneNumber: "123-456-7890",
      faxNumber: "123-456-7891",
      physicalAddress: "202 Epsilon Rd",
      city: "Epsilon City",
      state: "EC",
      postalCode: "45678",
      country: "USA",
      email: "info@epsilongmbh.com",
      website: "https://epsilongmbh.com",
      licenseNumber: "EPSILON-45678",
      laborUnion: "HVAC Union Local 202",
      constructionDivision: "HVAC-009",
      professionalRelationship: "contractor",
      bidStatus: "Accepted",
      contacts: [
        { 
          firstName: "Quinn", 
          lastName: "Reed", 
          phone: "123-456-7821", 
          email: "quinn.reed@example.com", 
          contactType: "external", 
          title: "HVAC Specialist", 
          projects: [] 
        },
        { 
          firstName: "Uma", 
          lastName: "Vargas", 
          phone: "123-456-7823", 
          email: "uma.vargas@example.com", 
          contactType: "external", 
          title: "Carpenter", 
          projects: [] 
        }
      ]
    },
    "Cooper Building": {
      entityName: "Cooper Building Inc.",
      dba: "Cooper Building",
      phoneNumber: "123-456-7890",
      faxNumber: "123-456-7891",
      physicalAddress: "789 Cooper St",
      city: "Cooper City",
      state: "CC",
      postalCode: "23456",
      country: "USA",
      email: "info@cooperbuilding.com",
      website: "https://cooperbuilding.com",
      licenseNumber: "COOPER-23456",
      laborUnion: "General Contractors Union Local 789",
      constructionDivision: "General-001",
      professionalRelationship: "internal",
      bidStatus: "N/A",
      contacts: [
        { 
          firstName: "Ian", 
          lastName: "Jennings", 
          phone: "123-456-7804", 
          email: "ian.jennings@example.com", 
          contactType: "internal", 
          title: "Project Manager",
          projects: [] 
        },
        { 
          firstName: "Mason", 
          lastName: "Nolan", 
          phone: "123-456-7819", 
          email: "mason.nolan@example.com", 
          contactType: "internal", 
          title: "Superintendent",
          projects: [] 
        },
        { 
          firstName: "Steven", 
          lastName: "Thompson", 
          phone: "123-456-7822", 
          email: "steven.thompson@example.com", 
          contactType: "internal", 
          title: "Safety Officer",
          projects: [] 
        },
        { 
          firstName: "Wendy", 
          lastName: "Xavier", 
          phone: "123-456-7811", 
          email: "wendy.xavier@example.com", 
          contactType: "internal", 
          title: "HR Manager",
          projects: [] 
        },
        { 
          firstName: "Yvonne", 
          lastName: "Zara", 
          phone: "123-456-7812", 
          email: "yvonne.zara@example.com", 
          contactType: "internal", 
          title: "Lead Engineer",
          projects: [] 
        }
      ]
    },
    "Client Corp": {
      entityName: "Client Corporation",
      dba: "Client Corp",
      phoneNumber: "123-456-7890",
      faxNumber: "123-456-7891",
      physicalAddress: "101 Client Ave",
      city: "Client Town",
      state: "CT",
      postalCode: "34567",
      country: "USA",
      email: "info@clientcorp.com",
      website: "https://clientcorp.com",
      licenseNumber: "CLIENT-34567",
      laborUnion: "Owners Union Local 101",
      constructionDivision: "Owner-001",
      professionalRelationship: "client",
      bidStatus: "N/A",
      contacts: [
        { 
          firstName: "Charlie", 
          lastName: "Dawson", 
          phone: "123-456-7801", 
          email: "charlie.dawson@example.com", 
          contactType: "client", 
          title: "Lead Engineer",
          projects: [] 
        },
        { 
          firstName: "Mason", 
          lastName: "Nora", 
          phone: "123-456-7806", 
          email: "mason.nora@example.com", 
          contactType: "client", 
          title: "Lead Engineer",
          projects: [] 
        },
        { 
          firstName: "Yvonne", 
          lastName: "Zachary", 
          phone: "123-456-7812", 
          email: "yvonne.zachary@example.com", 
          contactType: "client", 
          title: "Lead Engineer",
          projects: [] 
        },
        { 
          firstName: "George", 
          lastName: "Hank", 
          phone: "123-456-7816", 
          email: "george.hank@example.com", 
          contactType: "client", 
          title: "Lead Engineer",
          projects: [] 
        },
        { 
          firstName: "Steven", 
          lastName: "Tina", 
          phone: "123-456-7822", 
          email: "steven.tina@example.com", 
          contactType: "client", 
          title: "Lead Engineer",
          projects: [] 
        }
      ]
    }
};

export default companiesWithContacts;