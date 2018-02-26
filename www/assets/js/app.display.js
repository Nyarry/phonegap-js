class Display {
	doJQueryMobileOverrides() {
		$("#task-add").parent().html("");
		$("#task-generate").parent().html("");
		$("h1").each(function() {
			if ($(this).text() == "loading") {
				$(this).text("");
			}
		});
	}

	updateTaskList(tasks) {
		console.log("app.display.updateTaskList");

		$("#task-list").empty();
		for (var i = 0; i < tasks.length; i++) {
			$("#task-list").append("<li><span class=\"task-number\">" + i + "</span><input id=\"title-" + tasks[i].objectId + "\" type=\"text\" value=\"" + tasks[i].task + "\" class=\"task-title\"><i class=\"fa fa-chevron-circle-up update-icon\"></i><input id=\"update-" + tasks[i].objectId + "\" type=\"button\" value=\"\" class=\"task-update button\"><i class=\"fa fa-bomb delete-icon\"></i><input id=\"delete-" + tasks[i].objectId + "\" type=\"button\" value=\"\" class=\"task-delete button-neutral\"></li>");
			$("#update-" + tasks[i].objectId).click(app.util.eventHandler(app.data.updateTask, tasks[i].objectId));
			$("#delete-" + tasks[i].objectId).click(app.util.eventHandler(app.data.deleteTask, tasks[i].objectId));
		}

		$("#task-list").listview("refresh");
	}

	phaseButton(element, type, textToShow, revertAfterDelay) {
		console.log("app.display.phaseButton");

		var wasDisabled = element.prop("disabled");
		var oldText = element.val();
		var oldClass = "button-neutral"
		var newClass = "button-neutral"

		switch(type) {
			case DEFAULT_NEGATIVE:
				oldClass = "button";
				newClass = "button-negative";
				break;
			case DEFAULT_NEUTRAL:
				oldClass = "button";
				newClass = "button-neutral";
				break;
			case DEFAULT_POSITIVE:
				oldClass = "button";
				newClass = "button-positive";
				break;
			case NEGATIVE_DEFAULT:
				oldClass = "button-negative";
				newClass = "button";
				break;
			case NEGATIVE_NEUTRAL:
				oldClass = "button-negative";
				newClass = "button-neutral";
				break;
			case NEGATIVE_POSITIVE:
				oldClass = "button-negative";
				newClass = "button-positive";
				break;
			case NEUTRAL_DEFAULT:
				oldClass = "button-neutral";
				newClass = "button";
				break;
			case NEUTRAL_NEGATIVE:
				oldClass = "button-neutral";
				newClass = "button-negative";
				break;
			case NEUTRAL_POSITIVE:
				oldClass = "button-neutral";
				newClass = "button-positive";
				break;
			case POSITIVE_DEFAULT:
				oldClass = "button-positive";
				newClass = "button-default";
				break;
			case POSITIVE_NEGATIVE:
				oldClass = "button-positive";
				newClass = "button-negative";
				break;
			case POSITIVE_NEUTRAL:
				oldClass = "button-positive";
				newClass = "button-neutral";
				break;
		}

		element.removeClass(oldClass);
		element.addClass(newClass);
		element.attr("disabled", true);
		element.attr("value", textToShow);

		if (revertAfterDelay) {
			window.setTimeout(function() {
				element.removeClass(newClass);
				element.addClass(oldClass);
				element.attr("disabled", wasDisabled);
				element.attr("value", oldText);
			}, 800);
		}
	}
}
