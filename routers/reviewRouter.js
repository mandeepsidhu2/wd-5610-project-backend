const express = require("express");
const { postReview ,getAllReviewsForUser} = require("../controllers/reviewController");

const router = express.Router({ mergeParams: true });

router.route("/").post(postReview);
router.route("/getAllReviewsForUser/:userId").get(getAllReviewsForUser);

module.exports = router;
