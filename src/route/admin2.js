const express = require("express");

const router = express.Router();

router.route("/member/edit/:id?")
    .all((req, res, next) => {
        res.locals.membersData = {
            name: "aaa",
            id: "A001",
        };
    })
    .get((req, res) => {
        const obj = {
            baseUrl: req.baseUrl,
            url: req.url,
            data: res.locals.membersData,
        };
        res.json(obj);
    })
    .post((req, res) => {
        res.json(res.locals.membersData);
    });

module.exports = router;