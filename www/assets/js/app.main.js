var app = {}

const DEFAULT_NEGATIVE = 0;
const DEFAULT_NEUTRAL = 1;
const DEFAULT_POSITIVE = 2;
const NEGATIVE_DEFAULT = 3;
const NEGATIVE_NEUTRAL = 5;
const NEGATIVE_POSITIVE = 5;
const NEUTRAL_DEFAULT = 6;
const NEUTRAL_NEGATIVE = 7;
const NEUTRAL_POSITIVE = 8;
const POSITIVE_DEFAULT = 9;
const POSITIVE_NEUTRAL = 10;
const POSITIVE_NEGATIVE = 11;

window.onload = function() {
	app.events = new Events();
	app.util = new Util();
	app.storage = new Storage();
	app.display = new Display();
	app.data = new Data();
	app.weather = new Weather();

	app.events.onDeviceReady();
	app.weather.activateAPIKey();
	app.weather.getForLocation("Bromsgrove");

}
