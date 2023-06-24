const ReviewService = require("../services/reviewService");
const { authenticate } = require("./authMiddleware");

// Sample payload
// {
//   "userId": 434,
//   "description": "cfebjkfcj",
//    "reviewEndPeriod":15, // 30 or 45 or 60 mins
//   "movie": {
//     "Title": "Fukrey",
//     "Year": "2013",
//     "imdbID": "tt2806788",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BODI5MzQ2NDg0MV5BMl5BanBnXkFtZTcwNTEwMzI1OQ@@._V1_SX300.jpg"
//   }
// }
//  curl -X POST -H "Content-Type: application/json" -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY3MDQ3OTEsImV4cCI6MTY4NzA1MDM5MX0.CirlPhZ_S4otIaBy27J5dx1IWzhUS24Fuk8fyLM4Z5M" -d '{"userId":"109011835276418143354","description":"cfebjkfcj","reviewEndPeriod":15,"movie":{"Title":"Fukrey","Year":"2013","imdbID":"tt2806788","Type":"movie","Poster":"https:\/\/m.media-amazon.com\/images\/M\/MV5BODI5MzQ2NDg0MV5BMl5BanBnXkFtZTcwNTEwMzI1OQ@@._V1_SX300.jpg"}}' http://localhost:3001/api/review
exports.postReview = async (req, res) => {
  try {
    const user = authenticate(req.headers.token);
    await ReviewService.postReview({ ...req.body, userId: user.user_id });
    res.json({ data: "pong", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  curl -X GET -H "Content-Type: application/json" -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY1MTU3MjIsImV4cCI6MTY4Njg2MTMyMn0.jYwYDUL_miN3MvlU-T01wZvCSaJFOGtOr1SgQp2uMmw"  http://localhost:3001/api/review/getAllReviewsForUser?reviewEndPeriod=15

exports.getAllReviewsForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await ReviewService.getAllReviewsForUser(userId);
    res.json({ ...result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/review/getAllReviews\?pageNo\=1\&limit\=5\&reviewEndPeriod\=1000

// all reviews sorted in desc order of time

exports.getAllReviews = async (req, res) => {
  try {
    const result = await ReviewService.getAllReviews(
      req.query["pageNo"],
      req.query["limit"],
      req.query["reviewEndPeriod"]
    );
    res.json({ ...result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/review/getAllReviewsForMovie\?pageNo\=1\&limit\=5\&movieId\=tt2806788

// all reviews sorted in desc order of time

exports.getAllReviewsForMovie = async (req, res) => {
  try {
    const result = await ReviewService.getAllReviewsForMovie(
      req.query["pageNo"],
      req.query["limit"],
      req.query["movieId"]
    );
    res.json({ ...result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReviewsForMoviePeriod = async (req, res) => {
  try {
    const result = await ReviewService.getAllReviewsForMoviePeriod(
      req.query["pageNo"],
      req.query["limit"],
      req.query["movieId"],
      req.query["reviewEndPeriod"]
    );
    res.json({ ...result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// vote reviews
// upvote
// curl -X POST -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5NzU1MDcwMTQzMjg0MjI2MzU5IiwiZW1haWwiOiJtYW5kZWVwLnNpZGh1MDcyMkBnbWFpbC5jb20iLCJuYW1lIjoiTWFuZGVlcCBTaWRodSIsImlhdCI6MTY4NjUxODAxNiwiZXhwIjoxNjg2ODYzNjE2fQ.emtw8dwg1wGq37pKT-4xqKys-4afqSLrqBVFUaJTnCY' -H "Content-type: application/json" -d '{"review_id":"1686516420866", "voteType":"upvote"}' 'http://localhost:3001/api/review/vote'
// downvote
// curl -X POST -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY3MDQ3OTEsImV4cCI6MTY4NzA1MDM5MX0.CirlPhZ_S4otIaBy27J5dx1IWzhUS24Fuk8fyLM4Z5M' -H "Content-type: application/json" -d '{"review_id":"1686704892747", "voteType":"downvote"}' 'http://localhost:3001/api/review/vote'
exports.vote = async (req, res) => {
  try {
    const user = authenticate(req.headers.token);
    const result = await ReviewService.vote(user.user_id, req.body);
    res.json({ data: result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// curl -X PUT -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY3MDQ3OTEsImV4cCI6MTY4NzA1MDM5MX0.CirlPhZ_S4otIaBy27J5dx1IWzhUS24Fuk8fyLM4Z5M' -H "Content-type: application/json" -d '{"reviewId":"1686704892747"}' 'http://localhost:3001/api/review/unvote'

exports.unvote = async (req, res) => {
  try {
    const user = authenticate(req.headers.token);
    const result = await ReviewService.unvote(user.user_id, req.body);
    res.json({ data: result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// curl -X DELETE -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY3MDQ3OTEsImV4cCI6MTY4NzA1MDM5MX0.CirlPhZ_S4otIaBy27J5dx1IWzhUS24Fuk8fyLM4Z5M' -H "Content-type: application/json" 'http://localhost:3001/api/review/1686704892747'

  exports.deleteReview = async (req, res) => {
    try {
      const user=  authenticate(req.headers.token)
      const result=await ReviewService.deleteReview(req.params.id, req.headers.userid)
      res.json({ data: result, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// curl -X PUT -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODY3MDQ3OTEsImV4cCI6MTY4NzA1MDM5MX0.CirlPhZ_S4otIaBy27J5dx1IWzhUS24Fuk8fyLM4Z5M' -H "Content-type: application/json" -d '{"description":"Updated payload"}' 'http://localhost:3001/api/review/1686772444256'

exports.updateReview = async (req, res) => {
  try {
    const user = authenticate(req.headers.token);
    const result = await ReviewService.updateReview(req.params.id, req.body);
    res.json({ data: result, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
