const express = require('express');
const { signup } = require("../controllers/auth")
const { createUserValidator } = require ('../validators/index');
const router = express.Router(); // to have access to the express Router

router.post('/signup',createUserValidator,signup);



module.exports = router;

