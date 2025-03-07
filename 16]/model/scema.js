const mongoose = require("mongoose");

const Schema = mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    }
})

const FirstScema = mongoose.model("firstDatabase",Schema);

module.exports = FirstScema;