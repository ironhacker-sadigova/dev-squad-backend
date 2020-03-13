const express = require('express');
const { userById, showAllUsers } = require ('../controllers/user');
const router = express.Router(); // to have access to the express Router



router.get ('/users', showAllUsers);

router.param('userId', userById);

module.exports = router;
