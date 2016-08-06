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
var app = express();
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use("/",serveIndex("public"));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/sendDataToBackend', function(req,res){
	console.log("In the backend");
	//console.log(res);
	console.log(req._parsedOriginalUrl.query);
	//console.log(res);
	//console.log("Backend: "+JSON.stringify(req.body));
})
/*
app.post('/sendDataToBackend', function(req,res){
	console.log("In the backend");
	console.log("Backend: "+JSON.stringify(req.body));
})
*/

console.log("Finished serving");


app.listen(3000);