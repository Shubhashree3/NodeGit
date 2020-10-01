//5 day forecast is available at any location or city. It includes weather data every 3 hours. 
var unirest = require("unirest");
const prompt = require('prompt-sync')();
const name = prompt('Country or city?');
console.log(`Fetching Data For Country: ${name}`);
const lat = prompt('Latitude?');
//console.log(`Fetching Data For Country: ${lat}`);
const lon = prompt('Longitude?');
//console.log(`Fetching Data For Country: ${lon}`);

var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/forecast");
const args = process.argv.slice(2);

req.query({
	"q": name,
	"lat": lat,
	"lon": lon
});

req.headers({
	"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
	"x-rapidapi-key": "6b65ce9fe8msh121b36d34bdd5efp1ceb7bjsn37c8d7306a5f",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
	console.log((res.body.list));
});
