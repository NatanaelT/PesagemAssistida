var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')
require('./config/auth')(passport)

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/spricigo', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

var loginRouter = require('./routes/login');
var usuariosRouter = require('./routes/usuarios');
var homeRouter = require('./routes/home');

var app = express();
//Sessão
app.use(session({
    secret: 'teste',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', loginRouter);
app.use('/usuarios', usuariosRouter);
app.use('/', homeRouter);

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
      console.log('aqui')
    res.redirect('/login'); //Inside a callback… bulletproof!
  });
});

module.exports = app;
