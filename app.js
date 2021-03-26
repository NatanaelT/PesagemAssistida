var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var loginRouter = require('./routes/login');
var usuariosRouter = require('./routes/usuarios');
var homeRouter = require('./routes/home');

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
// app.use(express.static('public'))

app.use('/login', loginRouter);
app.use('/usuarios', usuariosRouter);
app.use('/home', homeRouter);


module.exports = app;
