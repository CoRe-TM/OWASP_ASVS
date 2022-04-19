var fs = require('fs')
var readFileSync = fs.readFileSync


var f = JSON.parse(readFileSync('flat.json', 'utf8'))
console.log(f.requirements.length)

var request = require('request')


for (var req of f.requirements) {
  console.log(req)
  var headers = {
      'Content-Type': 'application/json'
  };

  var options = {
      url: 'http://172.19.0.2:9200/asvs/_doc?pretty',
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req)
  };

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body);
      }
  }

  request(options, callback);
}

