const express = require("express")
const route = express.Router();
const ctl = require("../controller/ctl")

route.post("/addData",ctl.addData);
route.get("/viewData", ctl.viewData);          
route.delete("/deleteData/:id", ctl.deleteData);
route.put("/updateData/:id",ctl.updateData);

module.exports=route;