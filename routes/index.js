var express = require('express');
var router = express.Router();

function isUserAuthenticated(req,res,next){
  if (req.session.user) {
    return next();
  }
  res.redirect("/prijava");
}

router.get('/',isUserAuthenticated, function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    user: req.session.user 
  });
});

module.exports = router;
