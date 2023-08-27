import User, { Friend } from './models/User';
import mongoose from 'mongoose';
import moment from 'moment-timezone';

export default class DatabaseManager {
    constructor() {
        mongoose.connect(process.env.MONGODB_URI);
    }

    async getAllUsers() {
        return await User.find({});
    }

    async getUserByEmail(email: string) {
        return await User.findOne({ email });
    }

    async getUserById(id: string) {
        return await User.findById(id);
    }

    async createUser(email: string, timezone: string) {
        const user = new User({ email, timezone, emailSendTime: '09:00' });
        await user.save();
        return user;
    }

    async addFriendToUser(userId: string, name: string, birthday: string) {
        const user = await this.getUserById(userId); // Changed to getUserById
    
        const newFriend = new Friend({ name, birthday });
        user.friends.push(newFriend);
    
        await user.save();
        return user;
    }

    async updateFriend(userId: string, friendId: string, name: string, birthday: string) {
        console.log(`Updating friend with ID ${friendId} for user with ID ${userId}`);
        
        const user = await User.findById(userId);
        if (!user) {
            console.error(`User with ID ${userId} not found`);
            return;
        }
    
        const friend = user.friends.find(friend => friend._id.toString() === friendId);
        if (!friend) {
            console.error(`Friend with ID ${friendId} not found`);
            return;
        }
    
        if (name) {
            console.log(`Updating name from ${friend.name} to ${name}`);
            friend.name = name;
        }
    
        if (birthday) {
            console.log(`Updating birthday from ${friend.birthday}`);
            const newBirthday = moment.tz(birthday, 'YYYY-MM-DD', user.timezone).startOf('day').toDate();
            console.log(`to ${newBirthday}`);
            friend.birthday = newBirthday;
        }
    
        await user.save();
        console.log(`User with ID ${userId} updated successfully`);
        return user;
    }

    async deleteUser(id: string) {
        return await User.findByIdAndDelete(id);
    }

    async deleteFriend(userId: string, friendId: string) {
        const user = await User.findById(userId);
    
        if (!user) {
            throw new Error("User not found");
        }
    
        user.friends = user.friends.filter(friend => friend._id.toString() !== friendId);
    
        await user.save();
        return user;
    }

    async updateUser(id: string, timezone: string, emailSendTime: string) {
        const user = await User.findById(id);
        if (!user) {
            console.error(`User with ID ${id} not found`);
            return;
        }
        user.timezone = timezone;
        user.emailSendTime = emailSendTime;
        await user.save();
        console.log(`User with ID ${id} updated successfully`);
        return user;
    }
}