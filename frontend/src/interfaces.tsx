export interface User {
    _id: string;
    email: string;
    friends: Friend[];
}

export interface Friend {
    id: string;
    name: string;
    birthday: Date;
}