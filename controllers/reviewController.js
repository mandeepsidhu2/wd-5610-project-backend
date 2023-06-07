const ReviewService = require("../services/reviewService")
const {authenticate} = require("./authMiddleware")

//  curl -X POST -H "Content-Type: application/json" -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODYwOTkxNTQsImV4cCI6MTY4NjQ0NDc1NH0.SiPxn2L4nu89u1mCV4Ud4-fAPFHh2bhblA-7L9mq6_I" -d '{"name":"value1", "email":"value2","image_url":"image"}' http://localhost:3001/api/review
exports.postReview = async (req, res) => {
    try {
      authenticate(req.headers.token)
      await ReviewService.postReview(req.body)
      res.json({ data: "pong", status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//  curl -X GET -H "Content-Type: application/json" -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODYwOTkxNTQsImV4cCI6MTY4NjQ0NDc1NH0.SiPxn2L4nu89u1mCV4Ud4-fAPFHh2bhblA-7L9mq6_I"  http://localhost:3001/api/getAllReviewsForUser/109011835276418143354

  exports.getAllReviewsForUser = async (req, res) => {
    try {
      authenticate(req.headers.token)
      const result=await ReviewService.getAllReviewsForUser(req.params["userId"])
      res.json({ data: result, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };