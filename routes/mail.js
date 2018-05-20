const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'stalkaiser96@gmail.com',
           pass: '789456123d'
       }
   });

module.exports = function () {
    return new Mail();
  }
  
  function Mail () {
  
  }

  Mail.prototype.posli = function (reciever, body) {
    var message = {
        from: 'praktikum@praktikum.com',
        to: reciever,
        subject: 'praktikum msg',
        html: '<p>'+body+'</p>'
      };

      transporter.sendMail(message, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
      });
    
    
  };
