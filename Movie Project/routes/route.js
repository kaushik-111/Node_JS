const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const multer = require("multer");

const Storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const upload = multer({storage : Storage}).single("image");

route.get("/", ctl.readData);
route.get("/addData", ctl.addData);
route.post("/submitEvent", upload, ctl.createData);
route.get("/deleteData/:id", ctl.deleteData);
route.get("/editData/:id", ctl.editData);
route.post("/updateData", upload, ctl.updateData);

module.exports = route;