const mongoose = require("mongoose");

const schema = mongoose.Schema({
    subCatName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
});

const subCatSchema = mongoose.model("subCategory",schema)

module.exports = subCatSchema;