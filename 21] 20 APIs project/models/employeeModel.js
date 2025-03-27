// Username, email, Phone, password, ManagerId

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
        enum: ['employee'],
        default: 'employee',
        immutable: true  
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manager',
        required: true
    }
});

module.exports = mongoose.model('employee', schema);