const express = require('express');
const {getPosts, createPost, allpostsByUser, postById,isPostOwner, deletePost} = require ('../controllers/post');
const { userById } = require ('../controllers/user');
const { signinRequire } = require("../controllers/auth");

const validator = require ('../validators/index');
const router = express.Router(); // to have access to the express Router



router.get('/',getPosts);
router.post('/post/new/:userID',signinRequire,createPost, validator.createPostValidator); // to create a new post user should be signed in
router.get('/posts/by/user:Id',signinRequire, allpostsByUser);
router.delete('/post/:postId', signinRequire, isPostOwner, deletePost);

router.param('userId', userById );
 // Making a query to the DB & getting userInfo & appending to the user object
 // Need to create the userInfobyID method in the controller
 // Any route with ':userId,' the app will execute userInfoByID()


 router.param('postId', postById );


module.exports = router;



