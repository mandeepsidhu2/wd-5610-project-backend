const express = require("express");
const {
    getAllUsers,createUser,updateUser
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser).put(updateUser);


module.exports = router;
