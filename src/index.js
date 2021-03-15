require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");
const session = require("express-session");
// const multer = require("multer");

const app = express();
// const upload = multer({ dest: "tmp_upload/" })
const upload = require(__dirname + "/modules/upload.js");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: "64g098t0zl5o90e707ltr+sqartypsd04*ysasf458u00rz1i04w04kzl+6yi874wj59lw6jui",
    cookie: {
        maxAge: 1800000,
    }
}));

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

app.post("/uploads", upload.array("photo", 10), (req, res) => {
    res.json(req.files);
});

app.get("/params/:action?/:id?", (req, res) => {
    res.json(req.params);
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
    const ori_url = req.url;
    let u = req.url.slice(3);
    u = u.split("?")[0];
    u = u.split("-").join("");
    res.json({ ori_url, u });
});

app.get("/session", (req, res) => {
    req.session.myVar = req.session.myVar || 0;
    req.session.myVar++;
    res.json(req.session);
});

app.use("/666", require(__dirname + "/route/admin.js"));
app.use("/777", require(__dirname + "/route/admin2.js"));

app.use(async (req, res) => {
    const error = await fs.readFile(__dirname + "/../public/404.html");
    res.status(404).send(error.toString());
});

app.listen(process.env.PORT || 8787, () => {
    console.log(`server started: ${new Date()}`);
});