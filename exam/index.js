var express = require('express'),
config = require('./config/config');    

var app = express();    

require('./config/express')(app, config);

console.log("Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(config.port, function () {   //function creating config port in specific mode
console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

