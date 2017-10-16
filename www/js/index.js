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
	display: {}
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
	console.log("gg");
}

app.storage.setItem = function(key, value) {
	window.localStorage.setItem(key, value);
}

app.storage.getItem = function(key) {
	return window.localStorage.getItem(key);
}

app.display.updateText = function(text) {
	$("#item").text(text);
}
