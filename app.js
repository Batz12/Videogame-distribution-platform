const express = require('express');
const mysql = require('mysql');
const path = require('path');
const session= require('express-session');
const ejsMate=require('ejs-mate');
const flash = require('connect-flash');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const ExpressError=require('./utils/ExpressError');
//const User = require('./models/user');
const userRoutes = require('./routes/user')
const gameroutes = require('./routes/game');
const libroutes = require('./routes/library');
const reviewRoutes = require('./routes/review');
const commRoutes = require('./routes/community');
const bodyParser = require('body-parser');

// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'GodofWar@2021',
    database: 'Videogames'
});

const secret = process.env.SECRET || 'secret';

const sessionConfig = {
    db,
    name: 'session',
    secret,
    resave:false,
    saveUnitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 *24 *7
    }
}

// Connect
db.connect((err)=>{
  if(err){
      throw err;
  }
  console.log("MySql Connected......");
});

global.db = db;

const app = express();
app.use(bodyParser.json()); // body-parser MW
app.use(bodyParser.urlencoded({ extended: false })); // See doc of it for ref
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(flash());
app.use(cookieParser('secret'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());


app.use((req,res,next)=>{
    console.log(req.query);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/',userRoutes);
app.use('/Game',gameroutes);
app.use('/Library',libroutes);
app.use('/Community',commRoutes);
app.use('/Game/:id/reviews',reviewRoutes);


app.get('/', (req, res) => {
    res.render('home')
});

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //passback entire req to call back
  } , function (req, username, password, done){
        if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        db.query("select * from Users where username = ?", [username], function(err, rows){
            console.log(err); console.log(rows);
          if (err) return done(req.flash('error',err));
          if(!rows.length){ return done(null, false, req.flash('error','Invalid username or password.')); }
          salt = salt+''+password;
          var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
          var dbPassword  = rows[0].Password;
          if(!(bcrypt.compare(dbPassword,encPassword))){
              return done(null, false, req.flash('error','Invalid username or password.'));
           }
           req.session.user = rows[0];
          return done(null, rows[0]);
        });
      }
  ));

  passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    connection.query("select * from Users where U_id = "+ id, function (err, rows){
        done(err, rows[0]);
    });
});

// Insert port 1
app.get('/addpost1',(req,res)=>{
    let post = {title: 'Post One', body: 'This is post number one'};
    let sql = 'INSERT INTO Game SET ?';
    let query = db.query(sql, post, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added......');

   
    });
});

// Insert port 1
app.get('/addpost2',(req,res)=>{
    let post = {title: 'Post Two', body: 'This is post number two'};
    let sql = 'INSERT INTO Game SET ?';
    let query = db.query(sql, post, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added......');

   
    });
});

// Select posts
app.get('/getposts',(req,res)=>{
    let sql = 'SELECT * FROM Game';
    let query = db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched......');

   
    });
});

// Select single post
app.get('/getpost/:id',(req,res)=>{
    let sql = `SELECT * FROM Game WHERE id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post fetched......');

   
    });
});

// Update Post
app.get('/updatepost/:id',(req,res)=>{
    let newTitle = 'Updated Title';
    let sql = `UPDATE Game SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post updated......');

   
    });
});

// Delete Post
app.get('/deletepost/:id',(req,res)=>{
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM Game WHERE id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Post deleted......');

   
    });
});

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
});

app.use((err,req,res,next)=>{
    const {statusCode = 500} = err;
    if(!err.message) err.message='Oh No, Something Went Wrong! '
    res.status(statusCode).render('error',{err});
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})