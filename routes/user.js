const express = require('express');
const { userById, showAllUsers, getSingleUser, updateUser, deleteUser } = require ('../controllers/user');
const { signinRequire } = require("../controllers/auth");


const router = express.Router(); // to have access to the express Router



router.get ('/users', showAllUsers);
router.get ('/user/:userId', signinRequire, getSingleUser); // you must be loged in to see the selected user
router.put ('/user/:userId', signinRequire, updateUser); // put is to make changes & update :))
router.delete('/user/:userId', signinRequire, deleteUser); // put is to make changes & update :))


router.param('userId', userById);

module.exports = router;
