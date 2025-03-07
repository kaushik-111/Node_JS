const express = require("express");
const route = express.Router();
const ctl = require("../controller/categoryCtl");
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

const upload = multer({storage : storage}).single("categoryImage");

route.get("/categoryForm", passport.checkAuth,ctl.categoryForm);
route.post("/categoryForm",passport.checkAuth,upload,ctl.addCategoryData)
route.get("/categoryTable",passport.checkAuth, ctl.categoryTable);
route.get("/deleteCategory/:id",passport.checkAuth,ctl.deleteCategory);
route.get("/categoryEdit/:id",passport.checkAuth, ctl.categoryEdit);
route.post("/categoryUpdate",passport.checkAuth, upload, ctl.categoryUpdate);

module.exports = route;