// The port the server will use.
// Set this to usable port number to run the example.
var port;


var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, "173.230.154.161");
console.log('Server running at http://173.230.154.161:'+port+'/');
