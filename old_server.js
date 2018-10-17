// Setup web server and socket
var request = require('request')
var express = require('express')
var app = express()
var http = require('http')
var server = http.createServer(app)
var io = require('socket.io').listen(server)
var path = require('path')

// var client_id = process.env.CLIENTID;

// var url = 'https://frost.met.no/observations/v0.jsonld?referencetime=1945-01-01/1950-01-01&elements=mean(air_temperature P1M)&sources=SN8240,SN7650';

// var api_options = {
//   url:  'https://frost.met.no/observations/v0.jsonld',//url,
//   qs: {'sources': 'SN90450',
//        'elements': 'best_estimate_mean(air_temperature P1Y)',
//        'referencetime': '1921-01-01/2018-12-31'},
//   auth: {
//     'user': '',//client_id,
//     'pass': '',
//   }
// };

// Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081)

// Setup rotuing for app
app.use(express.static(path.join(__dirname, '/public')))

// Create web sockets connection.
io.sockets.on('connection', function (socket) {
  socket.on('go_get', function (apiOptions) {
    apiOptions.auth.user = process.env.CLIENTID

    function callback (error, response, body) {
      if (!error && response.statusCode === 200) {
        var info = JSON.parse(body)
        var data = info['data']
        socket.broadcast.emit('frost_rest', data)
        socket.emit('frost_rest', data)
      }
    };

    request(apiOptions, callback)
  })

  // Emits signal to the client telling them that the
  // they are connected and can start receiving Tweets
  socket.emit('connected')
})
