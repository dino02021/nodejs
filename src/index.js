require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");
const multer = require("multer");

const app = express();
// const upload = multer({ dest: "tmp_upload/" })
const upload = require(__dirname + "/modules/upload.js");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home", { name: "yoooooooooo" });
});

app.get("/sales", (req, res) => {
    const data = require(__dirname + "/../data/sales.json");

    res.render("sales", { data });
});

app.get("/qs", (req, res) => {
    res.json(req.query);
});

app.post("/post", (req, res) => {
    res.json(req.body);
});

app.get("/form", (req, res) => {
    res.render("form");
});

app.post("/form", (req, res) => {
    req.body.method = "post";
    req.body.comefrom = "/form";
    res.json(req.body);
});

app.put("/form", (req, res) => {
    req.body.method = "put";
    req.body.comefrom = "/form";
    res.json(req.body);
});

app.delete("/form", (req, res) => {
    req.body.method = "delete";
    req.body.comefrom = "/form";
    res.json(req.body);
});

app.post("/upload", upload.single("avatar"), (req, res) => {
    req.file.formBody = req.body;
    res.json(req.file);
});

app.use(async (req, res) => {
    const error = await fs.readFile(__dirname + "/../public/404.html");
    res.status(404).send(error.toString());
});

app.listen(process.env.PORT || 8787, () => {
    console.log(`server started: ${new Date()}`);
});