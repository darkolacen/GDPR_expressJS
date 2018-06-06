const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const Mail = require('./mail.js');
var mail = new Mail();
var randomstring = require("randomstring");


function isUserAuthenticated(req,res,next){
  if (req.session.user) {
    return next();
  }
  res.redirect("/prijava");
}

router.get('/:randomNum/:email', function(req, res, next) {
    var newvalues = { $set: {parent: req.params.email} };
    var parentCode = { parent: req.params.randomNum };
    MongoClient.connect(url, function(err, client) {
        var db = client.db('praktikum');
        if (err) throw err;
        
        db.collection("Confirmation").findOne(parentCode, function(err, res) {
            if (err) throw err;
            if (!res){
                res.send("Link not valid");
            }else{
                db.collection("Confirmation").updateOne(parentCode, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log("1 email updated");
                });
            }
            console.log("1 document inserted");
            client.close();
        });
    
    });
    res.send("Confirmed");
});


router.post('/',isUserAuthenticated, function(req, res, next) {
    console.log(req.body.email);
    var random = randomstring.generate();
    mail.posli(req.body.email, "<a href='http://localhost:3000/sendMail/"+ random +"/"+req.body.email+"'>Confirm</a>");

    var userParent = {
        user: req.session.user.email,
        parent: random
    };

    MongoClient.connect(url, function(err, client) {
        var db = client.db('praktikum');
        if (err) throw err;
        
        db.collection("Confirmation").insertOne(userParent, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();
        });
    
    });


    res.redirect("/");
});


module.exports = router;
