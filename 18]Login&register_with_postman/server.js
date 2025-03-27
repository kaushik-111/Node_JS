const express = require("express");
const port = 2020;
const db = require("./config/db");
const app = express();

app.use(express.json())      
app.use(express.urlencoded())

app.use("/",require("./routes/route"))
app.listen(port,(error)=>{
    error ? console.log(error) : console.log("Server Started Port on :",port);    
})