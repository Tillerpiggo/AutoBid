import axios from 'axios';
import { User, Contact } from './interfaces';

const API_BASE_URL = 'http://localhost:3000';

export const userService = {
    getUser: async (userId: string): Promise<User | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`);
            if (!response.ok) {
                console.error('Failed to fetch user data');
                return null;
            }
            const data = await response.json();
            return data.user;
        } catch (error) {
            console.error('Failed to fetch user data', error);
            return null;
        }
    },

    updateContact: async (userId: string, editedContact: Contact): Promise<User | null> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/users/${userId}/friends/${editedContact.id}`, {
                name: editedContact.name,
                birthday: editedContact.birthday
            });

            if (response.data && response.data.message === 'contact updated') {
                console.log('contact updated successfully');
                return response.data.user;
            } else {
                console.error('Failed to update contact');
                return null;
            }
        } catch (error) {
            console.error('Failed to update contact', error);
            return null;
        }
    },

    addContact: async (userId: string, newContact: Omit<Contact, 'id'>): Promise<User | null> => {
        console.log("trying to add contact");
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}/friends`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContact),
            });

            if (!response.ok) {
                console.error('Failed to add contact');
                return null;
            }

            const updatedUser = await response.json();
            return updatedUser.user;
        } catch (error) {
            console.error('Failed to add contact', error);
            return null;
        }
    },

    updateUser: async (userId: string, timezone: string, emailSendTime: string): Promise<User | null> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/users/${userId}`, {
                timezone,
                emailSendTime,
            });

            if (response.data && response.data.message === 'User updated') {
                console.log('User updated successfully');
                return response.data.user;
            } else {
                console.error('Failed to update user');
                return null;
            }
        } catch (error) {
            console.error('Failed to update user', error);
            return null;
        }
    },

    deleteContact: async (userId: string, contactId: string): Promise<User | null> => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/users/${userId}/friends/${contactId}`);

            if (response.data && response.data.message === 'Contact deleted') {
                console.log('Contact deleted successfully');
                return response.data.user;
            } else {
                console.error('Failed to delete contact');
                return null;
            }
        } catch (error) {
            console.error('Failed to delete contact', error);
            return null;
        }
    },
};