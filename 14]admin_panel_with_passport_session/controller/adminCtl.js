const { closeDelimiter } = require("ejs");
const model = require("../model/adminModel");
const fs = require("fs");

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
