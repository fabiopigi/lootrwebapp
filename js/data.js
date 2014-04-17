//Data Layer
$(function() {
	serverBase = "/api/v1/";
	//GET ENTRIES
	$.getLoots = function (lat,long,dist,cbSuccess, cbFailure) {
		$.ajax({
			url: serverBase + "loots/latitude/{0}/longitude/{1}/distance/{2}".f(lat,long,dist),
			dataType: "json",
			success: function(data) {
				cbSuccess(data);

			},
			error: function(jqXHR, textStatus,errorThrown) {
				console.error("failed to fetch Entries");
				cbFailure(errorThrown);
			}
		});
	};


});