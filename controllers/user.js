const crypto = require('crypto');

module.exports.renderRegister = (req,res)=>{
    res.render('users/register');
}

module.exports.register = async(req,res)=>{
    try{
    let {type,email, username, password} = req.body;
    // const user = new User({type,email,username});
    // const registeredUser = await User.register(user,password)
    // var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6'; 
    // salt = salt+''+password;
    // var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
    // password=encPassword;
    let info;
    let post = {Type:type,Email: email, Username: username, Password: password};
    let sql = 'INSERT INTO Users SET ?';
    let query = db.query(sql, post, (err,result,rows)=>{
        if(err) throw err;
        console.log(result);
        info=query.values;
        console.log(info)
    
      //  res.send('User registered......');

    });
    // let sel= 'SELECT * FROM Users';
    // const registeredUser =  db.query(sel, (err,result)=>{
    //     if(err) throw err;
    //     console.log(result);
      //  res.send('User info fetched......');
    //});
    req.flash('success','Welcome to Focus!');
    res.redirect('Game');
   }catch(err){
    req.flash('error', err.message);
    res.redirect('users/register');
   }
    // req.login(info,err =>{
    //     if(err) return next(err);
    //     req.flash('success','Welcome to Focus!');
    //     res.redirect('Game/index');
    // })
    // }catch(e){
    //     req.flash('error', e.message);
    //     res.redirect('users/register');
        
    // }
}

module.exports.renderLogin = (req,res)=>{
  res.render('users/login');
  }

module.exports.login = (req,res)=>{
    req.flash('success','Welcome Back!');
    
    const redirectUrl = req.session.returnTo || 'Game';
    console.log(redirectUrl);
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    //res.redirect('Game');
}

module.exports.logout = (req,res)=>{
    req.logout();
    req.flash('success',"Goodbye!");
    res.redirect('/');
}

