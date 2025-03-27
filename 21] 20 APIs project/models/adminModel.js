const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin', immutable: true } 
});

module.exports = mongoose.model('admin', schema);
