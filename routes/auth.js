const express = require('express');
const { signup, signin, signout } = require("../controllers/auth");
const { createUserValidator } = require ('../validators/index');
const { userById } = require ('../controllers/user');
const router = express.Router(); // to have access to the express Router

router.post('/signup',createUserValidator,signup);
router.post('/signin', signin); // no need for a validator method here :)
router.get ('/signout', signout);


/* When there is userid in the incoming request (url) based on that 
Userid the backend will make a query to the DB and load that 
User info (name, email etc) then will add that info to the req.object
Like req.profile=userInfo*/
router.param('userID', userById );
 // Making a query to the DB & getting userInfo & appending to the user object
 // Need to create the userInfobyID method in the controller
 // Any route with ':userId,' the app will execute userInfoByID()



module.exports = router;

