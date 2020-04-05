


const express = require("express");
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollower,
    removeFollowing
   
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.put('/user/follow', requireSignin, addFollower, addFollowing);// WE NEED TO HANDLE THE FOLLOW AND UNFOLLOW 
// TWO TYPES OF USERS NEED TO HANDLE
// FOLLOWING LIST AND UNFOLLOWING LIST
// TWO LIST TO MAINTAIN
router.put('user/unfollow',requireSignin, removeFollowing, removeFollower)

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser); // you must be loged in to see the selected user
router.put("/user/:userId", requireSignin,  updateUser); // put is to make changes & update :))
router.delete("/user/:userId", requireSignin, deleteUser);

// for the photo

router.get("/user/photo/:userId", userPhoto)
;
// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
