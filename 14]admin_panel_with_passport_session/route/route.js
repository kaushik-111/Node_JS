const express = require('express')
const route = express.Router()
const ctl = require('../controller/adminCtl')
const multer = require('multer')
const passsport = require("../middleware/passport");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage }).single('image')

route.post("/login",
    passsport.authenticate("local",{failureRedirect:"/"},
        ctl.adminLogin
    )
)

route.get('/', ctl.adminLogin)
route.get('/logout', ctl.logout)
route.get('/dashBoard',passsport.checkAuth ,ctl.dashBoard)
route.get('/adminForm', ctl.adminForm)
route.post('/addAdmin', upload, ctl.addAdmin)
route.get('/adminTable', ctl.adminTable)
route.get('/adminDelete/:id', ctl.adminDelete)
route.get('/adminEdit/:id', ctl.adminEdit)
route.post('/adminUpdate', upload, ctl.adminUpdate)
module.exports = route