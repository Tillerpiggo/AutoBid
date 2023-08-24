export interface User {
    email: string;
    friends: Friend[];
}

export interface Friend {
    name: string;
    birthday: Date;
}