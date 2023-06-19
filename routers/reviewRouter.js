const express = require("express");
const { postReview ,getAllReviewsForUser,getAllReviews,vote, unvote} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(postReview);
router.route("/getAllReviewsForUser").get(getAllReviewsForUser);
router.route("/getAllReviews").get(getAllReviews);
router.route("/vote").post(vote)
router.route("/unvote").post(unvote)

module.exports = router;
