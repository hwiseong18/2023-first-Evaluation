const pool = require('./_DBpool');

const list = (req, res)=>{
    let sql = `SELECT * FROM users;`
    pool.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        res.render('user/list.html', {rows:rows, user:req.session.user});
    })
}

const myPage = (req, res)=>{
    res.render('user/myPage.html', {user:req.session.user});
}

const update = (req, res)=>{
    if(req.body.password == req.session.user.pw){
        if(req.body.password == req.body.password2){
            let sql = `UPDATE users SET nick='${req.body.nick}' WHERE id='${req.session.user.id}'`;
            pool.query(sql, (err, rows, fields)=>{
                if(err) throw err;
                req.session.user.name = req.body.nick;
                res.redirect('/user/myPage');
            })
        }
        else
            res.render('message.html', {msg:'비번 서로 안맞음'});
    }
    else
        res.render('message.html', {msg:'비번 틀림'});
}

const withdrawal = (req, res)=>{
    if(req.body.password == req.session.user.pw){
        if(req.body.password == req.body.password2){
            let sql = `DELETE FROM users WHERE id='${req.session.user.id}'`;
            pool.query(sql, (err, rows, fields)=>{
                if(err) throw err;
                req.session.destroy();
                res.render('message.html', {msg:'탈퇴됨'});
            })
        }
        else
            res.render('message.html', {msg:'비번 서로 안맞음'});
    }
    else
        res.render('message.html', {msg:'비번 틀림'});
}

module.exports = {
    list,
    myPage,
    update,
    withdrawal,
}