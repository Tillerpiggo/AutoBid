import User, { Contact } from './models/User';
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

    async createUser(email: string, timezone: string) {
        const user = new User({ email, timezone, emailSendTime: '09:00', daysBeforeEmailSend: 14, hasAddedContact: false });
        await user.save();
        return user;
    }

    async addContactToUser(userId: string, name: string, birthdayDay: number, birthdayMonth: number) {
        const user = await this.getUserById(userId);
    
        const newContact = new Contact({ name, birthdayDay, birthdayMonth });
        user.contacts.push(newContact);

        user.hasAddedContact = true;
    
        await user.save();
        return user;
    }

    async updateContact(userId: string, contactId: string, name: string, birthdayDay: number, birthdayMonth: number) {
        console.log(`Updating contact with ID ${contactId} for user with ID ${userId}`);
        
        const user = await User.findById(userId);
        if (!user) {
            console.error(`User with ID ${userId} not found`);
            return;
        }
    
        const contact = user.contacts.find(contact => contact._id.toString() === contactId);
        if (!contact) {
            console.error(`Contact with ID ${contactId} not found`);
            return;
        }
    
        if (name) {
            console.log(`Updating name from ${contact.name} to ${name}`);
            contact.name = name;
        }
    
        contact.birthdayDay = birthdayDay;
        contact.birthdayMonth = birthdayMonth;
    
        await user.save();
        console.log(`User with ID ${userId} updated successfully`);
        return user;
    }

    async deleteUser(id: string) {
        return await User.findByIdAndDelete(id);
    }

    async deleteContact(userId: string, contactId: string) {
        const user = await User.findById(userId);
    
        if (!user) {
            throw new Error("User not found");
        }
    
        user.contacts = user.contacts.filter(contact => contact._id.toString() !== contactId);
    
        await user.save();
        return user;
    }

    async updateUser(id: string, timezone: string, emailSendTime: string, daysBeforeEmailSend: number) {
        const user = await User.findById(id);
        if (!user) {
            console.error(`User with ID ${id} not found`);
            return;
        }
        user.timezone = timezone;
        user.emailSendTime = emailSendTime;
        user.daysBeforeEmailSend = daysBeforeEmailSend;
        await user.save();
        console.log(`User with ID ${id} updated successfully`);
        return user;
    }
}