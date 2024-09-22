import { Transmittal } from  '../types/transmittals';

 const transmittals: Transmittal[] = [
    { id: 1, title: "Initial Planning", status: "Pending", createdDate: "2023-10-01", createdBy: "John Doe", sentTo: "Client A" },
    { id: 2, title: "Budget Review", status: "Approved", createdDate: "2023-10-02", createdBy: "Jane Smith", sentTo: "Client B" },
    { id: 3, title: "Safety Standards", status: "Rejected", createdDate: "2023-10-03", createdBy: "Alice Johnson", sentTo: "Client C" },
    { id: 4, title: "Compliance Check", status: "Pending", createdDate: "2023-10-04", createdBy: "Michael Brown", sentTo: "Client D" },
    { id: 5, title: "Project Expansion", status: "Approved", createdDate: "2023-10-05", createdBy: "Claire Davis", sentTo: "Client E" },
    { id: 6, title: "Resource Allocation", status: "Pending", createdDate: "2023-10-06", createdBy: "Edward Wilson", sentTo: "Client F" },
    { id: 7, title: "Quarterly Review", status: "Approved", createdDate: "2023-10-07", createdBy: "Nancy Moore", sentTo: "Client G" },
    { id: 8, title: "New Regulations", status: "Rejected", createdDate: "2023-10-08", createdBy: "Daniel Taylor", sentTo: "Client H" },
    { id: 9, title: "Stakeholder Meeting", status: "Approved", createdDate: "2023-10-09", createdBy: "Laura Martinez", sentTo: "Client I" },
    { id: 10, title: "Technology Integration", status: "Pending", createdDate: "2023-10-10", createdBy: "Kevin Garcia", sentTo: "Client J" },
    { id: 11, title: "Supplier Contracts", status: "Rejected", createdDate: "2023-10-11", createdBy: "Sara White", sentTo: "Client K" },
    { id: 12, title: "Annual Goals", status: "Approved", createdDate: "2023-10-12", createdBy: "Linda Thomas", sentTo: "Client L" },
    { id: 13, title: "Risk Management", status: "Pending", createdDate: "2023-10-13", createdBy: "Barbara Jackson", sentTo: "Client M" },
    { id: 14, title: "Client Feedback", status: "Rejected", createdDate: "2023-10-14", createdBy: "Susan Lee", sentTo: "Client N" },
    { id: 15, title: "Performance Evaluation", status: "Approved", createdDate: "2023-10-15", createdBy: "Robert Harris", sentTo: "Client O" },
    { id: 16, title: "Final Inspection", status: "Pending", createdDate: "2023-10-16", createdBy: "Patricia Clark", sentTo: "Client P" },
    { id: 17, title: "Environmental Concerns", status: "Approved", createdDate: "2023-10-17", createdBy: "Jennifer Lewis", sentTo: "Client Q" },
    { id: 18, title: "Market Trends", status: "Rejected", createdDate: "2023-10-18", createdBy: "William Young", sentTo: "Client R" },
    { id: 19, title: "Innovation Workshop", status: "Pending", createdDate: "2023-10-19", createdBy: "Jessica Hall", sentTo: "Client S" },
    { id: 20, title: "Expansion Plans", status: "Approved", createdDate: "2023-10-20", createdBy: "Thomas Allen", sentTo: "Client T" },
    { id: 21, title: "Strategic Planning", status: "Pending", createdDate: "2023-10-21", createdBy: "John Doe", sentTo: "Client U" },
    { id: 22, title: "Financial Review", status: "Approved", createdDate: "2023-10-22", createdBy: "Jane Smith", sentTo: "Client V" },
    { id: 23, title: "Safety Audit", status: "Rejected", createdDate: "2023-10-23", createdBy: "Alice Johnson", sentTo: "Client W" },
    { id: 24, title: "Regulatory Compliance", status: "Pending", createdDate: "2023-10-24", createdBy: "Michael Brown", sentTo: "Client X" },
    { id: 25, title: "Expansion Phase I", status: "Approved", createdDate: "2023-10-25", createdBy: "Claire Davis", sentTo: "Client Y" },
    { id: 26, title: "Project Resource Management", status: "Pending", createdDate: "2023-10-26", createdBy: "Edward Wilson", sentTo: "Client Z" },
    { id: 27, title: "Annual Review", status: "Approved", createdDate: "2023-10-27", createdBy: "Nancy Moore", sentTo: "Client AA" },
    { id: 28, title: "Regulatory Update", status: "Rejected", createdDate: "2023-10-28", createdBy: "Daniel Taylor", sentTo: "Client BB" },
    { id: 29, title: "Stakeholder Meeting", status: "Approved", createdDate: "2023-10-29", createdBy: "Laura Martinez", sentTo: "Client CC" },
    { id: 30, title: "System Overhaul", status: "Pending", createdDate: "2023-10-30", createdBy: "Kevin Garcia", sentTo: "Client DD" },
    { id: 31, title: "Contract Renegotiation", status: "Rejected", createdDate: "2023-10-31", createdBy: "Sara White", sentTo: "Client EE" },
    { id: 32, title: "Goal Setting for 2024", status: "Approved", createdDate: "2023-11-01", createdBy: "Linda Thomas", sentTo: "Client FF" },
    { id: 33, title: "Risk Assessment", status: "Pending", createdDate: "2023-11-02", createdBy: "Barbara Jackson", sentTo: "Client GG" },
    { id: 34, title: "Feedback Plan", status: "Rejected", createdDate: "2023-11-03", createdBy: "Susan Lee", sentTo: "Client HH" },
    { id: 35, title: "Yearly Analysis", status: "Approved", createdDate: "2023-11-04", createdBy: "Robert Harris", sentTo: "Client II" },
    { id: 36, title: "Final Inspection", status: "Pending", createdDate: "2023-11-05", createdBy: "Patricia Clark", sentTo: "Client JJ" },
    { id: 37, title: "Impact Report", status: "Approved", createdDate: "2023-11-06", createdBy: "Jennifer Lewis", sentTo: "Client KK" },
    { id: 38, title: "Market Briefing", status: "Rejected", createdDate: "2023-11-07", createdBy: "William Young", sentTo: "Client LL" },
    { id: 39, title: "Innovation Strategies", status: "Pending", createdDate: "2023-11-08", createdBy: "Jessica Hall", sentTo: "Client MM" },
    { id: 40, title: "Expansion Planning", status: "Approved", createdDate: "2023-11-09", createdBy: "Thomas Allen", sentTo: "Client NN" },
    { id: 41, title: "Cost Review", status: "Pending", createdDate: "2023-11-10", createdBy: "John Doe", sentTo: "Client OO" },
    { id: 42, title: "Marketing Strategy", status: "Approved", createdDate: "2023-11-11", createdBy: "Jane Smith", sentTo: "Client PP" },
    { id: 43, title: "Safety Evaluation", status: "Rejected", createdDate: "2023-11-12", createdBy: "Alice Johnson", sentTo: "Client QQ" },
    { id: 44, title: "Compliance Monitoring", status: "Pending", createdDate: "2023-11-13", createdBy: "Michael Brown", sentTo: "Client RR" },
    { id: 45, title: "Project Scope Expansion", status: "Approved", createdDate: "2023-11-14", createdBy: "Claire Davis", sentTo: "Client SS" },
    { id: 46, title: "Resource Allocation", status: "Pending", createdDate: "2023-11-15", createdBy: "Edward Wilson", sentTo: "Client TT" },
    { id: 47, title: "Quarterly Report", status: "Approved", createdDate: "2023-11-16", createdBy: "Nancy Moore", sentTo: "Client UU" },
    { id: 48, title: "Regulatory Review", status: "Rejected", createdDate: "2023-11-17", createdBy: "Daniel Taylor", sentTo: "Client VV" },
    { id: 49, title: "Tech Integration", status: "Pending", createdDate: "2023-11-18", createdBy: "Laura Martinez", sentTo: "Client WW" },
    { id: 50, title: "Contract Review", status: "Approved", createdDate: "2023-11-19", createdBy: "Kevin Garcia", sentTo: "Client XX" },
    { id: 51, title: "Supplier Update", status: "Rejected", createdDate: "2023-11-20", createdBy: "Sara White", sentTo: "Client YY" },
    { id: 52, title: "Annual Goals Review", status: "Approved", createdDate: "2023-11-21", createdBy: "Linda Thomas", sentTo: "Client ZZ" },
    { id: 53, title: "Risk Analysis", status: "Pending", createdDate: "2023-11-22", createdBy: "Barbara Jackson", sentTo: "Client AAA" },
    { id: 54, title: "Feedback Plan", status: "Rejected", createdDate: "2023-11-23", createdBy: "Susan Lee", sentTo: "Client BBB" },
    { id: 55, title: "Yearly Assessment", status: "Approved", createdDate: "2023-11-24", createdBy: "Robert Harris", sentTo: "Client CCC" },
    { id: 56, title: "Project Inspection", status: "Pending", createdDate: "2023-11-25", createdBy: "Patricia Clark", sentTo: "Client DDD" },
    { id: 57, title: "Environmental Review", status: "Approved", createdDate: "2023-11-26", createdBy: "Jennifer Lewis", sentTo: "Client EEE" },
    { id: 58, title: "Market Trends Report", status: "Rejected", createdDate: "2023-11-27", createdBy: "William Young", sentTo: "Client FFF" },
    { id: 59, title: "Strategic Planning", status: "Pending", createdDate: "2023-11-28", createdBy: "Jessica Hall", sentTo: "Client GGG" },
    { id: 60, title: "Expansion Strategy", status: "Approved", createdDate: "2023-11-29", createdBy: "Thomas Allen", sentTo: "Client HHH" }
];

export default transmittals;