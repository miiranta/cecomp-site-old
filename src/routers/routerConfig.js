const express = require('express')

const router = new express.Router()

//Account
router.get("/account", (req, res) => {
    res.render("account", {})
});

module.exports = router