//search covid data by country name
var unirest = require("unirest");
const prompt = require('prompt-sync')();
const name = prompt('Country?');
console.log(`Fetching Data For Country: ${name}`);


var req = unirest("GET", `https://covid-19-tracking.p.rapidapi.com/v1/`+name);

req.headers({
	"x-rapidapi-host": "covid-19-tracking.p.rapidapi.com",
	"x-rapidapi-key": "1ad6a050bcmsheec1f0b3c589e42p106fdajsnff98d14beb72",
	"useQueryString": true
});


req.end(function (res) {

	if (res.error) throw new Error(res.error);
	
	console.log(res.body);
});
