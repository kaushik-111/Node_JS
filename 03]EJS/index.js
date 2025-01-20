const express = require("express");
const port = 4422;

const app = express();

app.set("view engine", "ejs"); // default'=
app.use(express.urlencoded());

let students = [
    {
        id: 1, name: "kaushik", city: "rajkot"
    },
    {
        id: 2, name: "raj", city: "rajkot"
    },
    {
        id: 3, name: "jaydip", city: "rajkot"
    },
]

app.get("/", (req, res) => { //1
    res.render("index", { students });
})

app.post("/addData",(req,res) =>{
    req.body.id = students.length + 1;
    students.push(req.body)
    res.redirect("/")
})
app.get("/deleteData",(req,res)=>{
    console.log(req.query);
    let studentData = students.filter((item) => item.id != req.query.id);
     students = studentData;
     res.redirect("/");
})


app.get("/editData/:id",(req,res) => {
    let data = students.find((item)=>item.id == req.params.id);
    res.render("update",{data});
})

app.post("/updateData",(req,res)=>{
    students.forEach((item)=>{
        if (item.id == req.body.id) {
            item.name = req.body.name
            item.city = req.body.city
        } else {
            item
        }
    })
    res.redirect("/");
})
app.listen(port, (err) => { 
    err ? console.log(err) : console.log("server started on:-" + port);
})