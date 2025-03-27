const express = require('express');
const route = express.Router();
const managerCtl = require('../controllers/managerCtl');
const managerAuth = require('../middlewares/managerAuth');

route.post('/managerLogin', managerCtl.managerLogin);
route.get('/viewManager', managerAuth, managerCtl.viewManager);
route.post('/changePassword', managerAuth, managerCtl.changePassword);
route.post('/sendOtp', managerCtl.sendOtp);
route.post('/forgotPassword', managerCtl.forgotPassword);
route.post('/addEmployee', managerAuth, managerCtl.addEmployee);
route.get('/viewEmployees', managerAuth, managerCtl.viewEmployees);

module.exports = route;