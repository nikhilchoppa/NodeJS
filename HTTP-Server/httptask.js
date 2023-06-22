const http = require("http");

const fs = require("fs");

const server = http.createServer((req, res) =>{
    fs.readFile("index.html", (err, data) =>{
        res.writeHead(200, {"content-type" : "text/html"});
        res.write(data);
        res.end();  
    })

})

server.listen(5000, ()=> console.log("The server is up at 5000"));