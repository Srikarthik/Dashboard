/* Copyright (c) 2008 Eksith Rodrigo */

function loadJS(p) {
	$("head").append(
		'<script type="text/javascript" src="'+p+'"><\/script>'
	);
}

loadJS("js/jquery.dimensions.js");
loadJS("js/ui.mouse.js");
loadJS("js/ui.sortable.js");
loadJS("js/ui.sortable.ext.js");
loadJS("js/dashboard.js");