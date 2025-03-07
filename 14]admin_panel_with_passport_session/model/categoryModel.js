const mongoose = require("mongoose");

const schema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    }
})

const categorySchema = mongoose.model("Category",schema);
module.exports = categorySchema;