if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

var loginRouter = require('./routes/login');
var usuariosRouter = require('./routes/usuarios');
var homeRouter = require('./routes/home');
const passport = require('passport');

var app = express();

mongoose.connect('mongodb://localhost/spricigo', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.use('/login', checkNotAuthenticated, loginRouter);
app.use('/usuarios', usuariosRouter);
app.use('/home', checkAuthenticated, homeRouter);
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next ()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
       return res.redirect('/home')
    }
    next ()
}

module.exports = app;
