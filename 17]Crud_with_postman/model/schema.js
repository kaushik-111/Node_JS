const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const schema = mongoose.model("data", Schema);
module.exports = schema;
