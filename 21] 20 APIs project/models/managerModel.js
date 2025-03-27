// username, email, phone,password, adminId

const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    role: {
        type: String,
        enum: ['manager'],
        default: 'manager',
        immutable: true  
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }
});

module.exports = mongoose.model('manager', schema);