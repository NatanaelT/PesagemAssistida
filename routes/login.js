var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('login.html', { root: './public' })
});


router.post('/',
    passport.authenticate('local', { 
        successRedirect: '/home', 
        failureRedirect: '/login?fail=true',
        failureFlash: true
    })
);

module.exports = router;
