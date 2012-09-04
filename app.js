var express = require('express')
var fs = require('fs')
var nodemailer = require('nodemailer')
var config = require('./config').config

var app = express()

var transport = nodemailer.createTransport(config.email.transport.type, config.email.transport.options)

app.configure(function() {
  app.use(app.router)
  app.use('/', express.static(__dirname + '/public'))
})

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {
    res.send(text)
  })
})

app.get('/send-mail', function(req, res) {
  
  var mailOptions = {
    from: config.email.from,
    to: config.email.to,
    subject: "test message"
  }
  

  transport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error)
      res.send('Error sending mail: ' + error)
    } else {
      console.log("Message sent: " + response.message)
      res.send('Message sent: ' + response.message)
    }
  })
})

app.listen(process.env.VMC_APP_PORT || 1377, null)
//app.listen(3030)

