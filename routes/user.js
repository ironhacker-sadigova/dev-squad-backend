const express = require('express');
const { userById, showAllUsers, getSingleUser } = require ('../controllers/user');
const { signinRequire } = require("../controllers/auth");
const router = express.Router(); // to have access to the express Router



router.get ('/users', showAllUsers);
router.get ('/user/:userId', signinRequire, getSingleUser); // you must be loged in to see the selected user

router.param('userId', userById);

module.exports = router;
