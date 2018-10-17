/* global io */

function getData (apiOptions, plotOptions) {
  if (io !== undefined) {
    // Storage for WebSocket connections
    var socket = io.connect('/')

    socket.on('return_data', function (data) {
      // loop data
      var dataArr = []
      dataArr.sum = 0
      dataArr.max = 0
      dataArr.min = 100
      var i
      for (i = 0; i < data.length; i++) {
        var iso8601 = data[i]['referenceTime']
        var temp = data[i]['observations'][0]['value']
        var parsed = { 'year': iso8601.slice(0, 4),
          'temp': temp }
        dataArr.push(parsed)

        if (temp > dataArr.max) {
          dataArr.max = temp
        }
        if (temp < dataArr.min) {
          dataArr.min = temp
        };

        dataArr.sum += temp
        dataArr.mean = dataArr.sum / (i + 1)
      }
      // move preprocessing to another function here
      plotOptions.plotFunc(dataArr)
    })

    // Listens for a success response from the server to
    // say the connection was successful.
    socket.on('connected', function (r) {
      // Now that we are connected to the server let's tell
      // the server we are ready to start receiving tweets.
      // socket.broadcast.emit("go_get", api_options);
      socket.emit('api_request', apiOptions)
    })
  }
}
