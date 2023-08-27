import { Request, Response } from 'express';
import DatabaseManager from '../DatabaseManager';

export const FriendController = (databaseManager: DatabaseManager) => {
    const addFriend = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { name, birthday } = req.body;
        const user = await databaseManager.addFriendToUser(userId, name, birthday);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'Friend added', user });
    };

    const updateFriend = async (req: Request, res: Response) => {
        const { userId, friendId } = req.params;
        const { name, birthday } = req.body;
            const user = await databaseManager.updateFriend(userId, friendId, name, birthday);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'Friend updated', user });
    };

    const deleteFriend = async (req: Request, res: Response) => {
        const { userId, friendId } = req.params;
        const user = await databaseManager.deleteFriend(userId, friendId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'Friend deleted', user });
    };

    return { addFriend, updateFriend, deleteFriend };
};