const subCategorySchema = require("../model/subCategoryModel");
const extraCategorySchema = require("../model/extraCategoryModel");
const fs = require("fs");

module.exports.ExtraCategoryForm = async(req, res) => {
    await subCategorySchema.find({}).then((data)=>{
        console.log(data); 
        res.render("extraCategoryForm",{data})
    })
};

module.exports.addExtraCategoryData = async (req, res) => {
    await extraCategorySchema.create(req.body).then(() => {
        res.redirect("/extraCategory/extraCategoryForm");
    });
};

module.exports.ExtraCategoryTable = async (req, res) => {
    await extraCategorySchema.find({}).populate("categoryId").then(extraCategory => {
        res.render("extraCategoryTable",{extraCategory});
    })
}
