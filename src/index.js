require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home", { name: "yoooooooooo" });
});

app.use(async (req, res) => {
    const error = await fs.readFile(__dirname + "/../public/404.html");
    res.status(404).send(error.toString());
});

app.listen(process.env.PORT || 8787, () => {
    console.log(`server started: ${new Date()}`);
});