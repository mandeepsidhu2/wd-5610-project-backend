const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  id: String,
  userId: String,
  movieId: String,
  description: String,
  reviewEndPeriod: Number,
  upvote: Number,
  downvote: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
