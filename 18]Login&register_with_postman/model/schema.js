const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
    },
    lName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp: { 
        type: Number
     }, 
    otpExpires: {
         type: Date
         },
     role: { 
        type: String,
        default: "admin" },
});

const schema = mongoose.model("adminData", Schema);
module.exports = schema;
