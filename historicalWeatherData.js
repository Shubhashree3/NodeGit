//To get access to historical weather data for the 5 previous days use lattitude longitude date
var unirest = require("unirest");

const prompt = require('prompt-sync')();
const lat = prompt('Lattitude?');
console.log(`Your Lattitude is  ${lat}`);

const lon = prompt('Longitude?');
console.log(`Your Longitute is ${lon}`);

const date = prompt('Date?');
console.log(`Your Date is ${date}`);

var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/onecall/timemachine");

req.query({
	"lat": lat,
	"lon": lon,
	"dt": Math.round(new Date(date).getTime()/1000)
});

req.headers({
	"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
	"x-rapidapi-key": "6b65ce9fe8msh121b36d34bdd5efp1ceb7bjsn37c8d7306a5f",
	"useQueryString": true
});


req.end(function (res) {
	
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
