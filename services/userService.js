const UserModel = require("../dbModels/user")
exports.getAllUsers = async () => {
    return await UserModel.find();
  };
   
  exports.createUser = async (user) => {
    console.log(user)
    const userExists = await UserModel.find({id:user.id})
    if(userExists!=null)return userExists;
    return await UserModel.create(user);
  };

  