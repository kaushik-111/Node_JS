const schema = require("../model/image");
const fs = require("fs");

module.exports.readData = async(req, res) => {
    await schema.find({}).then(carouselItems => {
        res.render("index", {carouselItems});
    });
}

module.exports.addData = async (req, res) => {
    res.render("addData");
}

module.exports.createData = async (req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body).then(() => {
        res.redirect("/");
    })
}

module.exports.deleteData = async (req, res) => {
    const singleData = await schema.findById(req.params.id);
    fs.unlinkSync(singleData.image);
    await schema.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/");
    });
}

module.exports.editData = async (req, res) => {
    await schema.findById(req.params.id).then(event => {
        res.render("updateData", {event});
    })
}

module.exports.updateData = async (req, res) => {
    
    const singleData = await schema.findById(req.body.id);
    let img;
    
    req.file ? img = req.file.path : img = req.body.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;

    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/");
    });
}