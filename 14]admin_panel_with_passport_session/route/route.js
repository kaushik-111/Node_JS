const express = require("express");
const route = express.Router();
const ctl = require("../controller/adminCtl");
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

route.get("/", ctl.adminLogin);
route.get("/dashboard", passport.checkAuth, ctl.dashboard);
route.get("/adminForm", passport.checkAuth, ctl.adminForm);
route.post("/addAdmin", upload, ctl.addAdmin);
route.get("/adminTable", passport.checkAuth, ctl.adminTable);
route.get("/adminDelete/:id", passport.checkAuth, ctl.adminDelete);
route.get("/adminEdit/:id", passport.checkAuth, ctl.adminEdit);
route.post("/adminUpdate", upload, ctl.adminUpdate);
route.post("/login", passport.authenticate("local", {failureRedirect : "/"}), ctl.login)
route.get("/logout", ctl.logout)


module.exports = route;