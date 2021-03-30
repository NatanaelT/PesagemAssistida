require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/spricigo', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))

const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const usuariosRouter = require('./routes/usuarios');
const usuarioRouter = require('./routes/usuario');

const jwt = require('jsonwebtoken')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


app.use('/login', loginRouter)

app.use('/home', authenticateToken, homeRouter);
app.use('/', homeRouter);

app.use('/usuarios', usuariosRouter);
app.use('/usuario', authenticateToken, usuarioRouter);

function authenticateToken(req, res, next) {
  // const authHeader = req.headers['authorization']
  // const tokenHeader = authHeader && authHeader.split(' ')[1]
  const tokenCookies = req.cookies.token
  
  if(!tokenCookies)
    return res.sendStatus(401)
  
  let decoded = jwt.verify(tokenCookies, process.env.ACCESS_TOKEN_SECRET);
  req.user = decoded;
  if (!decoded.usuario.isAdmin) {
    return res.sendStatus(401)
  }
  next()
}

module.exports = app;
