const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.end(`<h2>${req.url}</h2>`);
}).listen(7777);
