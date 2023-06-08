const express = require("express");
const { postReview ,getAllReviewsForUser,getAllReviews} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(postReview);
router.route("/getAllReviewsForUser/:userId").get(getAllReviewsForUser);
router.route("/getAllReviews").get(getAllReviews);


module.exports = router;
