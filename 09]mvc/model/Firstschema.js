const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    }
})

const schema = mongoose.model("data",Schema)
module.exports =  schema;