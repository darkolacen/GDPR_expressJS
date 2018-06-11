const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";



function isUserAuthenticated(req,res,next){
  if (req.session.user) {
    return next();
  }
  res.redirect("/prijava");
}


router.get('/',isUserAuthenticated, function(req, res, next) {
  //mail.posli('stalkaiser@gmail.com', 'hello');
  res.render('profil', { 
    user: req.session.user
  });
});

router.post('/updateProfile',isUserAuthenticated, function(req, res, next) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db('praktikum');
    var email = { email: req.body.email };
    var newvalues = { $set: {name: req.body.username, firma: req.body.firma} };    
    db.collection("Users").updateOne(email, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  });
  req.session.user.name = req.body.username;
  req.session.user.firma = req.body.firma;
  res.redirect("/");
});


module.exports = router;
