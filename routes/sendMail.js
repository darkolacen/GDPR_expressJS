const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const Mail = require('./mail.js');
var mail = new Mail();
var randomstring = require("randomstring");
var ObjectId = require('mongodb').ObjectID;
var ip = require('ip');
var pdfcrowd = require("pdfcrowd");
var fs = require('fs'); 


var pdfClient = new pdfcrowd.HtmlToPdfClient("stalkaiser", "310af098b534d1141139c41c3f72ce44");


function isUserAuthenticated(req,res,next){
  if (req.session.user) {
    return next();
  }
  res.redirect("/prijava");
}

router.get('/:randomNum/:email', function(req, res, next) {
    var newvalues = { $set: {parent: req.params.email, conf: "yes", parent_ip: ip.address(), date: new Date()} };
    var parentCode = { parent: req.params.randomNum };
    MongoClient.connect(url, function(err, client) {
        var db = client.db('praktikum');
        if (err) throw err;
        
        db.collection("Confirmation").findOne(parentCode, function(err, conf) {
            if (err) throw err;
            var issue_date = conf._id.getTimestamp();
            var head = "<span>User: "+conf.user+", ip: "+conf.user_ip+", date: "+issue_date+"</span><br><span>Parent: "+req.params.email+", ip: "+ip.address()+", date: "+new Date()+"</span><hr>";
            
            if (!conf){
                res.send("Link not valid");
            }else{
                db.collection("Confirmation").updateOne(parentCode, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log(conf);
                });

                db.collection("Text").find({ firma: conf.firma }).sort({ _id : 1 }).toArray((err, text) => {
                  console.log(text);
                  client.close();
                  pdfClient.convertStringToFile(
                    head+""+text[conf.version-1].vsebina,
                    "pdfs/"+conf._id+".pdf",
                    function(err, fileName) {
                        if (err) return console.error("Pdfcrowd Error: " + err);
                        console.log("Success: the file was created " + fileName);
                    }
                  );            
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
                firma: req.body.firma,
                conf: "no",
                user_ip: ip.address(),
            };
            db.collection("Confirmation").insertOne(userParent, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                client.close();
            });
        });
   
    
    });


    res.send("Mail Sent");
});


module.exports = router;
