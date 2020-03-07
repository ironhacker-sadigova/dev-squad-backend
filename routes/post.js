const express = require('express');
const postController = require ('../controllers/post');
const validator = require ('../validators/index');
const router = express.Router(); // to have access to the express Router



router.get('/', postController.getPosts);
router.post('/post', validator.createPostValidator,postController.createPost);


module.exports = router;



