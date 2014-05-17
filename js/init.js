//Application Logic
$(function () {

	//Array with Loots
	loots = new Array();


	apiKey = "AIzaSyBRsrbsSevkBfBcJ4iugIGsvLYIbP80bAs";

	coordinates = new Array();
	coordinates['hsr'] = new Array();
	coordinates['hsr']['lat'] = 47.2232599;
	coordinates['hsr']['long'] = 8.8165714;
	var mapOptions = {
		center           : new google.maps.LatLng(coordinates['hsr']['lat'],coordinates['hsr']['long']),
		zoom             : 15,
		mapTypeId        : google.maps.MapTypeId.ROADMAP,
		maxZoom          : 18,
		minZoom          : 12, //better 14
		scrollwheel      : false,
		streetViewControl: false,
		scaleControl     : true,
		panControl       : false,
		backgroundColor  : "#dfeff8",
		styles           : [
			{
				"stylers": [
					{ "lightness": 1 },
					{ "hue": "#00a1ff" },
					{ "visibility": "simplified" },
					{ "gamma": 0.8 }
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers"    : [
					{ "visibility": "simplified" },
					{ "lightness": 24 },
					{ "color": "#BBBBBB" }
				]
			}
		]
	};


	//Map Initializing
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);


	google.maps.event.addListenerOnce(map, 'idle', function () {
		ne = map.getBounds().getNorthEast();
		sw = map.getBounds().getSouthWest();
		center = map.getCenter();
		mapRadius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(ne, sw) / 2);
		console.log("Map Initialized. Radius: " + mapRadius + " meters");
		$.loadLoot(center.lat(), center.lng(), mapRadius);
	});


	//Map Resizing
	var resizeTrigger;
	google.maps.event.addDomListener(window, "resize", function () {
		clearTimeout(resizeTrigger);
		resizeTrigger = setTimeout(function () {

			ne = map.getBounds().getNorthEast();
			sw = map.getBounds().getSouthWest();
			center = map.getCenter();
			mapRadius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(ne, sw) / 2);
			console.log("Map Viewport changed. Radius: " + mapRadius + " meters");
			$.loadLoot(center.lat(), center.lng(), mapRadius);
		}, 500);

	});


	//Map Dragging
	dragStartPos = map.getCenter();
	dragEndPos = map.getCenter();
	google.maps.event.addListener(map, 'dragstart', function (event) {
		dragStartPos = map.getCenter();
	});
	google.maps.event.addListener(map, 'dragend', function (event) {
		dragEndPos = map.getCenter();
		dragDistance = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(dragStartPos, dragEndPos));

		ne = map.getBounds().getNorthEast();
		sw = map.getBounds().getSouthWest();
		mapRadius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(ne, sw) / 2);

		console.log("Map dragged. Distance: " + dragDistance + " meters, Radius: " + mapRadius + " meters");
		$.loadLoot(dragEndPos.lat(), dragEndPos.lng(), mapRadius);
	});


	//Map Zooming
	google.maps.event.addListener(map, 'zoom_changed', function (event) {
		ne = map.getBounds().getNorthEast();
		sw = map.getBounds().getSouthWest();
		center = map.getCenter();
		mapRadius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(ne, sw) / 2);
		console.log("Map Zoom changed. Radius: " + mapRadius + " meters");
		$.loadLoot(center.lat(), center.lng(), mapRadius);
	});



	//Load Statistiks aka. "Top10"
	statCount = 10;
	$.loadStatistics(statCount);

	$('#inputRegister').click($.register);

});