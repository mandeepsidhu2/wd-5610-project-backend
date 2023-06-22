const jwt = require("jsonwebtoken");
const reviewSchema = require("../dbModels/review")
const movieService = require("../services/movieService")
const voteSchema = require("../dbModels/vote")
// add movie object to this
const aggregate_pipleine= [
  {
    $lookup: {
      from: 'movies',
      localField: 'movieId',
      foreignField: 'id',
      as: 'movie'
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: 'id',
      as: 'user'
    }
  },
  {
    $lookup: {
      from: 'votes',
      localField: 'id',
      foreignField: 'reviewId',
      as: 'votes'
    }
  },
  {
    $project: {
      description: 1,
      reviewEndPeriod:1,
      user: 1,
      userId: 1,
      id: 1,
      movie:1,
      movieId:1,
      upvotes: {
        $filter: {
          input: '$votes',
          as: 'vote',
          cond: {
            $eq: ['$$vote.type', 'upvote']
          }
        }
      },
      downvotes: {
        $filter: {
          input: '$votes',
          as: 'vote',
          cond: {
            $eq: ['$$vote.type', 'downvote']
          }
        }
      },
      totalUpvotes: {
        $size: {
          $filter: {
            input: '$votes',
            as: 'vote',
            cond: {
              $eq: ['$$vote.type', 'upvote']
            }
          }
        }
      },
      totalDownvotes: {
        $size: {
          $filter: {
            input: '$votes',
            as: 'vote',
            cond: {
              $eq: ['$$vote.type', 'downvote']
            }
          }
        }
      },
      
    }
  },  {
    $addFields: {
      voteDifference: { $subtract: ['$totalUpvotes', '$totalDownvotes'] }
    }
  },
  {
    $sort: {
      voteDifference: -1
    }
  }
]
// const mongoClient = require("../database/mongo")
require('dotenv').config()
const mongoose = require("mongoose");

exports.postReview = async (payload) => {
    await movieService.createMovieIfNotExists(payload.movie)
    if(isNaN(payload.reviewEndPeriod))// place max movie length so it is always filtered
      payload.reviewEndPeriod=1000
    await reviewSchema.create({...payload,id:Date.now(),movieId:payload.movie.imdbID})
};
exports.getAllReviews = async (pageNo,limit,reviewEndPeriod=1000) =>{
  if(!isNaN(reviewEndPeriod))reviewEndPeriod=parseInt(reviewEndPeriod)
  pageNo=parseInt(pageNo)
  limit=parseInt(limit)

  return await reviewSchema.aggregate(
    [...aggregate_pipleine,
      {
        $match: {
          reviewEndPeriod: { $lte: reviewEndPeriod }
        }
      },
      {$skip: (pageNo-1)*limit },
    {$limit: limit } ,
    { $sort: { createdAt: -1 } }
  ])
}


exports.getAllReviewsForMovie = async (pageNo=1,limit=10000,movieId) =>{
  pageNo=parseInt(pageNo)
  limit=parseInt(limit)
  console.log(movieId)
  console.log("inside all reviews")

  return await reviewSchema.aggregate(
    [...aggregate_pipleine,
      {
        $match: {
          movieId: movieId
          
        }
      },
      {$skip: (pageNo-1)*limit },
    {$limit: limit } ,
    { $sort: { createdAt: -1 } }
  ])
}

exports.getAllReviewsForMoviePeriod = async (pageNo=1,limit=10000,movieId,reviewEndPeriod=1000) =>{
  pageNo=parseInt(pageNo)
  limit=parseInt(limit)
  if(!isNaN(reviewEndPeriod))reviewEndPeriod=parseInt(reviewEndPeriod)
  console.log(movieId)
  console.log(reviewEndPeriod)

  return await reviewSchema.aggregate(
    [...aggregate_pipleine,
      {
        $match: {
          movieId: movieId,
          reviewEndPeriod: { $lte: reviewEndPeriod }
        }
      },
      {$skip: (pageNo-1)*limit },
    {$limit: limit } ,
    { $sort: { createdAt: -1 } }
  ])
}

exports.getAllReviewsForUser = async(userId,reviewEndPeriod=1000) =>{
  if(!isNaN(reviewEndPeriod))reviewEndPeriod=parseInt(reviewEndPeriod)
  const users= await reviewSchema.aggregate(
    [
      {
        $match: {
          reviewEndPeriod: { $lte: reviewEndPeriod }
        }
      },
      {
        '$match': {
          'userId': userId
        }
      },...aggregate_pipleine
    ]
  );
  return users;
  }

  exports.vote = async(userId,payload) =>{
    const filter = {userId:userId,reviewId:payload.review_id}
    await voteSchema.deleteMany(filter)
    const data = {type:payload.voteType,userId,reviewId:payload.review_id}
    return voteSchema.create(data)
  }

  exports.unvote = async(userId,payload) =>{
    const filter = {userId:userId,reviewId:payload.reviewId}
    console.log(filter)
    return voteSchema.deleteMany(filter)
  }

  exports.deleteReview = async(reviewId) =>{
    const filter = {id:reviewId}
    return reviewSchema.deleteMany(filter)
  }

  exports.updateReview = async(reviewId,payload) =>{
    const filter = {id:reviewId}

    return reviewSchema.updateMany(filter,{description:payload.description})
  }