var html = document.querySelector("html");
var body = document.querySelector("body");

// Home page masonry layout
if (body.classList.contains("home-page")) {
	var colc = new Colcade(".featured-grid-wrapper", {
		columns: ".featured-grid-column",
		items: ".featured-grid-item"
	});
}

// Publications filtering
if (body.classList.contains("publications-page")) {
	var filter_buttons = document.querySelectorAll(".filter-button");
	var publications_list = document.querySelector(".publications-list");

	filter_buttons.forEach(function(filter_button) {
		filter_button.addEventListener("click", function(elem) {
			var target = elem.currentTarget;

			target.classList.toggle("is-filtering");

			var filter = target.dataset.filter;
			publications_list.classList.toggle("show-" + filter + "-pub");
		});
	});
}
