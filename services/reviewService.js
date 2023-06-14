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
      user: 1,
      userId: 1,
      id: 1,
      movie:1,
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
      }
    }
  }
]
// const mongoClient = require("../database/mongo")
require('dotenv').config()
const mongoose = require("mongoose");

exports.postReview = async (payload) => {
    await movieService.createMovieIfNotExists(payload.movie)
    await reviewSchema.create({...payload,id:Date.now(),movieId:payload.movie.imdbID})
};
exports.getAllReviews = async (pageNo,limit) =>{
  console.log(typeof(pageNo)+ " "+limit+" ")
  pageNo=parseInt(pageNo)
  limit=parseInt(limit)

  return await reviewSchema.aggregate(
    [...aggregate_pipleine,
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
    const filter = {userId:userId,reviewId:payload.review_id}
    return voteSchema.deleteMany(filter)
  }