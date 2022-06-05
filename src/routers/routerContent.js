const express       = require('express')
const logged        = require("../middleware/logged")
const notLogged     = require("../middleware/notLogged")
const path          = require('path')

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

router.get("/transparency", logged(2), (req, res) => {
    res.render("transparency", {})
});

router.get("/calendar", (req, res) => {
    res.render("calendar", {})
});

router.get("/polls", logged(2), (req, res) => {
    res.render("polls", {})
});

router.get("/certificates", logged(0), (req, res) => {
    res.render("certificates", {})
});

router.get("/console", logged(10), (req, res) => {
    res.render("console", {})
});

//Msgs
router.get("/msg/notBccMember", async (req, res) => {
    res.sendFile(msgDirectory + "/notBccMember.html")
});


module.exports = router