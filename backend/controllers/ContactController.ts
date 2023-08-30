import { Request, Response } from 'express';
import DatabaseManager from '../DatabaseManager';

export const ContactController = (databaseManager: DatabaseManager) => {
    const addContact = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { name, birthdayDay, birthdayMonth } = req.body;
        const user = await databaseManager.addContactToUser(userId, name, birthdayDay, birthdayMonth);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'Contact added', user });
    };

    const updateContact = async (req: Request, res: Response) => {
        const { userId, contactId } = req.params;
        const { name, birthdayDay, birthdayMonth } = req.body;
        const user = await databaseManager.updateContact(userId, contactId, name, birthdayDay, birthdayMonth);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'Contact updated', user });
    };

    const deleteContact = async (req: Request, res: Response) => {
        const { userId, contactId } = req.params;
        const user = await databaseManager.deleteContact(userId, contactId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'Contact deleted', user });
    };

    return { addContact, updateContact, deleteContact };
};