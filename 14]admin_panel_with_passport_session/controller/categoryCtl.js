const model = require("../model/categoryModel");
const fs = require("fs");

module.exports.categoryForm = (req, res) => {
    res.render("categoryForm");
};

module.exports.addCategoryData= async (req, res) => {
    req.body.categoryImage = req.file.path;
    await model.create(req.body).then(() => {
        res.redirect("/category/categoryTable");
    });
};

module.exports.categoryTable = async (req, res) => {
     await model.find({}).then(category => {
       res.render("categoryTable",{category});
     })
}
module.exports.deleteCategory = async (req, res) => {
    const singleData = await model.findById(req.params.id);
    fs.unlinkSync(singleData.categoryImage);
    await model.findByIdAndDelete(req.params.id).then(() => {
        res.redirect("/category/categoryTable");
    })
}
module.exports.categoryEdit = async(req, res)=> {
    const categoryData = await model.findById(req.params.id);
    res.render("categoryEdit", {categoryData});
}
module.exports.categoryUpdate = async(req, res) => {
    const admin = await model.findById(req.body.id);
    let img;

    req.file ? img = req.file.path : img = req.body.categoryImage;
    req.file && fs.unlinkSync(admin.categoryImage);
    req.body.categoryImage = img;

    await model.findByIdAndUpdate(req.body.id, req.body).then(()=> {
        res.redirect("/category/categoryTable");
    } )
}