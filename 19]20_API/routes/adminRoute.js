const express = require('express');
const route = express.Router();
const adminCtl = require('../controllers/adminCtl');
const adminAuth = require('../middlewares/adminAuth');

route.post('/adminRegister', adminCtl.adminRegister);
route.post('/adminLogin', adminCtl.adminLogin);
route.get('/viewAdmin', adminAuth, adminCtl.viewAdmin);
route.post('/changePassword', adminAuth, adminCtl.changePassword);
route.post('/sendOtp', adminCtl.sendOTP);
route.post('/forgotPassword', adminCtl.forgotPassword);
route.post('/addManager', adminAuth, adminCtl.addManager);
route.get('/viewManagers', adminAuth, adminCtl.viewManagers);
route.delete('/deleteManager/:id', adminAuth, adminCtl.deleteManager);
route.get('/viewEmployees', adminAuth, adminCtl.viewEmployees);
route.delete('/deleteEmployee/:id', adminAuth, adminCtl.deleteEmployee);

module.exports = route;