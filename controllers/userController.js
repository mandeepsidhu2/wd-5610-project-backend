const UserService = require("../services/userService");
const { authenticate } = require("./authMiddleware");

//   curl -X GET -H "Content-Type: application/json"  http://localhost:3001/api/user

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.pid;
    user = await UserService.getUser(userId);
    res.json({ data: user, status: "success" });
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

exports.updateUser = async (req, res) => {
  try {
    let userId = req.body.id;
    if (!userId) {
      userId = authenticate(req.headers.token);
    }
    user = await UserService.updateUser(userId, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
