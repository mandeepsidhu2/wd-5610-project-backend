const UserModel = require("../dbModels/user");
exports.getAllUsers = async () => {
  return await UserModel.find();
};

exports.createUser = async (user) => {
  let userExists = await UserModel.findOne({ id: user.id });
  let newUser = true;
  if (userExists != null) newUser = false;
  else userExists = await UserModel.create(user);
  console.log({ ...userExists, newUser });
  return { ...userExists._doc, newUser };
};

exports.getUser = async (userId) => {
  return await UserModel.findOne({ id: userId });
};

exports.updateUser = async (user, payload) => {
  //console.log(payload);
  return UserModel.updateOne({ id: user.user_id }, payload);
};

exports.updateSpoilerCount = async (userId, type) => {
  if(type==="add")
    return UserModel.updateOne({ id: userId }, { $inc: { spoilers: 1 } });
  else if(type==="remove"){
    return UserModel.updateOne({ id: userId }, { $inc: { spoilers: -1 } });
  }
};