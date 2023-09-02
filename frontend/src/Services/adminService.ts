import axios from 'axios';
import { Persona } from '../App/interfaces';

const API_BASE_URL = "http://localhost:3000";

const adminService = {

    getPersona: async (personaId: string): Promise<Persona | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/personas/${personaId}`);
            if (!response.ok) {
                console.error('Failed to fetch persona data');
                return null;
            }
            const data = await response.json();
            return data.persona;
        } catch (error) {
            console.error('Failed to fetch persona data', error);
            return null;
        }
    },

    updatePersona: async (personaId: string, name: string): Promise<Persona | null> => {
        try {
            const response = await axios.put(`${API_BASE_URL}/admin/personas/${personaId}`, {
                name
            });

            if (response.data && response.data.message === 'Persona updated') {
                console.log('Persona updated successfully');
                return response.data.persona;
            } else {
                console.error('Failed to update persona');
                return null;
            }
        } catch (error) {
            console.error('Failed to update persona', error);
            return null;
        }
    },

    addPersona: async (newPersona: Omit<Persona, 'id'>): Promise<Persona | null> => {
        console.log("trying to add persona");
        try {
            const response = await fetch(`${API_BASE_URL}/admin/personas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPersona),
            });

            if (!response.ok) {
                console.error('Failed to add persona');
                return null;
            }

            const updatedPersona = await response.json();
            return updatedPersona.persona;
        } catch (error) {
            console.error('Failed to add persona', error);
            return null;
        }
    },

    deletePersona: async (personaId: string): Promise<Persona | null> => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/admin/personas/${personaId}`);

            if (response.data && response.data.message === 'Persona deleted') {
                console.log('Persona deleted successfully');
                return response.data.persona;
            } else {
                console.error('Failed to delete persona');
                return null;
            }
        } catch (error) {
            console.error('Failed to delete persona', error);
            return null;
        }
    },
    
    getAllPersonas: async (): Promise<Persona[] | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/personas`);
            if (!response.ok) {
                console.error('Failed to fetch all personas');
                return null;
            }
            const data = await response.json();
            return data.personas;
        } catch (error) {
            console.error('Failed to fetch all personas', error);
            return null;
        }
    },
};

export default adminService;