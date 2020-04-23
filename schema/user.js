const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, validate: /[a-zA-Z]/ },
    lastName: { type: String, validate: /[a-zA-Z]/ },
    email: { type: String },
    socialId: { type: String },
    phoneNumber: { type: String },
    gender: { type: String },
    image: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});

const User = mongoose.model('User', userSchema);
module.exports = User;