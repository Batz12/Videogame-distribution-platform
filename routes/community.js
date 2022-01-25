const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const community= require('../controllers/community');
const { Router } = require('express');
const check = require('../middleware');

router.route('/')
      .get(community.RenderCommunity)



module.exports = router;