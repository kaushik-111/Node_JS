const express = require("express");
const port = 3344;

const app = express();
const db = require('./config/db')

const schema = require("./model/Firstschema")

app.set("view engine", "ejs");
app.use(express.urlencoded())

app.use("/",require("./routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started on port :- " + port);
})
