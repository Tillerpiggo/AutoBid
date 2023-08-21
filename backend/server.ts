import express, { Request, Response } from 'express'
import mongoose from 'mongoose';
import User, { IUser, IFriend } from './models/User';
import { NodeMailgun } from 'ts-mailgun';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());

// MongoDB
const MONGODB_URI = 'mongodb://localhost/newsletter_app';
mongoose.connect(MONGODB_URI);

// Mailgun
const mailer = new NodeMailgun();



// mailer.init();

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

// REGISTER
app.post('/register', async (req: Request, res: Response) => {
    console.log("register called");
    const { email } = req.body;

    // Check if a user with this email already exists
    if (await User.findOne({ email })) {
        // TODO: Log in the user instead
        console.log("user already exists");
        return res.status(400).send({ error: 'User with this email already exists' });
    }

    // Generate a 6-digit login code
    const loginCode = Math.floor(100000 + Math.random() * 900000);

    // Create a new user
    const user = new User({ email, loginCode, loginCodeExpires: Date.now() + 15 * 60 * 1000 }); // Login code expires in 15 minutes

    // Save the user to the database
    console.log("saving user");
    await user.save();
    console.log("user saved");
    

    res.send({ email });

    // const mailOptions = {
    //     from: process.env.MAILGUN_FROM_EMAIL,
    //     to: email,
    //     subject: 'Your Login Code',
    //     text: `Your login code is ${loginCode}`
    // };

    // mailer
    //     .send(email, 'Your Login Code', `<h1>Your login code is ${loginCode}</h1>`)
    //     .then(() => {
    //         res.send({ message: 'User registered, check your email for your login code' });
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         res.status(500).send({ error: 'Failed to send email' });
    //     });
});

// MANIPULATE FRIENDS

// Add friend
app.post('/users/:userId/friends', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, birthday } = req.body;
  
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
  
    // Add the new friend to the user's list of friends
    const newFriend = { name, birthday } as IFriend;
    user.friends.push(newFriend);
  
    // Save the user
    await user.save();
  
    res.send({ message: 'Friend added', user });

    // Remove sensitive data before sending response
    const userForClient = user.toObject();
    delete userForClient.loginCode;
    delete userForClient.loginCodeExpires;

    // Send the user data
    res.status(201).send(userForClient);
});

// Edit friend
app.put('/users/:userId/friends/:friendId', async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    const { name, birthday } = req.body;
  
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
  
    // Find the friend by ID
    const friend = user.friends.find(friend => friend.id === friendId);
    if (!friend) {
        return res.status(404).send({ error: 'Friend not found' });
    }
  
    // Update the friend's information
    if (name) {
        friend.name = name;
    }
    if (birthday) {
        friend.birthday = birthday;
    }
  
    // Save the user
    await user.save();
  
    res.send({ message: 'Friend updated', user });
});

// app.delete('/users/:userId/friends/:friendId', async (req: Request, res: Response) => {
//     const { userId, friendId } = req.params;
  
//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//         return res.status(404).send({ error: 'User not found' });
//     }
  
//     // Remove the friend by ID
//     const friend = user.getFriend(friendId) as IFriend & mongoose.Document;
//     if (friend) {
//         await mongoose.db().collection<Friend>
//     }
  
//     // Save the user
//     await user.save();
  
//     res.send({ message: 'Friend deleted', user });
// });

// Get friends list for user
app.get('/users/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
  
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
  
    res.send({ user });
});