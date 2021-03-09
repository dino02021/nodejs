const http = require("http");
const fs = require("fs/promises");

http.createServer(async (req, res) => {
    const str = await fs.readFile(__dirname + "/Headers.json");
    res.end(str);
}).listen(7777);
