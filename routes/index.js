const express = require('express');
const router = express.Router();
const Mail = require('./mail.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var mail = new Mail();
const groupArray = require('group-array');

const userAuth = (req,res,next) => {
    if (req.session.user) {
    return next();
  }
  res.redirect("/prijava");
};

router.get('/',userAuth, (req, res, next) => {

  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;


    db.collection("Confirmation").find({ firma: req.session.user.firma }).toArray((err, confs) => {

      db.collection("Text").find({ firma: req.session.user.firma }).sort({ _id : -1 }).limit(1).toArray((err, text) => {
        db.collection('Text').count({ firma: req.session.user.firma }, function(err, count){
          client.close();

          res.render('index', {
            user: req.session.user,
            confs: groupArray(confs, 'user'),
            text: text[0],
            version: count
          });
            
        });
      
        
      });
    
    });
  });
});

router.post('/dodajText',userAuth, (req, res, next) => {


  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;

    var text = {
      naslov: req.body.naslov,
      vsebina: req.body.vsebina,
      firma: req.session.user.firma

    };
    //.replace(/<\/p><p>/g, "</p><br><p>")
    db.collection("Text").insertOne(text, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });    
  });
res.redirect("/");
  

});

router.get('/logout', (req, res, next) => {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
