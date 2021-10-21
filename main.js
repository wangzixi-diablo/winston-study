// @ts-nocheck
var express = require('express');
var app = express();
var DEFAULTPORT = 3003;
var port = process.env.PORT || DEFAULTPORT;
var winstonTest = require("./winstonTest");

app.get('/', function(_req, res){
   res.send("Hello world");
   winstonTest.info('I am info');
   winstonTest.error('I am error');
});

app.listen(port, function(){
     console.log("App listens on port: " + port);
});