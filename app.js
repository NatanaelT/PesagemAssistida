require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const Usuario = require('./models/usuario.js')

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
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', loginRouter)
app.use('/usuarios', authenticateToken, usuariosRouter);
app.use('/', authenticateToken, homeRouter);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.user = decoded;

  if (!req.user.isAdmin) {
    return res.sendStatus(403)
  }
  next()
}

module.exports = app;
