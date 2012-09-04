var express = require('express')
var fs = require('fs')

var app = express()

app.configure(function() {
  app.use(app.router)
  app.use('/', express.static(__dirname + '/public'))
})

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {
    res.send(text)
  })
})

//app.listen(process.env.VMC_APP_PORT || 1377, null)
app.listen(3030)

