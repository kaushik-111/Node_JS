const mongoose = require("mongoose");

const schema = mongoose.Schema({
    extCatName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
        required: true
    }
});

const extraCategorySchema = mongoose.model("extraCategory",schema)

module.exports = extraCategorySchema;