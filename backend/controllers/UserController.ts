import { Request, Response } from 'express';
import DatabaseManager from '../DatabaseManager';

export const UserController = (databaseManager: DatabaseManager) => {
    const registerUser = async (req: Request, res: Response) => {
        const { email } = req.body;
        const existingUser = await databaseManager.getUserByEmail(email);
        if (existingUser) {
            return res.send({ user: existingUser });
        }
        const user = await databaseManager.createUser(email);
        res.send({ user });
    };

    const getUserById = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const user = await databaseManager.getUserById(userId);
        if (!user) {
          return res.status(404).send({ error: 'User not found' }); 
        }
        res.send({ user });
      
    };

    const deleteUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
    
        try {
            const user = await databaseManager.deleteUser(userId);
    
            if (!user) {
                res.status(404).send({ message: 'User not found' });
                return;
            }
    
            res.send({ message: 'User deleted successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'An error occurred while deleting the user' });
        }
    }

    return { registerUser, getUserById, deleteUser };
};