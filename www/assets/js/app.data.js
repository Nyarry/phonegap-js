Backendless.initApp("8364C802-B6B5-F3C4-FF3E-B48D04222A00", "AE8854AA-AFB4-1DB7-FF7A-87AED2E58000");

class Data {
	constructor() {
		this.activeTasks = [];
		this.deleteQueue = [];
		this.deletionGrace = 0;
	}

	generateTasks() {
		console.log("app.data.generateTasks");

		var verbs = ["Eat", "Shoot", "Swallow", "Unlock", "Activate", "Smash", "Question", "Discover", "Destroy", "Bang"];
		var determiners = ["a", "the", "every", "this"];
		var adjectives = ["smelly", "great", "big", "small", "hairy", "brown", "strong", "pretty", "handsome", "powerful", "rotten"];
		var nouns = ["cat", "wall", "hammer", "dog", "wallet", "jar of dirt", "bean", "human leg"];

		for (var i = 0; i < 20; i++) {
			var verb = app.util.randomItemFromArray(verbs);
			var determiner = app.util.randomItemFromArray(determiners);
			var adjective = app.util.randomItemFromArray(adjectives);
			var noun = app.util.randomItemFromArray(nouns);
			var title = verb + " " + determiner + " " + adjective + " " + noun + ".";
			var data = {task: title};

			var taskStorage = Backendless.Data.of("Tasks");
			taskStorage.save(data).then(saveTasks).catch(app.data.handleError);
			function saveTasks(savedTask) {
				console.log(savedTask)
			}
		}

		app.display.phaseButton($("#task-generate"), DEFAULT_POSITIVE, "Generating..", true)
		app.data.fetchTasks();
	}

	createTask() {
		console.log("app.data.createTask");

		var data = {task: $("#task-input").val()}

		if (data.task != "") {
			var taskStorage = Backendless.Data.of("Tasks");
			taskStorage.save(data).then(saveTasks).catch(app.data.handleError);

			function saveTasks(savedTask) {
				console.log(savedTask)
				$("#task-input").attr("value", "");
				app.display.phaseButton($("#task-add"), NEUTRAL_POSITIVE, "Successfully added!", true)
				app.data.fetchTasks();
			}
		} else {
			app.display.phaseButton($("#task-add"), NEUTRAL_NEGATIVE, "Enter some text..", true)
		}
	}

	fetchTasks() {
		console.log("app.data.fetchTasks");

		var taskStorage = Backendless.Data.of("Tasks");
		var queryBuilder = Backendless.DataQueryBuilder.create();
		queryBuilder.setSortBy(["created desc"]);
		queryBuilder.setPageSize(100);
		taskStorage.find(queryBuilder).then(processResults).catch(app.data.handleError);
		function processResults(tasks) {
			app.display.updateTaskList(tasks)
			app.data.activeTasks = tasks;
		}
	}

	updateTask(objectId) {
		console.log("app.data.updateTask");

		var shouldContinue = true;
		var data = {
			objectId: objectId[0],
			task: $("#title-" + objectId).val()
		}

		$.each(app.data.deleteQueue, function(index, value) {
			if (objectId[0] == value) {
				shouldContinue = false;
			}
		});

		if (shouldContinue) {
			if (data.task != "") {
				var taskStorage = Backendless.Data.of("Tasks");
				taskStorage.save(data).then(saveTasks).catch(app.data.handleError);
				function saveTasks(savedTask) {
					console.log(savedTask);
					app.display.phaseButton($("#update-" + objectId), DEFAULT_POSITIVE, "", true);
				}
			} else {
				app.display.phaseButton($("#update-" + objectId), DEFAULT_NEGATIVE, "", true);
			}
		}
	}

	deleteTask(objectId) {
		console.log("app.data.deleteTask");
		app.display.phaseButton($("#delete-" + objectId), NEUTRAL_NEGATIVE, "", false);
		app.data.deleteQueue.push(objectId);

		var taskStorage = Backendless.Data.of("Tasks");
		taskStorage.remove({objectId: objectId}).then(deleteTask).catch(app.data.handleError);
		function deleteTask(deletionTime) {
			if (deletionTime) {
				$.each(app.data.activeTasks, function(index, value) {
					if (value) {
						if (value.objectId == objectId[0]) {
							app.data.activeTasks.splice(index, 1);
						}
					}
				});

				app.data.deletionGrace = 6;
			}
		}
	}

	handleError(e) {
		console.log(e)
	}
}
