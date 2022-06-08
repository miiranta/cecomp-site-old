const express           = require('express');
const logged            = require('../middleware/logged')
const createFormVerify  = require('../utils/forms/createFormVerify');

const router = new express.Router()

router.patch("/form/verify", logged(1), async (req, res) => {
    const codeRes = await createFormVerify(req) 
    res.status(codeRes.status).send()
});

module.exports = router