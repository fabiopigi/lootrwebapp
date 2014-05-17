//Data Layer
(function ($) {


	serverBase = "/api/v1/";


	//GET ENTRIES
	$.getLoots = function (lat, long, dist, cbSuccess, cbFailure) {
		$.ajax({
			url     : serverBase + "loots/latitude/{0}/longitude/{1}/distance/{2}".f(lat, long, dist),
			dataType: "json",
			success : function (data) {
				cbSuccess(data);

			},
			error   : function (jqXHR, textStatus, errorThrown) {
				console.error("failed to fetch Entries");
				cbFailure(errorThrown);
			}
		});
	};

	//POST REGISTER
	$.postRegister = function (data, cbSuccess, cbFailure) {
		$.ajax({
			url        : serverBase + "users",
			type       : 'POST',
			data       : JSON.stringify(data),
			contentType: 'application/json; charset=UTF-8',
			//dataType: 'json',
			processData: false,
			success    : function (data) {
				cbSuccess(data);

			},
			error      : function (jqXHR, textStatus, errorThrown) {
				console.error("failed to send Register");
				cbFailure(errorThrown);
			}
		});
	};



	//GET STATISTICS
	$.getStatistics = function (count, cbSuccess, cbFailure) {
		$.ajax({
			url     : serverBase + "statistics/count/{0}".f(count),
			dataType: "json",
			success : function (data) {
				cbSuccess(data);

			},
			error   : function (jqXHR, textStatus, errorThrown) {
				console.error("failed to fetch Statistics");
				cbFailure(errorThrown);
			}
		});
	};


})(jQuery);