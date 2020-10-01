//gives statistics about Covid patient and their country data using COVID API from rapidapi.com 

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
	var death_string = lodash.map(res.body, (item) => (item["Total Deaths_text"]));//get death column
	var deaths = [];
	death_string.pop();
	death_string.shift();
	death_string.every(e => (deaths.push(Number(e.replace(/,/g, '')))))//remove , from number

	const result=new Promise(function(resolve,reject)
		{	if(deaths)
			resolve(deaths)//showing death column
			else
				reject(new Error("death count cannot be fowned"))
		});
	result.then(function(done){console.log(deaths);}).catch(function(error){});
	//console.log(deaths);

	var max = Math.max.apply(null, deaths);
	var maxcountryindex =deaths.indexOf(max)+1;
	console.log("Max Death Country: "+res.body[maxcountryindex]["Country_text"]);
	console.log("Max Deaths: "+max);

	var min = Math.min.apply(null, deaths);
	var mincountryindex =deaths.indexOf(min)+1;
	console.log("Min Deaths Country: "+res.body[mincountryindex]["Country_text"]);
	console.log("Min Deaths: "+min);



	var recover_string = lodash.map(res.body, (item) => (item["Total Recovered_text"]));
	var recover_without_NAN=[];
	recover_string.pop();
	recover_string.shift();
	recover_string.every(e => (recover_without_NAN.push((e.replace("N/A","0"))))) //replace null with 0
	var recover = [];
	recover_without_NAN.every(f => (recover.push(Number(f.replace(/,/g, '')))))//remove , from number
	//console.log(recover);
	var rmax = Math.max.apply(null, recover);
	var rmaxcountryindex =recover.indexOf(rmax)+1;
	console.log("Max Recoverd Case Country: "+res.body[rmaxcountryindex]["Country_text"]);
	console.log("Max Recoverd Cases Number: "+rmax);

	var rmin = Math.min.apply(null, recover);
	var rmincountryindex =recover.indexOf(rmin)+1;
	console.log("Min Recoverd Case Country:"+res.body[rmincountryindex]["Country_text"]);
	console.log("Min Recoverd Case Number: "+rmin);

 	recover_string = lodash.map(res.body, (item) => (item["Active Cases_text"]));
	recover_without_NAN=[];
	recover_string.pop();
	recover_string.shift();
	recover_string.every(e => (recover_without_NAN.push((e.replace("N/A","0")))))
	recover = [];
	
	recover_without_NAN.every(f => (recover.push(Number(f.replace(/,/g, '')))))
	rmax = Math.max.apply(null, recover);
	rmaxcountryindex =recover.indexOf(rmax)+1;
	
	console.log("Max Active Case Country: "+res.body[rmaxcountryindex]["Country_text"]);
	console.log("Max Active Case Number: "+rmax);

	rmin = Math.min.apply(null, recover);
	rmincountryindex =recover.indexOf(rmin)+1;
	console.log("Min Active Case Country: "+res.body[rmincountryindex]["Country_text"]);
	console.log("Min Active Cases Number: "+rmin);

	req.end(); 
	
});
 
