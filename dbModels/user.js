const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  name: String,
  image_url: String,
  email: String,
  type: String,
  bio: String,
  phone: String,
  spoilers: Number,
  followers: Number,
  following: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
