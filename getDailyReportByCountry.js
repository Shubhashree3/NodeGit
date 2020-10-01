var unirest = require("unirest");

const prompt = require('prompt-sync')();
const name = prompt('Country?');
console.log(`Country== ${name}`);

const date = prompt('Date?');
console.log(`Date== ${date}`);

var req = unirest("GET", "https://covid-19-data.p.rapidapi.com/report/country/name");

req.query({
	"date-format": "YYYY-MM-DD",
	"format": "json",
	"date": date,
	"name": name
});

req.headers({
	"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
	"x-rapidapi-key": "1ad6a050bcmsheec1f0b3c589e42p106fdajsnff98d14beb72",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
