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