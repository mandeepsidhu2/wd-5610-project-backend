const express = require("express");
const {
  isFollowing,
  follow,
  unfollow,
  getFollowers,
  getFollowing,
} = require("../controllers/followController.js");

const router = express.Router();

router.route("/isFollowing/:followerId/:followeeId").get(isFollowing);
router.route("/follow").post(follow);
router.route("/unfollow").post(unfollow);
router.route("/followers/:userId").get(getFollowers);
router.route("/following/:userId").get(getFollowing);

module.exports = router;
