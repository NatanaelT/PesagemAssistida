require('dotenv').config()
var express = require('express')
var router = express.Router()
const Usuario = require('../models/usuario.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile('login.html', { root: './public' })
});

router.post('/', async (req, res) => {
  const usuario = await Usuario.findOne({ email: req.body.email })
  if (usuario == null) {
    return res.status(400).send('Usuario não encontrado')
  }
  try {
    if (await bcrypt.compare(req.body.password, usuario.password)) {
      console.log(usuario)
      jwt.sign({ usuario }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        res.json({ token })
      });
    } else {
      res.send('Usuario ou senha incorretos')
    }
  } catch {
    res.status(500).send()
  }
})


// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401)

//   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   req.user = decoded;

//   if (!req.user.isAdmin) {
//     return res.sendStatus(403)
//   }
//   next()
// }

module.exports = router;
