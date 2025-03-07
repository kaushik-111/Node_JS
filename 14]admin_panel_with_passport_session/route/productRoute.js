const express = require("express");
const route = express.Router();
const ctl = require("../controller/productCtl");
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

const upload = multer({storage : storage}).single("productImage");


route.get("/productForm",passport.checkAuth ,ctl.productForm);
route.post("/productForm",passport.checkAuth,upload,ctl.addProductData)
route.get("/productTable", passport.checkAuth,ctl.productTable);
module.exports = route;