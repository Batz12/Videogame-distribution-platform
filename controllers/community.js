module.exports.RenderCommunity = async (req, res) => {
    const user = req.session.user;
    const sql = `SELECT * FROM Comments where U_id=${user.U_id}`;
    let comments;
    const query = db.query(sql, (err, rows) => {
        comments=rows;
        console.log(comments);
        
        let comm_info;
        const comm = `SELECT * FROM Community where U_id=${user.U_id} and C_id=${comments[0].C_id}`;
        const query2 = db.query(comm,(err,rows)=>{
            comm_info=rows;
            console.log(comm_info);
            res.render('Community/index', {'comm':comm_info , 'user': user, 'comments':comments });
        });
       
    });

}