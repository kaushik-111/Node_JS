const employeeModel = require('../models/employeeModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../middlewares/mailer');
const managerModel = require('../models/managerModel');


// LOGIN THE EMPLOYEE   
module.exports.employeeLogin = async(req, res) => {
    const employee = await employeeModel.findOne({ email: req.body.email });

    if (!employee || !(await bcrypt.compare(req.body.password, employee.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: employee._id }, 'employee', { expiresIn: '24h' });

    res.json({ message: "Employee logged in successfully!", token: token });
};

// VIEW EMPLOYEE DATA
module.exports.viewEmployee = async(req, res) => {
    await employeeModel.findById(req.employee.id).then((employee) => {
        res.json({ message: 'Employee data fetched successfully!', data: employee });
    });
};

// CHANGE EMPLOYEE'S PASSWORD
module.exports.changePassword = async(req, res) => {
    const employee = await employeeModel.findById(req.employee.id);

    if (!(await bcrypt.compare(req.body.oldPassword, employee.password))) {
        return res.status(400).json({ message: 'Invalid old password' });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    await employeeModel.findByIdAndUpdate(req.employee.id, { password: await bcrypt.hash(req.body.newPassword, 10) }).then(() => {
        res.json({ message: 'Password changed successfully!' });
    });
};

// SEND OTP
module.exports.sendOtp = async(req, res) => {
    const employee = await employeeModel.findOne({ email: req.body.email });

    let otp = Math.floor(Math.random() * 1000000);
    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.employee = employee;

    res.status(200).json({ message: 'OTP sent successfully!' });
};

// RESET THE EMPLOYEE'S PASSWORD
module.exports.forgotPassword = async(req, res) => {
    const otp = req.session.otp;
    const employee = req.session.employee;

    if (otp != req.body.otp) {
        return res.status(401).json({ message: 'Invalid OTP' });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    await employeeModel.findByIdAndUpdate(employee._id, { password: await bcrypt.hash(req.body.newPassword, 10) }).then(() => {
        res.json({ message: 'Password changed successfully!' });
    });
};