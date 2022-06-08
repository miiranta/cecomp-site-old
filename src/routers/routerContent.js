const express           = require('express')
const logged            = require("../middleware/logged")
const printToConsole    = require("../utils/other/printToConsole")
const path              = require('path')
const fs                = require('fs')

const msgDirectory = path.join(__dirname, "../../templates/messages") 

const router = new express.Router()

router.get("/", (req, res) => {
    res.render("index", {})
});

router.get("/home", logged(0), (req, res) => {
    res.render("home", {})
});

router.get("/about", (req, res) => {
    res.render("about", {})
});

router.get("/contact", (req, res) => {
    res.render("contact", {})
});

router.get("/links", (req, res) => {
    res.render("links", {})
});

router.get("/transparency", logged(3), (req, res) => {
    res.render("transparency", {})
});

router.get("/calendar", (req, res) => {
    res.render("calendar", {})
});

router.get("/polls", logged(3), (req, res) => {
    res.render("polls", {})
});

router.get("/certificates", logged(0), (req, res) => {
    res.render("certificates", {})
});

router.get("/console", logged(10), (req, res) => {
    res.render("console", {})
});

//Msgs
router.get("/msg/:msgCode", async (req, res) => {
    msgPath = msgDirectory + "/" + req.params.msgCode;
    try{
        if (fs.existsSync(msgPath + ".hbs")) {
            return res.render(msgDirectory + "/" + req.params.msgCode, {})
        }
        printToConsole('warning', 'Trying to access non-existing msg: ' + req.params.msgCode)
      }catch(err) {}
});


module.exports = router