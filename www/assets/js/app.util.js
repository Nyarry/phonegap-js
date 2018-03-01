class Util {
	eventHandler(func, ...args) {
		return function() {
			func(args);
		}
	}

	inArray(array, value) {
		return $.inArray(value, array) != -1;
	}

	randomItemFromArray(array) {
		var item = array[Math.floor(Math.random() * array.length)];
		return item
	}

	kelvinToCelcius(temperature) {
		return (temperature - 273.15)
	}
}
