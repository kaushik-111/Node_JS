const express = require("express");
const route = express.Router();
const ctl = require("../controller/subCategoryCtl");
const multer = require("multer");
const passport = require("../middleware/passport");

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "upload/");
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const upload = multer({storage : storage}).single("image");


route.get("/SubCategoryForm", passport.checkAuth,ctl.addSubCategory);
route.post("/SubCategoryForm",passport.checkAuth,ctl.addSubCategoryData)
route.get("/SubCategoryTable",passport.checkAuth, ctl.viewSubCategory);
module.exports = route;