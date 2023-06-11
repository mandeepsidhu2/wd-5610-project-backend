const express = require("express");
const { postReview ,getAllReviewsForUser,getAllReviews,vote} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(postReview);
router.route("/getAllReviewsForUser").get(getAllReviewsForUser);
router.route("/getAllReviews").get(getAllReviews);
router.route("/vote").post(vote)


module.exports = router;
