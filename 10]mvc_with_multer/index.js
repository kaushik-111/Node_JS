const express = require("express");
const port = 1122;
const path = require("path");   
const app = express();

const db = require('./config/db')

const schema = require("./model/schema")

app.set("view engine", "ejs");
app.use(express.urlencoded())
app.use("/uploads",express.static(path.join(__dirname,'uploads')));

app.use("/",require("./routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started on port :- " + port);
})
