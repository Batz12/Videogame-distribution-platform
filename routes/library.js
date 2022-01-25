const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const game = require('../controllers/game');
const lib = require('../controllers/library');
const { Router } = require('express');
const check = require('../middleware');

router.route('/')
    .get(lib.renderLib)




module.exports = router;