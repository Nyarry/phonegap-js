class Weather {
	activateAPIKey() {
		$.get("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=c1268fb0b6d92a90db82664c9d72f75d", function(responseText) {
			console.log(responseText);
		});
	}

	getForLocation(location) {
		$.get("http://api.openweathermap.org/data/2.5/weather?q=" + location, function(responseText) {
			console.log(responseText);
		});
	}
}
