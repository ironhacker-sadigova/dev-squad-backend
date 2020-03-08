const express = require('express');
const { signup, signin, signout } = require("../controllers/auth")
const { createUserValidator } = require ('../validators/index');
const router = express.Router(); // to have access to the express Router

router.post('/signup',createUserValidator,signup);
router.post('/signin', signin); // no need for a validator method here :)
router.get ('/signout', signout);



module.exports = router;

