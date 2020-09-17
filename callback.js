var unirest = require("unirest");
var lodash = require('lodash');
var express=require('express');
var app=express();

var req = unirest("GET", "https://covid-19-tracking.p.rapidapi.com/v1");

req.headers({
	"x-rapidapi-host": "covid-19-tracking.p.rapidapi.com",
	"x-rapidapi-key": "1ad6a050bcmsheec1f0b3c589e42p106fdajsnff98d14beb72",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
	var death_string = lodash.map(res.body, (item) => (item["Total Deaths_text"]));
	var deaths = [];
	death_string.pop();
	death_string.shift();
	death_string.every(e => (deaths.push(Number(e.replace(/,/g, '')))))
	//used promise 
	const result=new Promise(function(resolve,reject)
		{	if(deaths)
			resolve(deaths)
			else
				reject(new Error("death count cannot be fowned"))
		});
	result.then(function(done){console.log(deaths);}).catch(function(error){});
	//console.log(deaths);

	var max = Math.max.apply(null, deaths);
	var maxcountryindex =deaths.indexOf(max)+1;
	console.log(res.body[maxcountryindex]["Country_text"]);
	console.log(max);

	var min = Math.min.apply(null, deaths);
	var mincountryindex =deaths.indexOf(min)+1;
	console.log(res.body[mincountryindex]["Country_text"]);
	console.log(min);



	var recover_string = lodash.map(res.body, (item) => (item["Total Recovered_text"]));
	var recover_without_NAN=[];
	recover_string.pop();
	recover_string.shift();
	recover_string.every(e => (recover_without_NAN.push((e.replace("N/A","0")))))
	var recover = [];
	recover_without_NAN.every(f => (recover.push(Number(f.replace(/,/g, '')))))
	//console.log(recover);
	var rmax = Math.max.apply(null, recover);
	var rmaxcountryindex =recover.indexOf(rmax)+1;
	console.log(res.body[rmaxcountryindex]["Country_text"]);
	console.log(rmax);

	var rmin = Math.min.apply(null, recover);
	var rmincountryindex =recover.indexOf(rmin)+1;
	console.log(res.body[rmincountryindex]["Country_text"]);
	console.log(rmin);

 	recover_string = lodash.map(res.body, (item) => (item["Active Cases_text"]));
	recover_without_NAN=[];
	recover_string.pop();
	recover_string.shift();
	recover_string.every(e => (recover_without_NAN.push((e.replace("N/A","0")))))
	recover = [];
	
	recover_without_NAN.every(f => (recover.push(Number(f.replace(/,/g, '')))))
	rmax = Math.max.apply(null, recover);
	rmaxcountryindex =recover.indexOf(rmax)+1;
	
	console.log(res.body[rmaxcountryindex]["Country_text"]);
	console.log(rmax);

	rmin = Math.min.apply(null, recover);
	rmincountryindex =recover.indexOf(rmin)+1;
	console.log(res.body[rmincountryindex]["Country_text"]);
	console.log(rmin);

	req.end(); 
	
});
 
