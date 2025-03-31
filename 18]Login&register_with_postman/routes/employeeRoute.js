const express = require('express');
const route = express.Router();
const employeeAuth = require('../middlewares/employeeAuth');
const employeeCtl = require('../controllers/employeeCtl');

route.post('/employeeLogin', employeeCtl.employeeLogin);
route.get('/viewEmployee', employeeAuth, employeeCtl.viewEmployee);
route.post('/changePassword', employeeAuth, employeeCtl.changePassword);
route.post('/sendOtp', employeeCtl.sendOtp);
route.post('/forgotPassword', employeeCtl.forgotPassword);

module.exports = route;