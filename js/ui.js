//View Controller
$(function () {


    $.loadLoot = function (lat, long, dist) {
        $.getLoots(lat, long, dist, function (data) {
                //for (var key in data["loots"]) {
                $.each(data["loots"], function (i, loot) {
                    if (loots[loot["id"]] === undefined) {
                        loots[loot["id"]] = loot;
                        console.log("New Loot with ID: " + loot["id"] + " loaded.");
                        $.addLootPin(loot);
                    }
                });
            },
            function () {
                alert("Oops, something went terribly wrong. Have a coffee while we fix our code.");
            });

    };

    // google.maps.Size() definiert als @1x Dimension von MapsMarker@2x.png
    var marker = new google.maps.MarkerImage("img/MapsMarker@2x.png", null, null, null, new google.maps.Size(21, 30));

    $.addLootPin = function (loot) {
        console.log(loot);
        var lootMarker,
            infoWindow,
            toolTipTimeoutinMilliSec;

        lootMarker = new google.maps.Marker({
            position: new google.maps.LatLng(loot.coordinate.latitude, loot.coordinate.longitude),
            map     : map,
            title   : loot.title,
            icon    : marker
        });

        infoWindow = new google.maps.InfoWindow({
            content: "<div style=\"font-weight:bold\">" + loot.title + "</div> <div>" + loot.summary + "</div>"
        });

        toolTipTimeoutinMilliSec = 5000;
        google.maps.event.addListener(lootMarker, "click", function () {
            infoWindow.open(map, lootMarker);
            setTimeout(function () {
                infoWindow.close(map, lootMarker);
            }, toolTipTimeoutinMilliSec);
        });
    };


    $.loadStatistics = function (count) {
        $.getStatistics(count, function (data) {
            $.fillStatisticsCard("topcontents", "Top Loots (by contents)", data.toplists.topcontents);
            $.fillStatisticsCard("topviews", "Top Loots (by visits)", data.toplists.topviews);
            $.fillStatisticsCard("topcities", "Top Cities (by loots)", data.toplists.topcities);
        }, function () {
            alert("Oops, something went terribly wrong. Have a coffee while we fix our code.");
        });
    };

    $.fillStatisticsCard = function (id, desc, data) {
        var div;
        div = $("<div/>").addClass("list-group");
        $("<li/>").
            addClass("list-group-item list-group-item-info").
            html("<strong>{0}</strong>".f(desc)).
            appendTo(div);

        $.each(data, function (i, entry) {
            var coordinate,
                lootLoadRadiusInMeter;
            coordinate = new google.maps.LatLng(entry.latitude, entry.longitude);
            $("<a/>").
                addClass("list-group-item").
                attr('href', '#map').
                html("{0}<span class=\"badge\">{1}</span>".f(entry.title, entry.counter)).
                click(function (e) {
                    map.panTo(coordinate);
                    lootLoadRadiusInMeter = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(map.getBounds().getNorthEast(), map.getCenter()));
                    //$.smoothScroll(this); //deactivated, performance concerns
                    $.loadLoot(entry.latitude, entry.longitude, lootLoadRadiusInMeter);

                }).
                appendTo(div);


        });

        div.appendTo("." + id);
    };


    //http://stackoverflow.com/questions/14804941/how-to-add-smooth-scrolling-to-bootstraps-scroll-spy-function
    $.smoothScroll = function (e) {
        var hash = e.hash,
            durationInMilliSec = 300;
        $("html, body").animate({
            scrollTop: $(e.hash).offset().top
        }, durationInMilliSec, function () {
            window.location.hash = hash;
        });

    };

});