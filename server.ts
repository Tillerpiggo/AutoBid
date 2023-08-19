import express, { Request, Response } from 'express'
import mongoose from 'mongoose';
import User from './models/User';
import { NodeMailgun } from 'ts-mailgun';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// MongoDB
const MONGODB_URI = 'mongodb://localhost/newsletter_app';
mongoose.connect(MONGODB_URI);

// Mailgun
const mailer = new NodeMailgun();

mailer.apiKey = 'd5f2b3f5e1354af28393cc0cc7e234c7-ee16bf1a-38bc24b4';
mailer.domain = 'sandbox8b5c461a52ed44469758906f83cd1231.mailgun.org';
mailer.fromEmail = 'ideas@autigift.com';
mailer.fromTitle = 'Autogift Inc';

mailer.init();

// Express Middleware
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.post('/register', async (req: Request, res: Response) => {
    const { email } = req.body;

    // Check if a user with this email already exists
    if (await User.findOne({ email })) {
        // TODO: Log in the user instead
        return res.status(400).send({ error: 'User with this email already exists' });
    }

    // Generate a 6-digit login code
    const loginCode = Math.floor(100000 + Math.random() * 900000);

    // Create a new user
    const user = new User({ email, loginCode, loginCodeExpires: Date.now() + 15 * 60 * 1000 }); // Login code expires in 15 minutes

    // Save the user to the database
    await user.save();

    const mailOptions = {
        from: process.env.MAILGUN_FROM_EMAIL,
        to: email,
        subject: 'Your Login Code',
        text: `Your login code is ${loginCode}`
    };

    mailer
        .send(email, 'Your Login Code', `<h1>Your login code is ${loginCode}</h1>`)
        .then(() => {
            res.send({ message: 'User registered, check your email for your login code' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ error: 'Failed to send email' });
        });
});