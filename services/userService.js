const UserModel = require("../dbModels/user")
exports.getAllUsers = async () => {
    return await UserModel.find();
  };
   
  exports.createUser = async (user) => {
    return await UserModel.create(user);
  };

  