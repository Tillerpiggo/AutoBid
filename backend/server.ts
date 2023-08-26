import express, { Request, Response } from 'express'
import mongoose, { ObjectId } from 'mongoose';
import User, { Friend } from './models/User';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
const mailchimp = mailchimpFactory(process.env.MAILCHIMP_API_KEY);

// TEST MAILCHIMP
async function run() {
    const response = await mailchimp.users.ping();
    console.log(response);
}
  
run();

interface MemberData {
    email_address: string;
    status: string;
}

dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());

// MongoDB
const MONGODB_URI = 'mongodb://localhost/newsletter_app';
mongoose.connect(MONGODB_URI);

// Express Middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

function computeMemberId(email: string): string {
    return crypto.createHash('md5').update(email.toLowerCase()).digest("hex");
}

// REGISTER
app.post('/register', async (req: Request, res: Response) => {
    console.log("register called");
    const { email } = req.body;

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        console.log("Existing user: " + existingUser);
        res.send({ user: existingUser });
        return
    }

    // Generate a 6-digit login code
    const loginCode = Math.floor(100000 + Math.random() * 900000);

    // Create a new user
    const user = new User({ email, loginCode, loginCodeExpires: Date.now() + 15 * 60 * 1000 }); // Login code expires in 15 minutes

    // Save the user to the database
    console.log("saving user");
    await user.save();
    console.log("user saved");

    console.log("new user ", user);

    const memberData: MemberData = {
        email_address: email,
        status: 'subscribed',
    };

    mailchimp.post(`/lists/your_list_id/members/`, memberData)
        .then((results: any) => {
        console.log('New member added successfully.');
    })
    .catch((err: any) => {
        console.error('Error: ' + err);
    });

    res.send({ user });
    console.log("user email: " + user.email);
    console.log("user id: " + user._id.toString());
});

// MANIPULATE FRIENDS

// Add friend
app.post('/users/:userEmail/friends', async (req: Request, res: Response) => {
    const { userEmail } = req.params;
    const { name, birthday } = req.body;

    console.log("finding user with email: " + userEmail);
  
    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        //return res.status(404).send({ error: 'User not found' });
    }
  
    // Add the new friend to the user's list of friends
    const newFriend = new Friend({ name, birthday });
    user.friends.push(newFriend);
  
    // Save the user
    await user.save();

    // Remove sensitive data before sending response
    res.send({ message: 'Friend added', user });
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
    const friend = user.friends.find(friend => friend._id.toString() === friendId);
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

// Get user from email
app.get('/users/:email', async (req: Request, res: Response) => {
    const { email } = req.params;
  
    // Find the user by ID
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    //const userForClient = prepareUserForClient(user);
    res.send({ user });
});