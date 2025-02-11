const express = require("express");
const path = require("path");
const port = 1234;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

const db = require("./config/db");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));


app.use("/", require("./routes/route"));

app.listen(port, (err) => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port);
});

