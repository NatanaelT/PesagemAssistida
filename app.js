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
app.use('/usuarios', usuariosRouter);
app.use('/', homeRouter);

module.exports = app;
