var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isAuth, function(req, res, next) {
    res.sendFile('home.html', { root: './public' })
});

function isAuth (req, res, next) {
    if(req.isAuthenticated){
      return next();
    }
    res.redirect('/login')
  }
module.exports = router;
