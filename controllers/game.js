module.exports.renderPage = async (req,res)=>{
    let sel= 'SELECT * FROM Game';
    let info;
    // let user_info;
    // let user = 'SELECT * FROM Users';
    let user_info;
    user_info=req.session.user;
    const query =  db.query(sel, (err,rows)=>{
        if(err) throw err;
        info = rows;
        let sql='CALL Rating_update()';
        const query2 = db.query(sql,(err,rows)=>{
            res.render('Game/index',{'info':info,'user_info':user_info});
        });
        
       });  
       
 
    // const query2 =  db.query(user, (err,rows)=>{
    //     if(err) throw err;
    //     user_info = rows;
    //     console.log(user_info);
    // });  
    //res.render('Game/index',{'info':info});
}

module.exports.NewForm = (req, res) => {
        res.render('Game/new');
       
}

module.exports.Download = (req,res) => {
    try{
    let sel= `SELECT * FROM  Game where G_id= ${req.params.id}`;
    let user = req.session.user.U_id;
    const query = db.query(sel,(err,rows)=>{
        if(err) throw err;
        info = rows;
        console.log(info);
        let cquery= `SELECT * FROM Library`;
        const check = db.query(cquery,(err,rows)=>{
            for (item in rows) {
                if(item.L_name=info.Gname)
                {req.flash('error','This game is already in your library!');
                res.redirect('/Game')}
            }
        });

        let lib = `INSERT INTO Library SET ?`;
        let post = {U_id:user,L_Name:rows[0].Picture,Game_count:0,Achievements:'None'};
        const query2 = db.query(lib,post,(err,rows)=>{
            if(err) throw err;
            info = rows;
            console.log(info);
            req.flash('success','Your Game has downloaded!');
            res.redirect('/Game')

        });
    });
    
     }catch(err){
        req.flash('error', err.message);
        res.redirect('users/register');
    }
       

}


module.exports.enableSale = (req,res) =>{
    console.log('Execute this please!');
    let sql='SELECT * FROM Store';
    const query = db.query(sql,(err,rows)=>{
         let store = rows;
         let update;
         if(store[0].Status=="Online")
         {update="Summer Sale";}
         else
         {update="Online";}
         let sel = 'UPDATE Store SET ?';
         let post = {Status:update};
         const query2 = db.query(sel,post,(err,rows)=>{
        if(update=="Summer Sale")
        {req.flash('success','You are now sponsoring the summer sale for any new games added!');}
        else
        {req.flash('success','Sale removed!');}
        console.log("enabled!"); 
        res.redirect('/Game/apply');
         });
    });
}

module.exports.applySale = (req,res) =>{
    let sql='SELECT * FROM Sale';
    const query = db.query(sql,(err,rows)=>{
        let sale = rows;
        let sel = 'SELECT * FROM Store';
        const query2 = db.query(sel,(err,rows)=>{
            let store=rows;
            if(sale[0].Sale_Name==store[0].Status){
                // Update the Group discount of all games
                let update = 'UPDATE Game SET ?'
                let post = {Discount:sale[0].Group_Discount};
                const query3 = db.query(update,post,(err,rows)=>{
                    req.flash('success','Discount applied!');
                    req.flash('success','You are now sponsoring the summer sale for any new games added!');
                    res.redirect('/Game');
                });
             
         
            } 
        });
   });

}



module.exports.Comm = (req,res) => {
    try{
    let sel= `SELECT * FROM  Game where G_id= ${req.params.id}`;
    let user = req.session.user.U_id;
    const query = db.query(sel,(err,rows)=>{
        if(err) throw err;
        info = rows;
        console.log(info);
        let cquery= `SELECT * FROM Community`;
        const check = db.query(cquery,(err,rows)=>{
            for (item in rows) {
                if(item.G_id=info.G_id)
                {req.flash('error','You have already joined this community!');
                res.redirect('/Game')}
            }
        });
        
        let com = `INSERT INTO Community SET ?`;
        let post = {U_id:user,G_id:rows[0].G_id,C_id:user,Comm_Name:rows[0].Picture};
        const query2 = db.query(com,post,(err,rows)=>{
            if(err) throw err;
            info = rows;
            console.log(info);
            req.flash('success','You have joined a community!');
            res.redirect('/Game')

        });
    });
    
     }catch(err){
        req.flash('error', err.message);
        res.redirect('users/register');
    }
       

}




module.exports.ShowForm = (req, res) => {
    let info;
    let review;
    let sel= `SELECT * FROM Game where G_id= ${req.params.id}`;
    const query =  db.query(sel,(err,rows)=>{
        if(err) throw err;
        info = rows;
        console.log(info);
        let rev=`SELECT * FROM Reviews WHERE G_id=${info[0].G_id}`;
        const query2 = db.query(rev,(err,rows)=>{
         review=rows;
         console.log(review);
         res.render('Game/show',{'info':info,'review':review,'user':req.session.user});
        });
      
    });  
    
}


module.exports.EditForm = (req,res) => {
    let info;
    console.log(req.params.id);
    let sel = `SELECT * FROM Game where G_id= ${req.params.id}`;
    const query = db.query(sel,(err,rows)=>{
           if(err) throw err;
           info = rows;
           console.log(info);
           res.render('Game/edit',{'info':rows});
    });
}


module.exports.UpdateGame = async (req,res)=>{
    try{
        const {gname,genre,publisher,developer,price,discount,rating,picture,requirements} = req.body;
        let info;
       // let sql = `UPDATE Game SET Gname=${gname},Genre=${genre},Publisher=${publisher},Developer=${developer},Price=${price},Discount=${discount},Rating=10,Picture=${picture},Requirements=${requirements} where G_id=${req.params.id}`;
       let sql = `UPDATE Game SET ? where G_id=${req.params.id}`
       let post =  {Gname:gname,Genre:genre,Publisher:publisher,Developer:developer,Price:price,Discount:discount,Rating:5,Picture:picture,Requirements:requirements};
       let query = db.query(sql,post,(err,result,rows)=>{
            if(err) throw err;
            console.log(result);
            info=query.values;
            console.log(info)
        });
        req.flash('success','Your Game has been updated!');
        res.redirect('/Game');

    }catch(err){
        req.flash('error', err.message);
        res.redirect('users/register');
    }
}


module.exports.CreateGame = async (req,res)=>{
    try{
        const {gname,genre,publisher,developer,price,discount,rating,picture,requirements} = req.body;
        let info;
        let post = {Gname:gname,Genre:genre,Publisher:publisher,Developer:developer,Price:price,Discount:discount,Rating:rating,Picture:picture,Requirements:requirements};
        let sql = 'INSERT INTO Game SET ?';
        let query = db.query(sql, post, (err,result,rows)=>{
            if(err) throw err;
            console.log(result);
            info=query.values;
            console.log(info)
        });
        req.flash('success','Your Game has been added!');
        res.redirect('Game');
    }catch(err){
        req.flash('error', err.message);
        res.redirect('users/register');
       }
    
}


