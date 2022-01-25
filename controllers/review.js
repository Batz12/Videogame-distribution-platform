module.exports.RenderReview = async (req, res) => {
    const user = req.session.user;
    const review = `SELECT * FROM Reviews WHERE G_id=${req.params.id}`;
    const query = db.query(review, (err, rows) => {

        res.redirect(`/Game/${G_id}`, { 'review': rows, 'user': user });
    });

}

module.exports.deleteReview = async (req, res) => {
    const {reviewId } = req.params;
    const {id} = req.body;
    console.log(reviewId);
    console.log(id);

    const review = `DELETE FROM Reviews WHERE R_id=${reviewId}`;
    const query = db.query(review, (err, rows) => {
        req.flash('success', 'Successfully deleted review')
       res.redirect(`/Game/${id}`);

    });

}


module.exports.Submit = async (req, res) => {
    try {
        const { rName, rating, id} = req.body;
        // let sql = `UPDATE Game SET Gname=${gname},Genre=${genre},Publisher=${publisher},Developer=${developer},Price=${price},Discount=${discount},Rating=10,Picture=${picture},Requirements=${requirements} where G_id=${req.params.id}`;
        let sql = 'INSERT INTO Reviews SET ?'
        let post = {U_id:req.session.user.U_id,G_id:id,RName:rName,Publication:req.session.user.Username,Rating:rating,Review_feedback_rating:0};
        let query = db.query(sql,post,(err, result, rows) => {
            if (err) throw err;
            console.log(result);
            info = query.values;
            console.log(info)
            req.flash('success', 'Your review has been submitted!');
            res.redirect(`/Game/${id}`);
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('users/register');
    }

}   

module.exports.branchComment = async (req, res) => {
    try {
        const { id, reviewId } = req.body;
        let info;
        // let sql = `UPDATE Game SET Gname=${gname},Genre=${genre},Publisher=${publisher},Developer=${developer},Price=${price},Discount=${discount},Rating=10,Picture=${picture},Requirements=${requirements} where G_id=${req.params.id}`;
        let sql = `SELECT * FROM Reviews where R_id=${reviewId}`;
        let query = db.query(sql,(err, result, rows) => {
            if (err) throw err;
            console.log(result);
            info = query.values;
            console.log(info);
            let user=req.session.user;
            let sel = 'INSERT INTO Comments SET ?';
            let post = {U_id:user,CName:rows[0].Publication,Likes:rows[0].Rating,Dislikes:0,Replies:rows[0].RName};
            let query2 = db.query(sel,post,(err,rows)=>{

                req.flash('success', 'Your Comment is now branched into a community');
                res.redirect('Game');

            });
        });
       

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('users/register');
    }

}   


