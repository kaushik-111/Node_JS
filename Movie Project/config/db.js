const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/multerPractice");
const db = mongoose.connection;

db.once("open", err => {
    err ? console.log("Error : ", err) : console.log("Database Connect...");
})

module.exports = db;