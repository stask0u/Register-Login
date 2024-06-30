const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
        // trim: true,
        // lowercase: true,
        // match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        // required: true,
        // minlength: 6
    },
    profilePicture: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;