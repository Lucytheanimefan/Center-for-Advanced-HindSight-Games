var file = require('file-system');
var fs = require('fs');
var connect = require('connect');
var Router       = require('router');
var finalhandler = require('finalhandler')
//var Twitter = require('twitter');
var serveStatic = require('serve-static');
var http = require('http');
var serveIndex = require('serve-index');
var path = require('path');

var express = require('express')
var app = express()

console.log("What's going on?");
app.use("/",serveIndex("public"));


app.use(express.static(path.join(__dirname, 'public')));
console.log("Finished serving");

/*
connect().use(serveStatic('./public')).listen(8080, function() {
    console.log('Server running on 8080...');
});


var router = Router();


router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Hello World!');
})
 
var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
})
 
server.listen(3000);

*/

app.listen(3000);