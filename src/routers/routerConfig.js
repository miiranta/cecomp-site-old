const express       = require('express')
const logged        = require("../middleware/logged")
const notLogged     = require("../middleware/notLogged")

const router = new express.Router()

//Account
router.get("/account", logged(0), (req, res) => {
    res.render("account", {})
});

module.exports = router