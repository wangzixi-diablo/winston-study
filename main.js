// @ts-nocheck
var path = require('path'), express = require('express');

var app = express();
var url = require("url");
var DEFAULTPORT = 3003;
var port = process.env.PORT || DEFAULTPORT;

app.get('/', function(req, res){
   res.send("Hello world");
});

app.listen(port, function(){
     console.log("App listens on port: " + port);
});