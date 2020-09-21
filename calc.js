var http = require("http");
var express = require('express');
var fs=require('fs');
var app = express();

 app.use(express.static('assets'));
// Running Server Details.
var server = app.listen(1585, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 

app.get('/calc', function (req, response) {
 
  fs.readFile('calc.html', null, function (error, data)
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
 
      app.get('/add', (req, res) => {
          var a = Number(req.query.one);
          var b = Number(req.query.two);
          var result = a+b;
          res.write("Answer is " + result);
          res.end();
});
          app.get('/sub', (req, res) => {
          var a = Number(req.query.one);
          var b = Number(req.query.two);
          var result = a-b;
          res.write("Answer is " + result);
          res.end();
});
          app.get('/mul', (req, res) => {
          var a = Number(req.query.one);
          var b = Number(req.query.two);
          var result = a*b;
          res.write("Answer is " + result);
          res.end();
});
          app.get('/div', (req, res) => {
          var a = Number(req.query.one);
          var b = Number(req.query.two);
          var result = a/b;
          res.write("Answer is " + result);
          res.end();
});
          app.get('/mod', (req, res) => {
          var a = Number(req.query.one);
          var b = Number(req.query.two);
          var result = a%b;
          res.write("Answer is " + result);
          res.end();
});
         