const express = require('express');
const nunjucks = require('nunjucks');
const session = require('express-session');
const sessionConfig = require('./config/session');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

app.use(session(sessionConfig))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{ res.render('index.html', {user:req.session.user});})
app.use('/auth', authRouter);
app.use('/user', userRouter);


app.listen(3000);