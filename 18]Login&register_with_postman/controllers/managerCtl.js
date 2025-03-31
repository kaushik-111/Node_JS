const managerModel = require('../models/managerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../middlewares/mailer');
const employeeModel = require('../models/employeeModel');


// MANAGER LOGIN
module.exports.managerLogin = async(req, res) => {
    const manager = await managerModel.findOne({ email: req.body.email });

    if (!manager ||!(await bcrypt.compare(req.body.password, manager.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: manager._id }, 'manager', { expiresIn: '24h' });

    res.json({ message: 'Manager logged in successfully!', token });
};


// VIEW MANAGER DATA 
module.exports.viewManager = async(req, res) => {
    await managerModel.findById(req.manager.id).then((manager) => {
        res.json({ message: 'Manager data fetched successfully!', data: manager });
    });
};


// CHANGE PASSWORD
module.exports.changePassword = async(req, res) => {
    const manager = await managerModel.findById(req.manager.id);

    if (!manager ||!(await bcrypt.compare(req.body.oldPassword, manager.password))) {
        return res.status(400).json({ message: 'Invalid current password' });
    }

    if(req.body.newPassword === req.body.confirmPassword) {
        await managerModel.findByIdAndUpdate(req.manager.id, { password: await bcrypt.hash(req.body.newPassword, 10) }).then(() => {
            res.json({ message: 'Password changed successfully!' });
        });
    }
    else {
        res.status(400).json({ message: 'Passwords do not match!' });
    }
};


// SEND OTP
module.exports.sendOtp = async(req, res) => {
    const manager = await managerModel.findOne({email: req.body.email});

    let otp = Math.floor(Math.random() * 1000000);
    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.manager = manager;

    res.status(200).json({ message: 'OTP sent successfully!' });
};


// CHANGE FORGOT PASSWORD
module.exports.forgotPassword = async(req, res) => {
    const otp = req.session.otp;
    const manager = req.session.manager;

    console.log(manager);
    if(otp != req.body.otp){
        return res.status(400).json({ message: 'Invalid OTP' });
    }
    if(req.body.newPassword === req.body.confirmPassword) {
        await managerModel.findByIdAndUpdate(manager._id, { password: await bcrypt.hash(req.body.newPassword, 10) }).then(() => {
            res.json({ message: 'Password changed successfully!' });
        });
    }
    else {
        res.status(400).json({ message: 'Passwords do not match!' });
    }
}

// ADD EMPLOYEE
module.exports.addEmployee = async(req, res) => {
    const manager = await managerModel.findById(req.manager.id);

    if (!manager) {
        return res.status(404).json({ message: 'Manager not found!' });
    }

    const employee = await employeeModel.findOne({ email: req.body.email });

    if (employee) {
        return res.status(409).json({ message: 'Employee already exists!' });
    }

    req.body.managerId = manager._id;
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await employeeModel.create(req.body).then(() => {
        res.status(201).json({ message: 'Employee added successfully!' });
    });
};

// VIEW ALL EMPLOYEES
module.exports.viewEmployees = async(req, res) => {
    await employeeModel.find({ managerId: req.manager.id }).then((employees) => {
        res.json({ message: 'Employees fetched successfully!', data: employees });
    });
};