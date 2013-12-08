/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var messageLog = [];
var url = require('url');
var headers = {
  /* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/plain"

};

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var locationArray = request.url.split('/');
  locationArray = locationArray.slice(-2); // this gives [ 'classes', 'messages' ]

  var pathname = url.parse(request.url).pathname;
  console.log(pathname);

  if (locationArray[0] !== "classes" && (locationArray[1] !== "room1" || locationArray[1] !== "messages")) {
     requestMethods['ERROR'](response, response, headers);
  } else {
     requestMethods[request.method](request, response, headers);
  }
};


var requestMethods = {
  GET: function(request, response, headers) {
    response.writeHead(200, headers); //okay
    var responseMessage = JSON.stringify(messageLog);
    console.log("messageLog = ", messageLog, "after json = ", responseMessage);
    response.end(responseMessage);
  },
  POST:  function(request, response, headers) {
    var body = '';
    response.writeHead(201, headers); //created
    request.on('data', function( data) {
      body += data;
      console.log(body);
      messageLog.push(JSON.parse(body));
    });
    response.end();
  },
  ERROR: function(request, response, headers) {
    response.writeHead(404, headers); //ERROR NOT FOUND
    response.end();
  },
  OPTIONS: function (request, response, headers) {
    response.writeHead(200, headers); //OPTIONS
    response.end();
  }
};

exports.handleRequest = handleRequest;

// var error = false
// try {

//   var parsed = json.parse(stuff)
// } catch(e) {
//   error = true
//   //
// }
// if (error) {


// } 

