


const express = require("express");
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser); // you must be loged in to see the selected user
router.put("/user/:userId", requireSignin, updateUser); // put is to make changes & update :))
router.delete("/user/:userId", requireSignin, deleteUser);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
