//example of nodejs framwork front and backend
var http = require("http");
var express = require('express');
var fs=require('fs');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
 
// Running Server Details.
var server = app.listen(1585, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 
app.get('/', function (req, response) {
  
  fs.readFile('index.html', null, function (error, data) 
    {
      if (error) 
      {
            response.writeHead(404);
            response.write('Whoops! File not found!');
      }
      else 
      {
            response.write(data);
            response.end();
      }
});});
 
app.post('/thank', urlencodedParser, function (req, res){
  var reply='';
  reply += "Your name is: " + req.body.name+"</br>";
  reply += "Your E-mail id is: " + req.body.email+"</br>"; 
  reply += "Your address is: " + req.body.address+"</br>";
  reply += "Your mobile number is: " + req.body.mobilno+"</br>";
  res.send(reply);

 });