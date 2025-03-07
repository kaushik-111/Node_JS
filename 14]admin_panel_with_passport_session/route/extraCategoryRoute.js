const express = require("express");
const route = express.Router();
const ctl = require("../controller/extraCategoryCtl");
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


route.get("/ExtraCategoryForm",passport.checkAuth ,ctl.ExtraCategoryForm);
route.post("/ExtraCategoryForm",passport.checkAuth ,ctl.addExtraCategoryData);
route.get("/ExtraCategoryTable",passport.checkAuth ,ctl.ExtraCategoryTable);
module.exports = route;