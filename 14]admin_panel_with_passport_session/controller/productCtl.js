const productSchema = require("../model/productModel");
const extraCategorySchema = require("../model/extraCategoryModel");

module.exports.productForm = async (req,res)=>{
    await extraCategorySchema.find({}).then((data)=>{
        res.render("productForm",{data}); 
    })
}

module.exports.addProductData = async(req,res)=>{
    req.body.productImage = req.file.path;
    await productSchema.create(req.body).then(()=>{
        res.redirect("/product/productForm");
    })
}

module.exports.productTable = async(req,res)=>{
    await productSchema
    .find({})
    .populate({
        path:"extraCategoryTd",
        populate:{
            path:"categoryId",
            populate:{
                path:"categoryId"
            }
        }
    })
    .then((data)=>{
        console.log(data);
        
        res.render("productTable",{data})
    })}