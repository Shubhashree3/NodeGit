//search data by cityname
var unirest = require("unirest");

const prompt = require('prompt-sync')();
const name = prompt('Country or City name?');
console.log(`You Choose ${name}`);

var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/find");

req.query({
	
	"type": "link%2C accurate",
	
	"units": "imperial%2C metric",
	"q": name
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
