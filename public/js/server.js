// Setup web server and socket
var request = require('request');

// r = request.get(
//         'https://frost.met.no/observations/v0.jsonld',
//         {'sources': 'SN90450',
//         'elements': 'best_estimate_mean(air_temperature P1D)',
//         //'best_estimate_mean(air_temperature P1Y)',
//         'referencetime': '1921-01-01/1930-12-31'},
//         auth=(client_id, '')
//     )

client_id = process.env.CLIENTID;

var url = 'https://frost.met.no/observations/v0.jsonld?referencetime=1945-01-01/1950-01-01&elements=mean(air_temperature P1M)&sources=SN8240,SN7650';

// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });


// request.get(url, {
//   'auth': {
//     'user': client_id,
//     'pass': '',
//   }
// });

var options = {
  url: url,
  auth: {
    'user': client_id,
    'pass': '',
  }
  //headers: {
  //  'User-Agent': 'request'
  //}
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
  }
}

request(options, callback);
