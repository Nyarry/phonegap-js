var app = {
	storage: {},
	events: {},
	display: {}
}

app.storage.setItem = function(key, value) {
	window.localStorage.setItem(key, value);
}

app.storage.getItem = function(key) {
	return window.localStorage.getItem(key);
}

app.storage.getKeyFromIndex = function(index) {
	return window.localStorage.key(index);
}

app.storage.getItemFromIndex = function(index) {
	var key = app.storage.getKeyFromIndex(index);
	var value = app.storage.getItem(key);

	return {key, value}
}

app.events.onDeviceReady = function() {
	console.log("app.events.onDeviceReady");
	app.display.update();
}

app.events.onPause = function() {
	console.log("app.events.onPause");
	app.display.update();
}

app.events.onResume = function() {
	console.log("app.events.onResume");
	app.updateDisplay();
}

app.display.update = function() {
	console.log("app.display.update");
}

window.onload = function() {
	document.addEventListener("deviceready", app.events.onDeviceReady, false);
	document.addEventListener("resume", app.events.onResume, false);
	document.addEventListener("pause", app.events.onPause, false);

	app.events.onDeviceReady();
}
