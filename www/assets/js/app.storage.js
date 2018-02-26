class Storage {
	setItem(key, value) {
		window.localStorage.setItem(key, value);
	}

	getItem(key) {
		return window.localStorage.getItem(key);
	}

	getKeyFromIndex(index) {
		return window.localStorage.key(index);
	}

	getItemFromIndex(index) {
		var key = app.storage.getKeyFromIndex(index);
		var value = app.storage.getItem(key);

		return {key, value}
	}
}
