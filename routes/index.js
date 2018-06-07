const express = require('express');
const router = express.Router();
const Mail = require('./mail.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var mail = new Mail();

const userAuth = (req,res,next) => {
  if (req.session.user) {
    if (req.session.user.admin){
      res.redirect("/admin");
    }
    return next();
  }
  res.redirect("/prijava");
};

router.get('/',userAuth, (req, res, next) => {

  var userEmail = { email: req.session.user.email };
  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;

    db.collection("Users").findOne(userEmail, (err, user) => {
      db.collection("Text").find({}).toArray((err, texts) => {
        console.log(texts);
        res.render('index', {
          title: 'Express',
          user: user,
          texts: texts
        });
        client.close();
      });
      
    });
    
  });
  
  

});


router.get('/logout', (req, res, next) => {
  delete req.session.user;
  res.redirect('/');
});

router.get('/dodajStarsa',userAuth, (req, res, next) => {

  res.render('addParent', {
    user: req.session.user
  });
});

router.post('/dodajStarsa/add',userAuth, (req, res, next) => {
  var parentEmail = req.body.email;
  var userEmail = { email: req.session.user.email };

  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;

    db.collection("Users").updateOne(userEmail, { $push: { parents: parentEmail } }, (err, res) => {
        if (err) throw err;
        console.log("1 email updated");
        client.close();
    });

  });


  res.redirect('/');
});

module.exports = router;
