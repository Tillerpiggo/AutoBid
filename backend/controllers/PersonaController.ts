import { Request, Response } from 'express';
import DatabaseManager from '../DatabaseManager';

export const PersonaController = (databaseManager: DatabaseManager) => {
    const addPersona = async (req: Request, res: Response) => {
        const { name } = req.body;
        const existingPersona = await databaseManager.getPersonaByName(name);
        if (existingPersona) {
            return res.send({ message: "existing persona", persona: existingPersona });
        }
        const persona = await databaseManager.createPersona(name);
        res.send({ message: "new persona", persona });
    };

    const getAllPersona = async (req: Request, res: Response) => {
        const personas = await databaseManager.getAllPersonas();
        res.send({ personas });
    };

    const editPersona = async (req: Request, res: Response) => {
        const { personaId } = req.params;
        const { name } = req.body;
        try {
            const persona = await databaseManager.updatePersona(personaId, name);
            if (!persona) {
                return res.status(404).send({ error: 'Persona not found' });
            }
            res.send({ message: 'Persona updated', persona });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'An error occurred while updating the persona' });
        }
    };

    const deletePersona = async (req: Request, res: Response) => {
        const { personaId } = req.params;
    
        try {
            const persona = await databaseManager.deletePersona(personaId);
    
            if (!persona) {
                res.status(404).send({ message: 'Persona not found' });
                return;
            }
    
            res.send({ message: 'Persona deleted successfully', persona });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'An error occurred while deleting the persona' });
        }
    };

    return { addPersona, getAllPersona, editPersona, deletePersona };
};