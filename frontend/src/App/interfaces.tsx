export interface Persona {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    persona: string;
    name: string;
    brand: string;
    price: number;
    image: string;
}

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
    persona: string;  // Persona is now an object, not a string
}