// Setup web server and socket
var request = require('request')
var express = require('express')
var app = express()
var http = require('http')
var server = http.createServer(app)
var io = require('socket.io').listen(server)
var path = require('path')

// Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081)

// Setup rotuing for app
app.use(express.static(path.join(__dirname, '/public')))

// Create web sockets connection.
io.sockets.on('connection', function (socket) {
  socket.on('api_request', function (apiOptions) {
    apiOptions.auth.user = process.env.CLIENTID

    function callback (error, response, body) {
      if (!error && response.statusCode === 200) {
        var info = JSON.parse(body)
        var data = info['data']
        // socket.broadcast.emit('frost_rest', data)
        socket.emit('return_data', data)
      } else {
        console.log('Error fetching data from API')
      }
    };
    request(apiOptions, callback)
  })

  // Emits signal to the client telling them that the
  // they are connected and can start receiving Tweets
  socket.emit('connected')
})
