const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const review = require('../controllers/review');
const { Router } = require('express');
const check = require('../middleware');

router.route('/')
      .get(review.RenderReview)
      .post(review.Submit)

router.route('/:reviewId')
      .post(review.deleteReview)

router.route('/:reviewId/comment')
      .post(review.branchComment)



module.exports = router;