const adminModel = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../middlewares/mailer');
const managerModel = require('../models/managerModel');
const employeeModel = require('../models/employeeModel');


// REGISTER THE ADMIN
module.exports.adminRegister = async(req, res) => {
    const admin = await adminModel.findOne({ email: req.body.email });
    req.body.password = await bcrypt.hash(req.body.password, 10);

    if (admin) {
        return res.status(409).json({ message: 'Admin already exists!' });
    }

    await adminModel.create(req.body).then(() => {
        res.status(201).json({ message: 'Admin registered successfully!' });
    })
};


// LOGIN THE ADMIN

module.exports.adminLogin = async(req, res) => {
    const admin = await adminModel.findOne({ email: req.body.email });

    if (!admin) {
        return res.status(404).json({ message: 'Admin not found!' });
    }
    else{
        const match = await bcrypt.compare(req.body.password, admin.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }
        else{
            const token = jwt.sign({ id: admin._id }, 'admin', { expiresIn: '1h' });
            res.json({ message: 'Admin logged in successfully!', token: token });
        }
    }
};

// VIEW THE ADMIN DATA

module.exports.viewAdmin = async(req, res) => {
    await adminModel.findById(req.admin.id).then((admin) => {
        res.json({ message: 'Admin data fetched successfully!', data: admin });
    })
};


// CHANGE THE ADMIN'S PASSWORD

module.exports.changePassword = async(req, res) => {
    const admin = await adminModel.findOne({ _id: req.admin.id });

    const isMatch = await bcrypt.compare(req.body.oldPassword, admin.password);
    if(isMatch){
        if(req.body.newPassword == req.body.confirmPassword){
            await adminModel.findByIdAndUpdate(req.admin.id, { password: await bcrypt.hash(req.body.newPassword, 10) }).then(() => {
                res.json({ message: 'Password changed successfully!' });
            });
        }else{
            res.status(400).json({ message: 'Passwords do not match!' });
        }
    }else{
        res.status(401).json({ message: 'Invalid old password!' });
    }
};


// SEND OTP FOR FORGOT PASSWORD
module.exports.sendOTP = async(req, res) => {
    let admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found!' });
    }
    let otp = Math.floor(Math.random() * 1000000);

    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.admin = admin;

    res.status(200).json({ message: 'OTP sent successfully!' });
};


// RESET THE ADMIN'S PASSWORD
module.exports.forgotPassword = async(req, res) => {

    const otp = req.session.otp;
    const admin = req.session.admin;

    console.log(otp, admin);
    if(otp != req.body.otp){
        return res.status(401).json({ message: 'Invalid OTP!' });
    }
    if(req.body.newPassword != req.body.confirmPassword){
        return res.status(400).json({ message: 'Passwords do not match!' });
    }

    await adminModel.findByIdAndUpdate(admin._id, { password: await bcrypt.hash(req.body.newPassword, 10) }).then(() => {
        res.json({ message: 'Password changed successfully!' });
    });
};

// ADD THE MANAGER 
module.exports.addManager = async(req, res) => {

    // WHICH IS BETTER SESSION OR MIDDLEWARE?
    const admin = await adminModel.findById(req.admin.id); 
    const isManager = await managerModel.findOne({email: req.body.email});
    if(isManager){
        return res.status(409).json({ message: 'Manager already exists!' });
    }
    
    req.body.adminId = admin._id;
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await managerModel.create(req.body).then(() => {
        res.status(201).json({ message: 'Manager added successfully!' });
    });
};

// ALL MANAGER DATA
module.exports.viewManagers = async(req, res) => {
    await managerModel.find({adminId: req.admin.id}).then((manager) => {
        res.json({ message: 'Managers data fetched successfully!', data: manager });
    });
};

// DELETE MANAGER
module.exports.deleteManager = async(req, res) => {
    await managerModel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: 'Manager deleted successfully!' });
    });
};

// VIEW ALL EMPLOYEES
module.exports.viewEmployees = async (req, res) => {

    const managers = await managerModel.find({ adminId: req.admin.id });

    const employees = await Promise.all(managers.map(async (manager) => {
        return await employeeModel.find({ managerId: manager._id });
    }));

    res.json({ message: 'Employees fetched successfully!', data: employees.flat() });
};

// DELETE EMPLOYEE
module.exports.deleteEmployee = async (req, res) => {
    await employeeModel.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: 'Employee deleted successfully!' });
    });
};
