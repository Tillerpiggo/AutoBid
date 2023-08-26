import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    id: string;
    email: string;
    loginCode: string;
    loginCodeExpires: Date;
    friends: IFriend[];

    getFriend: (id: string) => IFriend;
}

export interface IFriend extends Document {
    id: string;
    name: string;
    birthday: Date;
}

const FriendSchema: Schema = new Schema<IFriend>({
    name: { type: String, required: true },
    birthday: { type: Date, required: true }
});

const UserSchema: Schema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    loginCode: { type: String, required: true },
    loginCodeExpires: { type: Date },
    friends: [FriendSchema],
});

UserSchema.virtual('id').get(function(this: IUser) {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});

FriendSchema.virtual('id').get(function(this: IFriend) {
    return this._id.toHexString();
});

FriendSchema.set('toJSON', {
    virtuals: true
});

UserSchema.methods.getFriend = function (id: string) {
    return this.friends.find((friend: IFriend) => friend._id.toString() === id);
};

export const Friend = mongoose.model<IFriend>('Friend', FriendSchema);

export default mongoose.model<IUser>('User', UserSchema);