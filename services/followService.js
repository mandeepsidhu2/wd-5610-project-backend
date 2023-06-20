const FollowModel = require("../dbModels/follow");

exports.isFollowing = async (followerId, followeeId) => {
  let followerExists = await FollowModel.findOne({
    followerId: followerId,
    followeeId: followeeId,
  });
  if (!followerExists) followerExists = false;
  else followerExists = true;
  return { isFollowing: followerExists };
};

exports.follow = async (followerId, followeeId) => {
  let { followerExists } = await this.isFollowing(followerId, followeeId);
  if (!followerExists)
    return FollowModel.create({
      followerId: followerId,
      followeeId: followeeId,
    });
  return { follow: "Success" };
};

exports.unfollow = async (followerId, followeeId) => {
  let { followerExists } = await this.isFollowing(followerId, followeeId);
  if (followerExists === undefined)
    return FollowModel.deleteOne({
      followerId: followerId,
      followeeId: followeeId,
    });
  return { unfollow: "Success" };
};
