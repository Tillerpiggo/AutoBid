import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    name: string;
    birthdayDay: number;
    birthdayMonth: number;
    persona: string;
}

export interface IUser extends Document {
    email: string;
    timezone: string;
    emailSendTime: string;
    daysBeforeEmailSend: number;
    contacts: IContact[];
    hasAddedContact: boolean;

    getContact: (id: string) => IContact | undefined;
}

const ContactSchema: Schema = new Schema<IContact>({
    name: { type: String, required: true },
    birthdayDay: { type: Number, required: true },
    birthdayMonth: { type: Number, required: true },
    persona: { type: String, required: true }
});

const UserSchema: Schema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    timezone: { type: String, required: true },
    emailSendTime: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
    daysBeforeEmailSend: { type: Number, required: true },
    contacts: [ContactSchema],
    hasAddedContact: { type: Boolean, required: true }
});

UserSchema.virtual('id').get(function(this: IUser) {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});

ContactSchema.virtual('id').get(function(this: IContact) {
    return this._id.toHexString();
});

ContactSchema.set('toJSON', {
    virtuals: true
});

UserSchema.methods.getcontact = function (id: string) {
    return this.contacts.find((contact: IContact) => contact._id.toString() === id);
};

export interface IPersona extends Document {
    name: string;
}

export interface IProduct extends Document {
    persona: string;
    name: string;
    brand: string;
    price: number;
    image: string;
}

const PersonaSchema: Schema = new Schema<IPersona>({
    name: { type: String, required: true },
});

const ProductSchema: Schema = new Schema<IProduct>({
    persona: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});

PersonaSchema.virtual('id').get(function(this: IPersona) {
    return this._id.toHexString();
});

PersonaSchema.set('toJSON', {
    virtuals: true
});

ProductSchema.virtual('id').get(function(this: IProduct) {
    return this._id.toHexString();
});

ProductSchema.set('toJSON', {
    virtuals: true
});

export const Persona = mongoose.model<IPersona>('Persona', PersonaSchema);
export const Product = mongoose.model<IProduct>('Product', ProductSchema);
export const Contact = mongoose.model<IContact>('Contact', ContactSchema);

export default mongoose.model<IUser>('User', UserSchema);