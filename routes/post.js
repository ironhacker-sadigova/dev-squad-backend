const express = require('express');
const postController = require ('../controllers/post');
const { userById } = require ('../controllers/user');
const { signinRequire } = require("../controllers/auth");

const validator = require ('../validators/index');
const router = express.Router(); // to have access to the express Router



router.get('/',postController.getPosts);
router.post('/post',signinRequire, validator.createPostValidator,postController.createPost); // to create a new post user should be signed in

router.param('userID', userById );
 // Making a query to the DB & getting userInfo & appending to the user object
 // Need to create the userInfobyID method in the controller
 // Any route with ':userId,' the app will execute userInfoByID()

module.exports = router;



