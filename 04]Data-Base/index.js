const express = require("express");
const port = 1008;
const path = require("path")

const app = express();
app.set("view engine","ejs")
app.use("/public",express.static(path.join(__dirname,"public")))

const middle = (req,res,next)=>{
    console.log("i am middleware");  
    next() 
}

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/about",middle,(req,res)=>{
    res.render("about")
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started on port " + port);
})
