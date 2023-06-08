const jwt = require("jsonwebtoken");
const reviewSchema = require("../dbModels/review")
const movieService = require("../services/movieService")
// const mongoClient = require("../database/mongo")
require('dotenv').config()
const mongoose = require("mongoose");

exports.postReview = async (payload) => {
    await movieService.createMovieIfNotExists(payload.movie)
    await reviewSchema.create(payload)
};
exports.getAllReviews = async (pageNo,limit) =>{
  console.log(typeof(pageNo)+ " "+limit+" ")
  pageNo=parseInt(pageNo)
  limit=parseInt(limit)
  return await reviewSchema.aggregate(
    [
      {$skip: (pageNo-1)*limit },
    {$limit: limit } ,
    { $sort: { createdAt: -1 } }
  ])
}
exports.getAllReviewsForUser = async(userId) =>{
  const users= await reviewSchema.aggregate(
    [
      {
        '$match': {
          'userId': userId
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'userId', 
          'foreignField': 'id', 
          'as': 'user'
        }
      }
    ]
  );
  return users;
  }