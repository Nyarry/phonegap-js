class Weather {
	constructor() {
		this.APIKey = "c1268fb0b6d92a90db82664c9d72f75d";
	}

	fetchData(location) {
		var data = app.storage.getItem(location);
		var d = new Date();
		var epoch = Math.round(d.getTime() / 1000);

		if (data) {
			data = JSON.parse(data);
		}

		if (data && data.timeFetched > (epoch - 3600)) {
			console.log("app.weather.getData(\"" + location + "\") -> Fetching data from Local Storage");
		} else {
			var calls = app.storage.getItem("APICalls");

			if (calls.numberOfCalls >= 60 && calls.initTime > (epoch - 3600)) {
				$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + this.APIKey, function(data) {
					console.log("app.weather.getData(\"" + location + "\") -> Fetching data from API");

					data.timeFetched = epoch;
					app.storage.setItem(data.name, JSON.stringify(data))

					var previousCalls = app.storage.getItem("APICalls");
					app.storage.setItem("APICalls", {numberOfCalls: Number(previousCalls) + 1});

					if (!calls.initTime) {
						calls.initTime = epoch;
						app.storage.setItem("APICalls", calls);
					}
				});
			}
		}
	}

	getData(location) {
		var data = app.storage.getItem(location);

		if (!data) {
			console.log("app.weather.getData -> Data does not exist. (Use app.weather.fetchData first)");
		}

		return JSON.parse(data);
	}

	getTemperature(location) {
		var data = app.weather.getData(location);
		return app.util.kelvinToCelcius(data.main.temp);
	}

	getAverageTemperature(...args) {
		var celcius = 0;

		for (var i = 1; i < args.length; i++) {
			celcius += app.weather.getTemperature(args[i]);
		}

		return celcius / args.length;
	}

	getRangeEfficiency(celcius) {
		if (celcius >= 37) {
			return 0.72
		} else if (celcius >= 32 && celcius < 37) {
			return 0.83
		} else if (celcius >= 26 && celcius < 32) {
			return 0.93
		} else if (celcius >= 21 && celcius < 26) {
			return 0.96
		} else if (celcius >= 15 && celcius < 21) {
			return 0.97
		} else if (celcius >= 10 && celcius < 15) {
			return 0.93
		} else if (celcius >= 4 && celcius < 10) {
			return 0.86
		} else if (celcius >= -1 && celcius < 4) {
			return 0.82
		} else if (celcius >= -6 && celcius < -1) {
			return 0.75
		} else if (celcius >= -12 && celcius < -6) {
			return 0.70
		} else if (celcius >= -17 && celcius < -12) {
			return 0.65
		} else if (celcius >= -23 && celcius < -17) {
			return 0.58
		} else if (celcius < -23) {
			return 0.52
		}
	}
}
