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

    async createUser(email: string) {
        const user = new User({ email });
        await user.save();
        return user;
    }

    async addFriendToUser(userEmail: string, name: string, birthday: string) {
        const user = await this.getUserByEmail(userEmail);

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
}