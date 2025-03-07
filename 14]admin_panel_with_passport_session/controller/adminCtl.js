const model = require("../model/adminModel");
const fs = require("fs");
const  mailer = require("../middleware/mailer")
module.exports.adminLogin = (req, res)=> {
    res.render("adminLogin");
} 

module.exports.login = async(req, res) => {
    await model.findOne({}).then(admin => {
        if(admin.email == req.body.email && admin.password == req.body.password){
            res.redirect("/dashboard");
        }else{
            res.redirect("/")
        }
    })
}

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports.dashboard = (req, res) => {    
    res.render("dashboard");
};

module.exports.adminForm = (req, res) => {
    res.render("adminForm");
};

module.exports.addAdmin = async (req, res) => {
    req.body.image = req.file.path;
    await model.create(req.body).then(() => {
        res.redirect("/adminTable");
    });
};

module.exports.adminTable = async (req, res) => {
    await model.find({}).then(admin => {
        res.render("adminTable", {admin});
    })
}

module.exports.adminDelete = async(req, res) => {
    const admin = await model.findById(req.params.id);
    fs.unlinkSync(admin.image);

    await model.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/adminTable");
    })
} 

module.exports.adminEdit = async(req, res)=> {
    const admin = await model.findById(req.params.id);

    res.render("adminEdit", {admin});
} 

module.exports.adminUpdate = async(req, res) => {
    const admin = await model.findById(req.body.id);
    let img;

    req.file ? img = req.file.path : img = req.body.image;
    req.file && fs.unlinkSync(admin.image);
    req.body.image = img;

    await model.findByIdAndUpdate(req.body.id, req.body).then(()=> {
        res.redirect("/adminTable");
    } )
}
module.exports.AdminProfile = async (req, res) => {
    res.render("profile", { user: req.user }); 
};
module.exports.changePass = (req, res) => {
    res.render("changePass");
}
module.exports.changePassword = async (req, res) => {
    let admin = req.user;
    if (req.body.oldPass == admin.password) {
        if (req.body.newPass != req.body.oldPass) {
            if (req.body.newPass == req.body.confirmPass) {
                await model.findByIdAndUpdate(admin.id, { password: req.body.newPass }).then(() => {
                    res.redirect("/logout")
                })
            } else {
                res.redirect("/changePass");
            }
        } else {
            res.redirect("/changePass")
        }
    } else {
        res.redirect("/changePass")
    }
}
module.exports.forgetpassword = (req, res) => {
    res.render("forgetPassword");
}
module.exports.forgotpassword = async (req, res) => {
    let admin = await model.findOne({ email: req.body.email });
    if (!admin) {
        return res.redirect("/forgetpassword");
    }
    let otp = Math.floor(Math.random() * 100000 + 900000);
    mailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.adminData = admin;

    res.redirect("/forgototp");
}

module.exports.forgototp = (req, res) => {
    res.render("forgototp");
}

module.exports.resetpassword = async(req, res) => {
    let adminData = req.session.adminData;
    let otp = req.session.otp;
    if (otp == req.body.otp) {
        if (req.body.otp != req.body.newpass) {
            if (req.body.newpass == req.body.confirmpass) {
                await model.findByIdAndUpdate(adminData._id,{
                    password:req.body.confirmpass,
                })
                res.redirect("/")
            }
        } else {
            res.redirect("/forgetpassword")
        }
    } else {
        res.redirect("/forgetpassword")
    }
}
