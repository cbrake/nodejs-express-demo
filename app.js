var express = require('express'),
    fs = require('fs'),
    nodemailer = require('nodemailer'),
    config = require('./config').config,
    sys = require('sys')

var app = express()

// this is required to parse the body of HTML POSTs, etc
app.use(express.bodyParser()) 

var transport = nodemailer.createTransport(config.email.transport.type, config.email.transport.options)

app.configure(function() {
  app.use(app.router)
  app.use('/', express.static(__dirname + '/public'))
})

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/' + 'index.html');
})

app.post('/send-mail', function(req, res) {
  
  // the following can be used to dump the req data structure
  // to see where your data located -- useful for debugging
  // console.log(sys.inspect(req))
  
  console.log("message = " + req.body.message)

  var mailOptions = {
    from: config.email.from,
    to: config.email.to,
    subject: "test message",
    text: req.body.message
  }

  transport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error)
      // res.send('Error sending mail: ' + error)
      res.redirect("/error-page.html")
    } else {
      console.log("Message sent: " + response.message)
      //res.send('Message sent: ' + response.message)
      res.redirect("/message-sent.html")
    }
  })
})

//app.listen(process.env.VMC_APP_PORT || 1377, null)
console.log("listen on port 3030")
app.listen(3030)

