$(document).on("ready page:load", function() {
	$(".selectize").selectize({
		create: true,
		plugins: ["remove_button"]
	})
})
