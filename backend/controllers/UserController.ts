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

  const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    const user = await databaseManager.getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send({ user });
  };

  return { registerUser, getUserByEmail };
};