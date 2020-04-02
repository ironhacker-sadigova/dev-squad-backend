
const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

const router = express.Router(); // to have access to the express Router

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);


/* When there is userid in the incoming request (url) based on that 
Userid the backend will make a query to the DB and load that 
User info (name, email etc) then will add that info to the req.object
Like req.profile=userInfo*/
// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

 // Making a query to the DB & getting userInfo & appending to the user object
 // Need to create the userInfobyID method in the controller
 // Any route with ':userId,' the app will execute userInfoByID()

module.exports = router;