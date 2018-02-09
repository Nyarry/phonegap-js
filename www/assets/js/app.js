Backendless.initApp("8364C802-B6B5-F3C4-FF3E-B48D04222A00","AE8854AA-AFB4-1DB7-FF7A-87AED2E58000");

var app = {
	storage: {},
	events: {},
	display: {},
	debug: {},
	data: {}
}

document.addEventListener("deviceready", app.events.onDeviceReady, false);

app.debug = function(str) {
	console.log(str);
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

app.events.createListeners = function() {
	app.debug("app.events.createListeners");
	document.addEventListener("resume", app.events.onResume, false);
	document.addEventListener("pause", app.events.onPause, false);
	document.addEventListener("online", app.events.onOnline, false);
	document.addEventListener("offline", app.events.onOffline, false);
	$(document).on("click", "#addTaskSubmit", app.data.createTask);
	$(document).on("click", "#deleteTaskSubmit", app.data.deleteTask);
}

app.events.onDeviceReady = function() {
	app.debug("app.events.onDeviceReady");
	app.events.createListeners();
	app.display.doJQueryMobileOverrides();
	app.data.fetchTasks();
}

app.events.onPause = function() {
	app.debug("app.events.onPause");
}

app.events.onResume = function() {
	app.debug("app.events.onResume");
}

app.events.onPageShow = function() {
	app.debug("app.events.onPageShow");
}

app.display.doJQueryMobileOverrides = function() {
	$("#addTaskSubmit").parent().html("");
}

app.display.updateTasks = function(tasks) {
	app.debug("app.display.updateTasks");

	$("#taskList").empty();
	for (var i = 0; i < tasks.length; i++) {
		$("#taskList").append("<li><span class=\"taskNumber\">" + i + "</span><span>" + tasks[i].task + "</span><input id=\"deleteTaskSubmit\" type=\"button\" class=\"button-negative\" data-id=" + tasks[i].objectId + " value=\"X\"></li>");
	}
	$("#taskList").listview("refresh");
}

app.data.createTask = function() {
	app.debug("app.data.createTask");

	var data = {
		task: $("#addTaskInput").val()
	}

	if (data.task != "") {
		var taskStorage = Backendless.Data.of("Tasks");
		taskStorage.save(data).then(saveTasks).catch(app.data.handleError);

		function saveTasks(savedTask) {
			app.debug(savedTask)
			app.data.fetchTasks();

			$("#addTaskInput").attr("value", "");

			$("#addTaskSubmit").removeClass("button-neutral");
			$("#addTaskSubmit").addClass("button-positive");
			$("#addTaskSubmit").attr("disabled", true);
			$("#addTaskSubmit").attr("value", "Successfully added!");

			window.setTimeout(function() {
				$("#addTaskSubmit").removeClass("button-positive");
				$("#addTaskSubmit").addClass("button-neutral");
				$("#addTaskSubmit").attr("disabled", false);
				$("#addTaskSubmit").attr("value", "Add task");
			}, 2000);
		}
	} else {
		$("#addTaskSubmit").removeClass("button-neutral");
		$("#addTaskSubmit").addClass("button-negative");
		$("#addTaskSubmit").attr("disabled", true);
		$("#addTaskSubmit").attr("value", "Enter some text..");

		window.setTimeout(function() {
			$("#addTaskSubmit").removeClass("button-negative");
			$("#addTaskSubmit").addClass("button-neutral");
			$("#addTaskSubmit").attr("disabled", false);
			$("#addTaskSubmit").attr("value", "Add task");
		}, 2000);
	}
}

app.data.fetchTasks = function() {
	app.debug("app.data.fetchTasks");

	var taskStorage = Backendless.Data.of("Tasks");
	var queryBuilder = Backendless.DataQueryBuilder.create();
	queryBuilder.setSortBy(["created desc"]);
	queryBuilder.setPageSize(40);
	taskStorage.find(queryBuilder).then(processResults).catch(app.data.handleError);
	function processResults(tasks) {
		app.display.updateTasks(tasks)
	}
}

app.data.updateTask = function(objectId) {

}

app.data.deleteTask = function() {
	app.debug("app.data.deleteTask");

	var taskStorage = Backendless.Data.of("Tasks");
	taskStorage.remove({objectId: $(this).data("id")}).then(deleteTask).catch(app.data.handleError);
	function deleteTask(task) {
		app.data.fetchTasks();
	}
}

app.data.handleError = function(e) {
	app.debug(e)
}

window.onload = function() {
	app.events.onDeviceReady();
}
