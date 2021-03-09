const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    fs.writeFile(__dirname + "/Headers.json",
        JSON.stringify(req.headers),
        (error) => {
            if (error) {
                res.end(`error: ${error}`);
            } else {
                res.end(`ok: ${new Date()}`);
            }
        });
}).listen(7777);
