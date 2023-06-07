const jwt = require("jsonwebtoken");
const reviewSchema = require("../dbModels/review")
// const mongoClient = require("../database/mongo")
require('dotenv').config()
const mongoose = require("mongoose");

exports.postReview = async (payload) => {
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