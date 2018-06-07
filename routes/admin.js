const express = require('express');
const router = express.Router();
const Mail = require('./mail.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var mail = new Mail();
const _ = require('underscore');

const userAuth = (req,res,next) => {
    if (req.session.user){
      if (req.session.user.admin){
        return next();
      }else{
        res.send("Unauthorized access");
      }
    }else{
      res.redirect("/prijava");
    }
    
  
};

router.get('/',userAuth, (req, res, next) => {
  var UserConf = [];

  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;

    db.collection("Users").find({ admin: { $ne: true } }).toArray((err, users) => {

      db.collection("Confirmation").find({}).toArray((err, confs) => {


        console.log(users);


        var emails = _.pluck(users, 'email');
        
        client.close();

        res.render('admin', {
          user: req.session.user,
          allUsers: users,
          confs: confs

        });
      });

    });
  });

  

});

router.post('/dodajText',userAuth, (req, res, next) => {

  var text = {
    naslov: req.body.naslov,
    vsebina: req.body.vsebina
  };

  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;
    db.collection("Text").insertOne(text, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
    
  });
res.redirect("/admin");
  

});




module.exports = router;
