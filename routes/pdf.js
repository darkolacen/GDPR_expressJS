const express = require('express');
const router = express.Router();
const Mail = require('./mail.js');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";


const userAuth = (req,res,next) => {
    if (req.session.user) {
    return next();
  }
  res.redirect("/prijava");
};

router.get('/:id',userAuth, (req, res, next) => {

  res.download('./pdfs/'+req.params.id+'.pdf', 'confirmation.pdf');

  //res.send("hello");


  
});


module.exports = router;
