const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    imgUrl:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    autherName:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    soldCopies:{
        type:Number,
        require:true
    },
    publishDate:{
        type:Date,
        require:true
    }
})

const FirstScema = mongoose.model("firstDatabase",Schema);

module.exports = FirstScema;