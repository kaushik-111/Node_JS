const catSchema = require("../model/categoryModel");
const subCatSchema = require("../model/subCategoryModel");

module.exports.addSubCategory = async (req,res)=>{
    await catSchema.find({}).then((data)=>{
        res.render("subCategoryForm",{data})
    })
}

module.exports.addSubCategoryData = async(req,res)=>{
    console.log(req.body);
    await  subCatSchema.create(req.body).then(()=>{
        res.redirect("/subCategory/subCategoryForm");
    })
}

module.exports.viewSubCategory = async(req,res)=>{
    await subCatSchema.find({}).populate("categoryId").then(subCategory => {
        console.log(subCategory);
        
        res.render("subCategoryTable", { subCategory });
    })
}