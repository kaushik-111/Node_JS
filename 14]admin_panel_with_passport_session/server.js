const express = require("express");
const path = require("path");
const port = 1234;
const cookie = require("cookie-parser");
const session = require("express-session");

const app = express();
const db = require("./config/dataBase");
const passport = require("passport");

app.use(
    session({
        name: "local",
        secret : "admin",
        resave : true,
        saveUninitialized : false,
        cookie : {maxAge : 1000 * 60 * 10}
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(cookie());
app.use(express.static(path.join(__dirname, "public")));
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use("/", require("./route/route"));
app.use("/category", require("./route/categoryRoute"));
app.use("/subcategory",require("./route/subCategoryRoute"))
app.use("/extraCategory",require("./route/extraCategoryRoute"))
app.use("/product",require("./route/productRoute"))
app.listen(port, err => {
    err ? console.log("Error : ", err) : console.log("Server is running on port : ", port)
})