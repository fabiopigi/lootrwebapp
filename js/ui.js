//View Controller
$(function () {


	$.loadLoot = function (lat, long, dist) {
		$.getLoots(lat, long, dist, function (data) {
				count = 0;
				countAdd = 0;
				for (var key in data['loots']) {
					count++;
					if (loots[data['loots'][key]['id']] == undefined) {
						countAdd++;
						loots[data['loots'][key]['id']] = data['loots'][key];
						console.log("New Loot with ID: " + data['loots'][key]['id'] + " loaded.");
						$.addLootPin(data['loots'][key]);
					}
				}
				console.log("Loots fetched: " + count + ", added to map: " + countAdd);

			},
			function () {
				alert("Oops, something went terribly wrong. Have a coffee while we fix our code.");
			});

	};


	marker = new google.maps.MarkerImage("img/MapsMarker.png", null, null, null, new google.maps.Size(21, 30));

	$.addLootPin = function (loot) {
		console.log(loot);
		var lootMarker = new google.maps.Marker({
			position: new google.maps.LatLng(loot.coordinate.latitude, loot.coordinate.longitude),
			map     : map,
			title   : loot.title,
			icon    : marker
		});

		var infowindow = new google.maps.InfoWindow({
			content: "<div style='font-weight:bold'>" + loot.title + "</div> <div>" + loot.summary + "</div>"
		});

		var toolTipTimeOutinMilliSec = 5000;
		google.maps.event.addListener(lootMarker, 'click', function () {
			infowindow.open(map, lootMarker);
			setTimeout(function () {
				infowindow.close(map, lootMarker);
			}, toolTipTimeOutinMilliSec);
		});
	}


	$.loadStatistics = function(count){
		$.getStatistics(count, function (data) {
			$.fillStatisticsCard("topcontents","Top Loots (by contents)",data.toplists.topcontents);
			$.fillStatisticsCard("topviews","Top Loots (by visits)",data.toplists.topviews);
			$.fillStatisticsCard("topcities","Top Cities (by loots)",data.toplists.topcities);
		}, function(){
			alert("Oops, something went terribly wrong. Have a coffee while we fix our code.");
		});
	};

	$.fillStatisticsCard = function(id,desc,data){
		var div = $("<div/>").addClass("list-group");
		var titleLi = $("<li/>").
			addClass("list-group-item list-group-item-info").
			html("<strong>{0}</strong>".f(desc)).
			appendTo(div);

		$.each(data, function(i,entry){

			var coordinate = new google.maps.LatLng(entry.latitude,entry.longitude);
			var entryLink = $("<a/>").
				addClass("list-group-item").
				html("{0}<span class='badge'>{1}</span>".f(entry.title,entry.counter)).
				click(function(){
					map.panTo(coordinate);
					zoomLevel = 14;
					map.setZoom(zoomLevel);
					lootLoadRadius = 5000;
					$.loadLoot(entry.latitude,entry.longitude,lootLoadRadius);
				}).
				appendTo(div);



		});

		div.appendTo("."+id);
	};



});