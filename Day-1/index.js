const http = require("http"); // http => Hypertext Transfer Protocol
const port = 1018;

const portHandler = (req,res) =>{
    res.write("<h1>Server Started</h1>");
    res.end();
}
const server = http.createServer(portHandler);

server.listen(port,(err)=>{
    err ? console.log(err) : console.log("server side on port:" +port);
})