/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var messageLog = [];
var defaultCorsHeaders = {
  /* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  switch(request.method) {
    case "GET":
      if (request.url !== "/classes/messages" && (request.url !== "/classes/room1")) {
        response.writeHead(404, headers); //ERROR NOT FOUND
        response.end();
      } else {
        response.writeHead(200, headers); //okay
        var responseMessage = JSON.stringify(messageLog);
        response.end(responseMessage);
      }
      break;
    case "POST":
      var body = '';
      response.writeHead(201, headers); //created
      request.on('data', function( data) {
        body += data;
        messageLog.push(JSON.parse(body));
      });
      response.end();
      break;
  }
};

exports.handleRequest = handleRequest;