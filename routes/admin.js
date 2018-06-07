const express = require('express');
const router = express.Router();
const Mail = require('./mail.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var mail = new Mail();

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

  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');
    if (err) throw err;

    db.collection("Users").find({ admin: { $ne: true } }).toArray((err, result) => {

      client.close();

      res.render('admin', {
        user: req.session.user,
        allUsers: result

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
