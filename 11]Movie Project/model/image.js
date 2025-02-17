const mongoose = require("mongoose");

const schema = mongoose.Schema({
    image : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    time : {
        type : Date,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
})

const imageSchema = mongoose.model("imageDB", schema);
module.exports = imageSchema;




