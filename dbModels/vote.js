const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  type: String,
  userId: String,
  reviewId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
