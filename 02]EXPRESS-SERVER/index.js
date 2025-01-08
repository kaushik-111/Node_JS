const express = require("express");
const port = 1008;

const app = express();

app.get("/",(req,res) => {
    res.write("<h1>Server Started :- </h1>");
    res.end()
})

app.listen(port,(err) => {
    err ? console.log(err) : console.log("server started :- " +port);
})