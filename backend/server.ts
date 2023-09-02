import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import EmailManager from './EmailManager';
import DatabaseManager from './DatabaseManager';

import { UserController } from './controllers/UserController';
import { ContactController } from './controllers/ContactController';
import { PersonaController } from './controllers/PersonaController';

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
const contactController = ContactController(databaseManager);
const personaController = PersonaController(databaseManager);

// User routes
app.post('/register', userController.registerUser);
app.get('/users/:userId', userController.getUserById); 
app.put('/users/:userId', userController.updateUser);

// Add deleteUser route
app.delete('/users/:userId', userController.deleteUser); 

// Contact routes
app.post('/users/:userId/contacts', contactController.addContact);
app.put('/users/:userId/contacts/:contactId', contactController.updateContact);
app.delete('/users/:userId/contacts/:contactId', contactController.deleteContact);

// Admin (product and persona) routes
app.post('/admin/personas', personaController.addPersona);
app.get('/admin/personas', personaController.getAllPersona);
app.put('/admin/personas/:personaId', personaController.editPersona);
app.delete('/admin/personas/:personaId', personaController.deletePersona);

app.post('/debug/send-emails', async (req: Request, res: Response) => {
    emailManager.sendEmailsNow();
    res.send({ message: 'Emails sent' });
});