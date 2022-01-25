const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/user');
const { Router } = require('express');
const check = require('../middleware') 


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(
        passport.authenticate('local', {
        successRedirect: '/Game',
        failureRedirect: '/login',
        failureFlash: true,
        session: false
    }),
    catchAsync(users.login))
    
router.get('/logout',users.logout)


module.exports = router;