const mongoose = require("mongoose");

const schema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    extraCategoryTd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extraCategory",
        required: true
    }
})

const productSchema = mongoose.model("Product",schema);
module.exports = productSchema;