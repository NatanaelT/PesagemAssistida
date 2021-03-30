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
const usuariosRouter = require('./routes/usuarios');
const homeRouter = require('./routes/home');

const jwt = require('jsonwebtoken')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


app.use('/login', loginRouter)
app.use('/usuarios', authenticateToken, usuariosRouter);
app.use('/home', authenticateToken, homeRouter);
app.use('/', authenticateToken, homeRouter);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const tokenHeader = authHeader && authHeader.split(' ')[1]
  const tokenCookies = req.cookies.token
  
  // if(tokenCookies == null )
  //   decoded = jwt.verify(tokenHeader, process.env.ACCESS_TOKEN_SECRET);
  if(!tokenCookies)
    return res.sendStatus(401)
  
  let decoded = jwt.verify(tokenCookies, process.env.ACCESS_TOKEN_SECRET);
  console.log(decoded)
  req.user = decoded;
  if (!decoded.usuario.isAdmin) {
    return res.sendStatus(401)
  }
  next()
}

module.exports = app;
