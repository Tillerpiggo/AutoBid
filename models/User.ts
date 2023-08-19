const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    loginCode: { type: String, required: true },
    loginCodeExpires: { type: Date},
    friends: [{
        name: String,
        birthday: Date
    }]
});

export default mongoose.model('User', UserSchema);