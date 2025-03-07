const express = require("express");
const port = 1234;
const app = express();
const db = require("./config/database")
const Schema =require("./model/scema")
app.set("view engine", "ejs");
app.use(express.urlencoded());


app.get("/", async(req, res) => { 
 let data =   await Schema.find({})
    .then((data)=>{
        res.render("index", { data });
    })
})
app.post("/addData", async(req, res) => { 
     let data = await Schema.create(req.body)
     .then((data)=>{
        res.redirect("/");
     })
   })
app.get("/deleteData",async(req,res)=>{
    console.log(req.query.id);
    await Schema.findByIdAndDelete(req.query.id)
    .then(()=>{
        res.redirect("/");
    })
})
app.get("/editData/:id",async(req,res) => {
    let data = await Schema.findById(req.params.id);
    res.render("update",{data});
  })
  
  app.post("/updateData",async(req,res)=>{
     
      await Schema.findByIdAndUpdate(req.body.id,req.body)
      .then(()=>{
          res.redirect("/");
      })
  })

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server Started:-"+port);
})