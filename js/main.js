$(function() {
	console.log( "ready!" );

	loots = eval([
		{
			"accuracy": 25,
			"creator": {
				"username": "Migiman"
			},
			"dateCreated": "2014-03-17T00:21:21.447",
			"dateUpdated": "2014-03-17T00:21:21.447",
			"description": "This Loot is fu****g awesome!",
			"id": 42,
			"latitude": 47.2232599,
			"longitude": 8.8165714,
			"title": "Awesome Loot"
		},
		{
			"accuracy": 25,
			"creator": {
				"username": "Migiman"
			},
			"dateCreated": "2014-03-17T00:21:21.447",
			"dateUpdated": "2014-03-17T00:21:21.447",
			"description": "Funny Pics of cat doing the FAIL",
			"id": 42,
			"latitude": 47.2232599,
			"longitude": 8.8165714,
			"title": "Cat Fails"
		},
		{
			"accuracy": 25,
			"creator": {
				"username": "Migiman"
			},
			"dateCreated": "2014-03-17T00:21:21.447",
			"dateUpdated": "2014-03-17T00:21:21.447",
			"description": "Best Recipes for Students",
			"id": 42,
			"latitude": 47.2232599,
			"longitude": 8.8165714,
			"title": "Student Dinner Tips"
		},
		{
			"accuracy": 25,
			"creator": {
				"username": "Migiman"
			},
			"dateCreated": "2014-03-17T00:21:21.447",
			"dateUpdated": "2014-03-17T00:21:21.447",
			"description": "Teacher doing what's they're best at.",
			"id": 42,
			"latitude": 47.2232599,
			"longitude": 8.8165714,
			"title": "Funny Teachers"
		}
	]);

	apiKey = "AIzaSyBRsrbsSevkBfBcJ4iugIGsvLYIbP80bAs";

	var mapOptions = {
		center: new google.maps.LatLng(47.2232599, 8.8165714),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		maxZoom: 18,
		minZoom: 14,
		scrollwheel: false,
		streetViewControl: false,
		scaleControl: true,
		panControl: false,

	};
	map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
	marker = new google.maps.MarkerImage("img/MapsMarker.png", null, null, null, new google.maps.Size(21,30));


	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});







	$.addLoot = function(loot){
		rLat =Math.random() * (0.005);
		rLong =Math.random() * (0.005);

		var lootMarker = new google.maps.Marker({
			position: new google.maps.LatLng(loot.latitude + rLat, loot.longitude+rLong),
			map: map,
			title: loot.title,
			icon: marker
		});

		var infowindow = new google.maps.InfoWindow({
			content: "<div style='font-weight:bold'>"+loot.title+"</div> <div>"+loot.description+"</div>"
		});


		google.maps.event.addListener(lootMarker, 'click', function() {
			infowindow.open(map,lootMarker);
		});
	}

	for (var i in loots){

		$.addLoot(loots[i]);


	}

});


