const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/, // ✅ Sirf alphabets aur spaces allow honge
    },
    price: {
        type: Number,
        required: true,
        min: 0, // ✅ Price negative nahi ho sakta
    },
    description: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/, // ✅ Sirf alphabets aur spaces allow honge
    },
    category: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/, // ✅ Sirf alphabets aur spaces allow honge
    },
    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 5, // ✅ Rate sirf 0 se 5 ke beech ho sakta hai
    },
    count: {
        type: Number,
        required: true,
        min: 0, // ✅ Count negative nahi ho sakta
    }
});

const schema = mongoose.model("data", Schema);
module.exports = schema;
