$(function() {


	$.loadLoot = function(lat,long,dist){
		$.getLoots(lat,long,dist,function(data){
				count = 0;
				countAdd = 0;
				for (var key in data['loots']) {
					count++;
					if(loots[data['loots'][key]['id']] == undefined){
						countAdd++;
						loots[data['loots'][key]['id']] = data['loots'][key];
						console.log("New Loot with ID: "+data['loots'][key]['id']+" loaded.");
						$.addLoot(data['loots'][key]);
					}
				}
				console.log("Loots fetched: "+count+", added to map: "+countAdd);

			},
			function(){
				alert("Oops, something went terribly wrong. Have a coffee while we fix our code.");
			});

	};


	marker = new google.maps.MarkerImage("img/MapsMarker.png", null, null, null, new google.maps.Size(21, 30));

	$.addLoot = function(loot){
		rLat =Math.random() * (0.005);
		rLong =Math.random() * (0.005);

		var lootMarker = new google.maps.Marker({
			position: new google.maps.LatLng(loot.coordinate.latitude + rLat, loot.coordinate.longitude+rLong),
			map: map,
			title: loot.title,
			icon: marker
		});

		var infowindow = new google.maps.InfoWindow({
			content: "<div style='font-weight:bold'>"+loot.title+"</div> <div>"+loot.summary+"</div>"
		});


		google.maps.event.addListener(lootMarker, 'click', function() {
			infowindow.open(map,lootMarker);
			setTimeout(function() {
				infowindow.close(map,lootMarker);
			}, 5000);
		});
	}





});