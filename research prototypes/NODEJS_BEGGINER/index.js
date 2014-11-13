// Imports required modules for the server
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// Map for request calls to functions within the request handler
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

// Calls the start function within the "server.js" file
server.start(router.route, handle);