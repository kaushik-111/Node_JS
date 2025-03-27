const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/20_APIs');
const db = mongoose.connection;

db.once('open', (err) => {
    err ? console.error(err) : console.log('Connected to MongoDB...');
});

module.exports = db;