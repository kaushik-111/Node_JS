const schema = require('../model/Firstschema')

module.exports.firstPage = async (req, res) => {
  await schema.find({}).then((data) => {
    res.render('index', { data })
  })
}
module.exports.addData = async (req, res) => {
  await schema.create(req.body).then(() => {
    res.redirect('/')
  })
}
module.exports.deleteData = async (req, res) => {
  await schema.findByIdAndDelete(req.query.id).then(() => {
    res.redirect('/')
  })}
module.exports.editData = async (req,res) =>{
  await schema.findById(req.params.id).then(data => {
    res.render("edit", {data});
});
}
module.exports.updateData = async (req,res) =>{
  await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
    res.redirect("/");
});
}
