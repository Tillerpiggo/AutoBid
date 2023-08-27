import User, { Friend } from './models/User';
import mongoose from 'mongoose';

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

    async createUser(email: string) {
        const user = new User({ email });
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
        const user = await User.findById(userId);

        const friend = user.friends.find(friend => friend._id.toString() === friendId);
        if (name) friend.name = name;
        if (birthday) friend.birthday = new Date(birthday);

        await user.save();
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
}