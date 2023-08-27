import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import EmailManager from './EmailManager';
import DatabaseManager from './DatabaseManager';

import { UserController } from './controllers/UserController';
import { FriendController } from './controllers/FriendController';

// Setup the app
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Setup managers
const databaseManager = new DatabaseManager();
const emailManager = new EmailManager(databaseManager.getAllUsers);
emailManager.startDailyJob();

// Setup controllers
const userController = UserController(databaseManager);
const friendController = FriendController(databaseManager);

// User routes
app.post('/register', userController.registerUser);
app.get('/users/:userId', userController.getUserById); 
app.put('/users/:userId', userController.updateUser);

// Add deleteUser route
app.delete('/users/:userId', userController.deleteUser); 

// Friend routes
app.post('/users/:userId/friends', friendController.addFriend);
app.put('/users/:userId/friends/:friendId', friendController.updateFriend);
app.delete('/users/:userId/friends/:friendId', friendController.deleteFriend);

app.post('/debug/send-emails', async (req: Request, res: Response) => {
    emailManager.sendEmailsNow();
    res.send({ message: 'Emails sent' });
});