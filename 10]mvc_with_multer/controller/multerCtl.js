const schema = require('../model/schema')
const fs = require("fs");

module.exports.firstPage = async (req, res) => {
  await schema.find({}).then((data) => {
    res.render('index', { data })
  })
}
module.exports.addData = async (req, res) => {
  req.body.image = req.file.path;
  await schema.create(req.body).then(() => {
    res.redirect('/');
  })
};

module.exports.deleteData = async (req, res) => {
  let singleData = await schema.findById(req.query.id);
  console.log(singleData);
  
  fs.unlinkSync(singleData.image)
  await schema.findByIdAndDelete(req.query.id).then(() => {
    res.redirect('/')
  })}
module.exports.editData = async (req,res) =>{
  await schema.findById(req.params.id).then(data => {
    res.render("update", {data});
});
}
module.exports.updateData = async (req,res) =>{
  let singleData = await schema.findById(req.body.id);
  let img ;
  req.file ? img = req.file.path:img = singleData.image;
  req.file && fs.unlinkSync(singleData.image)
  req.body.image = img;

  await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
    res.redirect("/");
});
}
