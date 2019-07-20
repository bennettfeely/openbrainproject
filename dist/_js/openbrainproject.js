// Publications filtering

var html = document.querySelector("html");

var filter_buttons = ["stroke-filter", "brain-tumor-filter", "tbi-filter"];
var filters = [
	"show-stroke-filter",
	"show-brain-tumor-filter",
	"show-tbi-filter"
];

filter_buttons.forEach(function(filter) {
	document.querySelector("." + filter).addEventListener("click", function() {
		console.log("clicked");

		if (html.classList.contains("show-" + filter)) {
			// Clear any filters
			html.classList.remove(...filters);

			// Iterate through filter buttons and clear is-filtering class
			filter_buttons.forEach(function(filter_button) {
				document
					.querySelector("." + filter_button)
					.classList.remove("is-filtering");
			});
		} else {
			// Clear any filters
			html.classList.remove(...filters);

			// Add filter of clicked button
			html.classList.add("show-" + filter);

			// Iterate through filter buttons and clear is-filtering class
			filter_buttons.forEach(function(filter_button) {
				document
					.querySelector("." + filter_button)
					.classList.remove("is-filtering");
			});

			// Add is-filtering class to current filtering button
			this.classList.add("is-filtering");
		}
	});
});
