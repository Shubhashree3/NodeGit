var unirest = require("unirest");

var req = unirest("GET", "https://covid-19-tracking.p.rapidapi.com/v1");

req.headers({
	"x-rapidapi-host": "covid-19-tracking.p.rapidapi.com",
	"x-rapidapi-key": "1ad6a050bcmsheec1f0b3c589e42p106fdajsnff98d14beb72",
	"useQueryString": true
});

var max,amax,rmax;
var min,amin,rmin;
var max_death_country,min_death_country,active_max,active_min,recovered_max,recovered_min;
req.end(function (res) {
	 max=min=amax=amin=rmax=rmin=Number(res.body[1]["Total Deaths_text"].replace(/,/g, ''));
	 
	for(var i=1;i<res.body.length-1;i++)
	{		
	 	 
	 	death=res.body[i]["Total Deaths_text"];
	 	death=Number(death.replace(/,/g, ''));
	 	
	 	
	 	if(max<=death)	
			{
				max=death;
				max_death_country=res.body[i]["Country_text"];
			}

		if(min>=death)
			{
				min=death;
				min_death_country=res.body[i]["Country_text"];
			}
		var recovered=res.body[i]["Total Recovered_text"];
	 	recovered=Number(recovered.replace(/,/g, ''));
		if(rmax<recovered)	
			{
				rmax=recovered;
				recovered_max=res.body[i]["Country_text"];
			}
		if(rmin>=recovered)
			{
				rmin=recovered;
				recovered_min=res.body[i]["Country_text"];
			}

		var active=res.body[i]["Active Cases_text"];
	 	active=Number(active.replace(/,/g, ''));
		if(amax<active)	
			{
				amax=active;
				active_max=res.body[i]["Country_text"];
			}
		if(amin>=active)
			{
				amin=active;
				active_min=res.body[i]["Country_text"];
			}



		if (res.error) throw new Error(res.error);

	 	
	}
	
console.log("Max Number of Deaths== "+max);
console.log("Max Deaths== "+max_death_country);
console.log("Min Number of Deaths== "+min);
console.log("Min Deaths== "+min_death_country);

console.log("Recovered Max Number of Cases== "+rmax);
console.log("Recovered Max Country== "+recovered_max);
console.log("Recovered Min Number of Cases== "+rmin);
console.log("Recovered Min Country== "+recovered_min);

console.log("Active Max Number of Cases== "+amax);
console.log("Active Max Country== "+active_max);
console.log("Active Min Number of Cases== "+amin);
console.log("Active Min Country== "+active_min);


});
