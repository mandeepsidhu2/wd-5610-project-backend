const FollowService = require("../services/followService");

exports.isFollowing = async (req, res) => {
  try {
    const followerId = req.params.followerId;
    const followeeId = req.params.followeeId;

    isFollowing = await FollowService.isFollowing(followerId, followeeId);
    res.json({ data: isFollowing, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.follow = async (req, res) => {
  try {
    const followerId = req.body.followerId;
    const followeeId = req.body.followeeId;

    follow = await FollowService.follow(followerId, followeeId);
    res.json({ data: follow, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const followerId = req.body.followerId;
    const followeeId = req.body.followeeId;

    unfollow = await FollowService.unfollow(followerId, followeeId);
    res.json({ data: unfollow, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;

    const followers = await FollowService.getFollowers(userId);
    res.json({ data: followers, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;

    const following = await FollowService.getFollowing(userId);
    res.json({ data: following, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
