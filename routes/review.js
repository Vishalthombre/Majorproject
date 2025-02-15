const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIN, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//post Route
router.post("/", validateReview,isLoggedIN, wrapAsync(reviewController.createReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIN,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;