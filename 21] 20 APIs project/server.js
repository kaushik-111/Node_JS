const express = require('express');
const session = require('express-session');

const port = 1234;

const app = express();
const db = require('./config/db');

app.use(express.urlencoded()); 


app.use(
    session({
        name: "local",
        secret : "admin",
        resave : true,
        saveUninitialized : false,
        cookie : {maxAge : 1000 * 60 * 10}
    })
);


app.use("/admin", require('./routes/adminRoute'));
app.use("/manager", require('./routes/managerRoute'));
app.use("/employee", require('./routes/employeeRoute'));

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server is running on port: ", port);
});