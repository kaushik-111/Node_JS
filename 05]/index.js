const express = require("express"); //1
const port = 1004;//2
const path = require("path");
const app = express();//3

app.set("view engine","ejs");

app.use("/public",express.static(path.join(__dirname,"public")))

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started on port:- " +port);
})//3

const middle = (req,res,next) =>{
    console.log("i am middleware");
} //4 

app.get("/",(req,res)=>{
    res.render("index");
})//5

app.get("/portfolio-details",(req,res)=>{
     res.render("portfolio-details");
})//6

app.get("/service-details",(req,res)=>{
    res.render("service-details");
})//7

app.get("/starter-page",(req,res)=>{
    res.render("starter-page");
})//8