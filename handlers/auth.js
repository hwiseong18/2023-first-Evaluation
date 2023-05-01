const pool = require('./_DBpool');
const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);

const signIn = (req, res)=>{
    if(req.session.user === undefined)
        res.render('auth/signIn.html');
    else
        res.redirect('/');
}

const signInProcess = (req, res)=>{
    let sql = `SELECT id, pw, nick FROM users WHERE id='${req.body.email}' AND pw='${req.body.password}'`;
    pool.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        if(rows.length !== 0){
            req.session.user = {id: rows[0].id, pw:rows[0].pw, name:rows[0].nick};
            res.redirect('/');
        }
        else
            res.render('message.html', {msg:'틀렸노 동성애자야'});

    })
}

const signOut = (req, res)=>{
    req.session.destroy();
    res.redirect('/');
}

const signUp = (req, res)=>{
    res.render('auth/signUp.html');
}

const signUpProcess = (req, res)=>{
    let sql = `SELECT id FROM users WHERE id='${req.body.email}'`;
    pool.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        if(rows.length === 0){
            let sql = `INSERT INTO users (id, nick, pw, joinDate, lastLogin, tier) VALUES (?,?,?,?,?,?)`;
            let values = [req.body.email, req.body.nick, req.body.password, 
                            getDateTime(new Date()),getDateTime(new Date()), '돌대머리'];
            pool.query(sql, values, (err, rows, fields)=>{
                if(err) throw err;
                res.redirect('/auth/signIn');
            })
        }
        else
            res.render('message.html', {msg:'중복있죠'});
    })
}

module.exports = {
    signIn,
    signInProcess,
    signOut,
    signUp,
    signUpProcess,
}