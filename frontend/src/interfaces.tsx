export interface User {
    id: string;
    email: string;
    friends: Friend[];
    timezone: string;
    emailSendTime: string;
}

export interface Friend {
    id: string;
    name: string;
    birthday: Date;
}