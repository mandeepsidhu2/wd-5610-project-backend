const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema(
  {
    followerId: String,
    followeeId: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "follows" }
);

module.exports = mongoose.model("Follow", followSchema);
