export interface User {
    id: string;
    email: string;
    contacts: Contact[];
    timezone: string;
    emailSendTime: string;
}

export interface Contact {
    id: string;
    name: string;
    birthday: Date;
}