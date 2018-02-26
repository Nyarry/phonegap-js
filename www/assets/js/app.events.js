class Events {
	setupListeners() {
		console.log("app.events.setupListeners");
		document.addEventListener("resume", app.events.onResume, false);
		document.addEventListener("pause", app.events.onPause, false);
		document.addEventListener("online", app.events.onOnline, false);
		document.addEventListener("offline", app.events.onOffline, false);
		$(document).on("click", "#task-add", app.data.createTask);
		$(document).on("click", "#task-generate", app.data.generateTasks)
	}

	setupIntervals() {
		setInterval(function() {
			if (app.data.deletionGrace >= 0) {
				app.data.deletionGrace -= 1;
			}

			if (app.data.deletionGrace == 0) {
				app.display.updateTaskList(app.data.activeTasks);
			}
		}, 100);
	}

	onDeviceReady() {
		console.log("app.events.onDeviceReady");
		app.events.setupListeners();
		app.events.setupIntervals();
		app.display.doJQueryMobileOverrides();
		app.data.fetchTasks();
	}

	onPause() {
		console.log("app.events.onPause");
	}

	onResume() {
		console.log("app.events.onResume");
	}

	onPageShow() {
		console.log("app.events.onPageShow");
	}
}
