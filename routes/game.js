const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const game = require('../controllers/game');
const { Router } = require('express');
const check = require('../middleware');

router.route('/')
    .get(game.renderPage)
    .post(catchAsync(game.CreateGame))
    
    
router.route('/update/:id')
      .post(catchAsync(game.UpdateGame))

router.route('/new')
       .get(game.NewForm)

router.route('/sale')
       .get(game.enableSale)
 
 router.route('/apply')
       .get(game.applySale)      
        
       
router.route('/:id')
       .get(game.ShowForm)
       
router.route('/download/:id')
      .get(game.Download)

router.route('/community/:id')
      .get(game.Comm)

router.route('/edit/:id')
      .get(game.EditForm)


          


module.exports = router;
