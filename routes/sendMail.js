const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const Mail = require('./mail.js');
var mail = new Mail();
var randomstring = require("randomstring");
var ObjectId = require('mongodb').ObjectID;


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


router.post('/', function(req, res, next) {
    var random = randomstring.generate();
    var confirmGumb = "<a href='http://localhost:5000/sendMail/"+ random +"/"+req.body.parentsEmail+"'>Confirm</a>";

    

    mail.posli(req.body.parentsEmail, req.body.vsebina + "<br><br>" +confirmGumb);

    MongoClient.connect(url, function(err, client) {
        var db = client.db('praktikum');
        if (err) throw err;

        db.collection('Text').count({ firma: req.body.firma }, function(err, count){
            if (err) throw err;

            var userParent = {
                user: req.body.userEmail,
                parent: random,
                version: count,
                firma: req.body.firma
            };
            db.collection("Confirmation").insertOne(userParent, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                client.close();
            });
        });
   
    
    });


    res.redirect("/");
});


module.exports = router;
