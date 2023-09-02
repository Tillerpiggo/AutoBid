export interface User {
    id: string;
    email: string;
    contacts: Contact[];
    timezone: string;
    emailSendTime: string;
    daysBeforeEmailSend: number;
    hasAddedContact: boolean;
}

export interface Contact {
    id: string;
    name: string;
    birthdayDay: number;
    birthdayMonth: number;
    persona: string;
}