const express = require('express')

const router = new express.Router()

router.get("/", (req, res) => {
    res.render("index", {})
});

router.get("/home", (req, res) => {
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

router.get("/transparency", (req, res) => {
    res.render("transparency", {})
});

router.get("/calendar", (req, res) => {
    res.render("calendar", {})
});

router.get("/polls", (req, res) => {
    res.render("polls", {})
});

router.get("/certificates", (req, res) => {
    res.render("certificates", {})
});

router.get("/console", (req, res) => {
    res.render("console", {})
});




module.exports = router