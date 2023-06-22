const FollowModel = require("../dbModels/follow");
const UserModel = require("../dbModels/user");

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
  if (!followerExists) {
    const followee = await UserModel.findOne({ id: followeeId });
    await UserModel.updateOne(
      { id: followeeId },
      { followers: followee.followers + 1 }
    );
    return FollowModel.create({
      followerId: followerId,
      followeeId: followeeId,
    });
  }
  return { follow: "Success" };
};

exports.unfollow = async (followerId, followeeId) => {
  let { followerExists } = await this.isFollowing(followerId, followeeId);
  if (followerExists === undefined) {
    const followee = await UserModel.findOne({ id: followeeId });
    await UserModel.updateOne(
      { id: followeeId },
      { followers: followee.followers - 1 }
    );
    return FollowModel.deleteOne({
      followerId: followerId,
      followeeId: followeeId,
    });
  }
  return { unfollow: "Success" };
};
