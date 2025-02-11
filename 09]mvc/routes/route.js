const express = require("express")
const route = express.Router()
const ctl = require("../controller/firstctl")

route.get("/",ctl.firstPage);
route.post("/addData",ctl.addData);
route.get("/deleteData",ctl.deleteData);
route.get("/editData/:id", ctl.editData);
route.post("/updateData",ctl.updateData);
module.exports = route;