const express = require("express");
const { postReview ,getAllReviewsForUser,getAllReviews,vote, unvote, deleteReview, updateReview, getAllReviewsForMovie, getAllReviewsForMoviePeriod} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(postReview);
router.route("/:id").delete(deleteReview);
router.route("/:id").put(updateReview);
router.route("/getAllReviewsForUser").get(getAllReviewsForUser);
router.route("/getAllReviewsForMovie").get(getAllReviewsForMovie);
router.route("/getAllReviewsForMoviePeriod").get(getAllReviewsForMoviePeriod)
router.route("/getAllReviews").get(getAllReviews);
router.route("/vote").post(vote)
router.route("/unvote").post(unvote)

module.exports = router;
