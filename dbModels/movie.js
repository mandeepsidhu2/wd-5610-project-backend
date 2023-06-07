const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: String,
  title: String,
  year: String,
  poster: String,
  upvote: Number,
  downvote: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
