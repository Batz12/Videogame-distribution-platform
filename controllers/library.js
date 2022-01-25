module.exports.renderLib = async (req,res)=>{
    let user_info = req.session.user;
    let lib = `SELECT * FROM Library WHERE U_id=${user_info.U_id}`;
    const query =  db.query(lib, (err,rows)=>{
        if(err) throw err;
        let info = rows;
        console.log(info);
        console.log(user_info); 
        res.render('Library/index',{'info':info,'user_info':user_info});
       });  
}



