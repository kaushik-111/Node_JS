const express = require("express")
const route = express.Router()
const ctl = require("../controller/multerCtl")
const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"uploads/")
    },

    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "-" + Date.now())
    }
})

const upload = multer ({storage:Storage}).single("image");

route.get("/",ctl.firstPage);
route.post("/addData", upload,ctl.addData);
route.get("/deleteData",ctl.deleteData);
route.get("/editData/:id", ctl.editData);
route.post("/updateData",upload,ctl.updateData);
module.exports = route;