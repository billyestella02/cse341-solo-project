const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: String, required: true }
}, { versionKey: false});

module.exports = mongoose.model('User', userSchema, 'users');