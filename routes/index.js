const express = require('express');
const router = express.Router();
const Mail = require('./mail.js');

var mail = new Mail();



function isUserAuthenticated(req,res,next){
  if (req.session.user) {
    return next();
  }
  res.redirect("/prijava");
}


router.get('/',isUserAuthenticated, function(req, res, next) {
  //mail.posli('stalkaiser@gmail.com', 'hello');
  res.render('index', { 
    title: 'Express',
    user: req.session.user 
  });
});

router.get('/logout',isUserAuthenticated, function (req, res, next) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
