const ReviewService = require("../services/reviewService")
const {authenticate} = require("./authMiddleware")

// Sample payload
    // {
  //   "userId": 434,
  //   "description": "cfebjkfcj",
  //   "movie": {
  //     "Title": "Fukrey",
  //     "Year": "2013",
  //     "imdbID": "tt2806788",
  //     "Type": "movie",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BODI5MzQ2NDg0MV5BMl5BanBnXkFtZTcwNTEwMzI1OQ@@._V1_SX300.jpg"
  //   }
  // }
//  curl -X POST -H "Content-Type: application/json" -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY1MTU3MjIsImV4cCI6MTY4Njg2MTMyMn0.jYwYDUL_miN3MvlU-T01wZvCSaJFOGtOr1SgQp2uMmw" -d '{"userId":434,"description":"cfebjkfcj","movie":{"Title":"Fukrey","Year":"2013","imdbID":"tt2806788","Type":"movie","Poster":"https:\/\/m.media-amazon.com\/images\/M\/MV5BODI5MzQ2NDg0MV5BMl5BanBnXkFtZTcwNTEwMzI1OQ@@._V1_SX300.jpg"}}' http://localhost:3001/api/review
exports.postReview = async (req, res) => {
    try {
      const user=  authenticate(req.headers.token)
      console.log(user)
      await ReviewService.postReview({...req.body,userId:user.user_id})
      res.json({ data: "pong", status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


//  curl -X GET -H "Content-Type: application/json" -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY1MTU3MjIsImV4cCI6MTY4Njg2MTMyMn0.jYwYDUL_miN3MvlU-T01wZvCSaJFOGtOr1SgQp2uMmw"  http://localhost:3001/api/review/getAllReviewsForUser

  exports.getAllReviewsForUser = async (req, res) => {
    try {
      const user=authenticate(req.headers.token)
      console.log(user)
      const result=await ReviewService.getAllReviewsForUser(user.user_id)
      res.json({ data: result, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//  curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/getAllReviews

  // all reviews sorted in desc order of time
 
  exports.getAllReviews = async (req, res) => {
    try {
      console.log(req.query["limit"])
      const result=await ReviewService.getAllReviews(req.query["pageNo"],req.query["limit"])
      res.json({ data: result, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // vote reviews
// upvote
// curl -X POST -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5NzU1MDcwMTQzMjg0MjI2MzU5IiwiZW1haWwiOiJtYW5kZWVwLnNpZGh1MDcyMkBnbWFpbC5jb20iLCJuYW1lIjoiTWFuZGVlcCBTaWRodSIsImlhdCI6MTY4NjUxODAxNiwiZXhwIjoxNjg2ODYzNjE2fQ.emtw8dwg1wGq37pKT-4xqKys-4afqSLrqBVFUaJTnCY' -H "Content-type: application/json" -d '{"review_id":"1686516420866", "voteType":"upvote"}' 'http://localhost:3001/api/review/vote'
// downvote
//curl -X POST -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY1MTU3MjIsImV4cCI6MTY4Njg2MTMyMn0.jYwYDUL_miN3MvlU-T01wZvCSaJFOGtOr1SgQp2uMmw' -H "Content-type: application/json" -d '{"review_id":"1686516420866", "voteType":"downvote"}' 'http://localhost:3001/api/review/vote'
  exports.vote = async (req, res) => {
    try {
      const user=  authenticate(req.headers.token)
      console.log(user)
      const result=await ReviewService.vote(user.user_id,req.body)
      res.json({ data: result, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };



