//add,detele,show,retrive data of football team
var express = require('express');
var app = express();
var fs = require("fs");
var fname=__dirname + "/" + "foot.csv";

//showing all data of football team
app.get('/listfoot', function (req, res) {
   fs.readFile(fname, 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

//adding new data
app.get('/addfoot', function (req, res) {
fs.readFile(fname, 'UTF-8', function(err, csv) {
   data=csv.split(/\r?\n/);
   data.push(req.query.id+","+req.query.date+","+req.query.team1+","+req.query.score+","+req.query.team2);
   console.log(data);
   res.end(JSON.stringify(data));
  });
})  

//showing data where home team lost given by id
app.post('/showfoot/:id', function (req, res) {
fs.readFile(fname, 'UTF-8', function(err, csv) {
   data=csv.split(/\r?\n/);
   for(var i=0;i<data.length;i++)
   {
      dataline=data[i].split(",");
      for(var j=1;j<dataline.length;j++)
      {
        word= dataline[3].split("-"); } 
         if(Number(word[0])<Number(word[1]) && dataline[0]==req.params.id)
            { 
               console.log(dataline[2]);
               res.write(JSON.stringify(dataline[2]));
            }  
      }                  
    res.end();
  });
})

//deleting data of team given by id
app.delete('/deletefoot/:id', function (req, res) {
fs.readFile(fname, 'utf8', function (err, csv) {
      var data=csv.split(/\r?\n/);
      for(var i=0;i<data.length;i++)
      {
         dataline=data[i].split(",");
         for(var j=1;j<dataline.length;j++)
         {
            word= dataline[3].split("-");
            if(dataline[0]==req.params.id)
            {
              delete data[i];
            }
         }        
      } 
        console.log(data);
        res.write(JSON.stringify(data));        
    res.end();
   });
})

var server = app.listen(1585, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
