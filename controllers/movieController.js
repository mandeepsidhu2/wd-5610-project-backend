const movieService = require("../services/movieService")
const {authenticate} = require("./authMiddleware")


//  curl -X POST -H "Content-Type: application/json" -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODYwOTkxNTQsImV4cCI6MTY4NjQ0NDc1NH0.SiPxn2L4nu89u1mCV4Ud4-fAPFHh2bhblA-7L9mq6_I" -d '{"voteType":"upvote","movie":{"Title":"Fukrey","Year":"2013","imdbID":"tt2806788","Type":"movie","Poster":"https:\/\/m.media-amazon.com\/images\/M\/MV5BODI5MzQ2NDg0MV5BMl5BanBnXkFtZTcwNTEwMzI1OQ@@._V1_SX300.jpg"}}' http://localhost:3001/api/movie/vote
//   curl -X POST -H "Content-Type: application/json" -H "token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTA5MDExODM1Mjc2NDE4MTQzMzU0IiwiZW1haWwiOiJ0YWJiZXJvbmxpbmVAZ21haWwuY29tIiwibmFtZSI6InRhYmJlciBvbmxpbmUiLCJpYXQiOjE2ODYwOTkxNTQsImV4cCI6MTY4NjQ0NDc1NH0.SiPxn2L4nu89u1mCV4Ud4-fAPFHh2bhblA-7L9mq6_I" -d '{"voteType":"downvote","movie":{"Title":"Fukrey","Year":"2013","imdbID":"tt2806788","Type":"movie","Poster":"https:\/\/m.media-amazon.com\/images\/M\/MV5BODI5MzQ2NDg0MV5BMl5BanBnXkFtZTcwNTEwMzI1OQ@@._V1_SX300.jpg"}}' http://localhost:3001/api/movie/vote

exports.vote = async (req, res) => {
    try {
      authenticate(req.headers.token)
      await movieService.vote(req.body)
      res.json({ data: "pong", status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };