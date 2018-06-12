const express = require('express');
const router = express.Router();
const Mail = require('./mail.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var mail = new Mail();
const _ = require('underscore');
var autoIncrement = require("mongodb-autoincrement");



router.get('/:firma', (req, res, next) => {
  MongoClient.connect(url, function(err, client) {
    var db = client.db('praktikum');

    db.collection("Text").find({ firma: req.params.firma }).sort({ _id : -1 }).limit(1).toArray((err, result) => {
      
      client.close();

      res.render('firmaLink', {
        firma: req.params.firma,
        text: result[0]

      });
    });
  });
 
  
  

});





module.exports = router;
