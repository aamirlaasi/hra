// JavaScript function that wraps everything
$(document).ready(function() {
	$("#add-btn").on("click", function(event) {
		event.preventDefault();
		var newReservation = {
			name: $("#reserve_name").val().trim(),
			phone: $("#reserve_phone").val().trim(),
			email: $("#reserve_email").val().trim(),
			id: $("#reserve_id").val().trim()
		}

		$.post("/api/tables", newReservation)
		.done(function(data) {
			console.log(data);
			alert("Adding reservation " + newReservation.name);
		});
	});
}