export interface Transmittal {
    id: number;
    title: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdDate: string;
    createdBy: string;
    sentTo: string;
}
