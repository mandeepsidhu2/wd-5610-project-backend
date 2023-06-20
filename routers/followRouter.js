const express = require("express");
const { isFollowing, follow } = require("../controllers/followController.js");

const router = express.Router();

router.route("/isFollowing/:followerId/:followeeId").get(isFollowing);
router.route("/follow").post(follow);

module.exports = router;
