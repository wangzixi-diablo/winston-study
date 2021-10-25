// @ts-nocheck
var express = require('express');
var app = express();
var DEFAULTPORT = 3003;
var port = process.env.PORT || DEFAULTPORT;

var args = process.argv.slice(2);
if( args.length != 1){
	console.log("USAGE: yarn start 100(number of logs to be output");
	return;
}

const NUMBER = args[0];

var winstonTest = require("./winstonTest");
const expressWinston = require('express-winston');
const winston = require('winston');

function switchOnExpressWinston(){
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "Jerry Log HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  }));
}

// switchOnExpressWinston();

function testviaNormalLog(){
  console.time('normal');
  for( var i = 0; i < NUMBER; i++){
    console.log("Info: " , i);
  }
  console.timeEnd('normal');
}

function testviaWinstonLog(){
  console.time('winston');
  for( var i = 0; i < NUMBER; i++){
    winstonTest.info(i);
  }
  console.timeEnd('winston');
}

app.get('/', function(_req, res){
   res.send("Hello world");
   
   testviaWinstonLog();
   testviaNormalLog();
   
});

app.listen(port, function(){
     console.log("App listens on port: " + port);
});