import mongoose, { Schema, Document } from 'mongoose';

export interface IFriend extends Document {
    name: string;
    birthday: Date;
}

export interface IUser extends Document {
    email: string;
    friends: IFriend[];

    getFriend: (id: string) => IFriend | undefined;
}

const FriendSchema: Schema = new Schema<IFriend>({
    name: { type: String, required: true },
    birthday: { type: Date, required: true }
});

const UserSchema: Schema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    friends: [FriendSchema]
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