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
    const follower = await UserModel.findOne({ id: followerId });
    await UserModel.updateOne(
      { id: followeeId },
      { followers: followee.followers + 1 }
    );
    await UserModel.updateOne(
      { id: followerId },
      { following: follower.following + 1 }
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
    const follower = await UserModel.findOne({ id: followerId });
    await UserModel.updateOne(
      { id: followeeId },
      { followers: followee.followers - 1 }
    );
    await UserModel.updateOne(
      { id: followerId },
      { following: follower.following - 1 }
    );
    return FollowModel.deleteOne({
      followerId: followerId,
      followeeId: followeeId,
    });
  }
  return { unfollow: "Success" };
};

exports.getFollowers = async (userId) => {
  return await FollowModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "followerId",
        foreignField: "id",
        as: "user",
      },
    },
    {
      $match: {
        followeeId: userId,
      },
    },
  ]);
};

exports.getFollowing = async (userId) => {
  return await FollowModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "followeeId",
        foreignField: "id",
        as: "user",
      },
    },
    {
      $match: {
        followerId: userId,
      },
    },
  ]);
};
