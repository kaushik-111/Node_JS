const express = require('express')
const port = 4444
const path = require('path')
const app = express()
const cookie = require('cookie-parser')
const passport = require("passport");
const session = require("express-session");
const db = require('./config/dataBase')

app.use(
  session({
    name:"local",
    secret:"rnw",
    resave:true,
    saveUninitialized:false,
    cookie:{maxAge:20000},
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(cookie())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use('/', require('./route/route'))

app.listen(port, err => {
  err ? console.log(err) : console.log('Server started on port:-', port)
})
