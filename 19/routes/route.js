const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const auth = require("../middleware/auth");

route.post("/registerAdmin",ctl.registerAdmin);
route.post("/logInAdmin",ctl.logInAdmin);
route.get("/viewAdmin", ctl.viewAdmin);
route.post("/changePassword",ctl.changePassword);
route.post("/forgetPassword",ctl.forgetPassword);
route.post("/resetPassword",ctl.resetPassword);

module.exports=route;