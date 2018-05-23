const express = require('express');
const router = express.Router();
const Mail = require('./mail.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var mail = new Mail();



function isUserAuthenticated(req,res,next){
  if (req.session.user) {
    return next();
  }
  res.redirect("/prijava");
}


router.get('/',isUserAuthenticated, function(req, res, next) {
  
  var userEmail = { email: req.session.user.email };
  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;
    
    db.collection("Users").findOne(userEmail, (err, result) => {

      
      client.close();

      res.render('index', { 
        title: 'Express',
        user: result
        
      });
    });
  });
  
  
});

router.get('/logout',isUserAuthenticated, function (req, res, next) {
  delete req.session.user;
  res.redirect('/');
});

router.get('/dodajStarsa',isUserAuthenticated, function (req, res, next) {
  
  res.render('addParent', { 
    user: req.session.user 
  });
});

router.post('/dodajStarsa/add',isUserAuthenticated, function (req, res, next) {
  var parentEmail = req.body.email;
  var userEmail = { email: req.session.user.email };

  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;
    
    db.collection("Users").updateOne(userEmail, { $push: { parents: parentEmail } }, function(err, res) {
        if (err) throw err;
        console.log("1 email updated");
        client.close();
    });

  });

  
  res.redirect('/');
});

module.exports = router;
