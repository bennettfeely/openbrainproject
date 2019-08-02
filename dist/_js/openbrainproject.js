var html = document.querySelector("html");
var body = document.querySelector("body");

// Redirect brain survey people to openbrainproject
// This sucks so much fix this soon
if (window.location.hostname == "brainsurvey.org") {
	window.location.href = "https://www.openbrainproject.org/brainsurvey";
}

// Publications filtering
if (body.classList.contains("publications-page")) {
	var filter_buttons = document.querySelectorAll(".filter-button");
	var publications_list = document.querySelector(".publications-list");

	console.log(filter_buttons);

	filter_buttons.forEach(function(filter_button) {
		// console.log(filter_button.dataset.filter);

		filter_button.addEventListener("click", function(elem) {
			var target = elem.currentTarget;

			console.log(target);

			target.classList.toggle("is-filtering");

			var filter = target.dataset.filter;
			publications_list.classList.toggle("show-" + filter + "-pub");

			console.log(target.dataset.filter);
		});
	});
}
