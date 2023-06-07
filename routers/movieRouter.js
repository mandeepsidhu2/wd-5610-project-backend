const express = require("express");
const {
    vote
} = require("../controllers/movieController");

const router = express.Router();

router.route("/vote").post(vote);

module.exports = router;
