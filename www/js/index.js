var app = {
	counts: {
		paused: 0,
		resumed: 0,
		launched: 0
	},
	storage: {
		data: {
			["Chair"]: "Mahogany",
			["Table"]: "Oak",
			["Shelf"]: "Maple",
			["Wardrobe"]: "Pine",
			["Gazeebo"]: "Vaneer"
		}
	},
	display: {},
	helper: {}
}

document.addEventListener("deviceready", app.onDeviceReady, false);

app.onDeviceReady = function() {
	console.log("onDeviceReady");

	document.addEventListener("resume", app.onResume, false);
	document.addEventListener("pause", app.onPause, false);

	app.counts.launched ++;
	app.updateDisplay();
	app.storage.setupKeys();
}

app.updateDisplay = function() {
	console.log("updateDisplay");
	$("#paused").text("Resumed: " + app.counts.paused);
	$("#resumed").text("Paused: " + app.counts.resumed);
	$("#launched").text("Launched: " + app.counts.launched);
}

app.onPause = function() {
	console.log("onPause");
	app.counts.paused ++;
	app.updateDisplay();
}

app.onResume = function() {
	console.log("onResume");
	app.counts.resumed ++;
	app.updateDisplay();
}

app.storage.setupKeys = function() {
	Object.keys(app.storage.data).forEach(function(key, index) {
		var value = app.storage.data[key]
		app.storage.setItem(key, value);
		console.log("setupKeys: " + key + " -> " + value);
	});
}

app.storage.setItem = function(key, value) {
	window.localStorage.setItem(key, value);
}

app.storage.getKey = function(index) {
	return window.localStorage.key(index);
}

app.storage.getValue = function(key) {
	return window.localStorage.getItem(key);
}

app.storage.getPair = function(index) {
	var key = app.storage.getKey(index);
	var value = app.storage.getValue(key);

	return {key, value}
}

app.display.updateText = function() {
	window.setInterval(function() {
		var index = Math.floor(Math.random() * window.localStorage.length);
		var data = app.storage.getPair(index);

		$("#item").text(data.key);
		$("#typeOfWood").text(data.value);
	}, 1000);
}

window.onload = function() {
	app.onDeviceReady();
	app.display.updateText();
}
