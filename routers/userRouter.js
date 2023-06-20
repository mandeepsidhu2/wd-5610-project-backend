const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser).put(updateUser);
router.route("/:pid").get(getUser);

module.exports = router;
