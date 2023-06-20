const express = require("express");
const {
  isFollowing,
  follow,
  unfollow,
} = require("../controllers/followController.js");

const router = express.Router();

router.route("/isFollowing/:followerId/:followeeId").get(isFollowing);
router.route("/follow").post(follow);
router.route("/unfollow").post(unfollow);

module.exports = router;
