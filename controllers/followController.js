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
