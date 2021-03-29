var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile('login.html', { root: './public' })
});


// router.post('/',
//     passport.authenticate('local', { 
//         successRedirect: '/home', 
//         failureRedirect: '/login?fail=true',
//         failureFlash: true
//     })
// );
router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    } if (!user) {
      return res.redirect('/login');
    } req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
