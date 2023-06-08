const UserService = require("../services/userService")

//   curl -X GET -H "Content-Type: application/json"  http://localhost:3001/api/user

exports.getAllUsers = async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json({ data: users, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   

  
//   curl -X POST -H "Content-Type: application/json" -d '{"name":"value1", "email":"value2","image_url":"image"}' http://localhost:3001/api/user
  exports.createUser = async (req, res) => {
    try {
      const user = await UserService.createUser(req.body);
      res.json({ data: user, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };