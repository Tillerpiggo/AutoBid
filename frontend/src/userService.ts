import axios from 'axios';
import { User, Friend } from './interfaces';

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

    updateFriend: async (userId: string, editedFriend: Friend): Promise<User | null> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/users/${userId}/friends/${editedFriend.id}`, {
                name: editedFriend.name,
                birthday: editedFriend.birthday
            });

            if (response.data && response.data.message === 'Friend updated') {
                console.log('Friend updated successfully');
                return response.data.user;
            } else {
                console.error('Failed to update friend');
                return null;
            }
        } catch (error) {
            console.error('Failed to update friend', error);
            return null;
        }
    },

    addFriend: async (userId: string, newFriend: Omit<Friend, 'id'>): Promise<User | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}/friends`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFriend),
            });

            if (!response.ok) {
                console.error('Failed to add friend');
                return null;
            }

            const updatedUser = await response.json();
            return updatedUser.user;
        } catch (error) {
            console.error('Failed to add friend', error);
            return null;
        }
    }
};