//Application Logic
$(function () {
    var coordinates,
        resizeTrigger,
        resizeTriggerInMilliSec,
        dragStartPos,
        dragEndPos,
        mapOptions,
        statCount;


    coordinates = [];
    coordinates["hsr"] = [];
    coordinates["hsr"]["lat"] = 47.2232599;
    coordinates["hsr"]["long"] = 8.8165714;
    mapOptions = {
        center           : new google.maps.LatLng(coordinates["hsr"]["lat"], coordinates["hsr"]["long"]),
        zoom             : 15,
        mapTypeId        : google.maps.MapTypeId.ROADMAP,
        maxZoom          : 18,
        minZoom          : 14,
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
            },
            {
                "featureType": "poi",
                "stylers"    : [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "transit",
                "stylers"    : [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels"
            }
        ]
    };


    //Map Initializing
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);


    google.maps.event.addListenerOnce(map, "idle", function () {
        var ne,
            center,
            mapRadius;
        ne = map.getBounds().getNorthEast();
        center = map.getCenter();
        mapRadius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(ne, center));
        console.log("Map Initialized. Radius: " + mapRadius + " meters");
        $.loadLoot(center.lat(), center.lng(), mapRadius);
    });


    resizeTriggerInMilliSec = 500;
    //Map Resizing
    google.maps.event.addDomListener(window, "resize", function () {
        clearTimeout(resizeTrigger);
        resizeTrigger = setTimeout(function () {
            var ne,
                center,
                mapRadius;
            ne = map.getBounds().getNorthEast();
            center = map.getCenter();
            mapRadius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(ne, center));
            console.log("Map Viewport changed. Radius: " + mapRadius + " meters");
            $.loadLoot(center.lat(), center.lng(), mapRadius);
        }, resizeTriggerInMilliSec);


    });


    //Initialize DragPosition
    dragStartPos = map.getCenter();
    dragEndPos = map.getCenter();
    google.maps.event.addListener(map, "dragstart", function (event) {
        dragStartPos = map.getCenter();
    });
    //Map Dragging
    google.maps.event.addListener(map, "dragend", function (event) {
        var ne,
            mapRadius,
            dragDistance;
        dragEndPos = map.getCenter();
        dragDistance = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(dragStartPos, dragEndPos));
        ne = map.getBounds().getNorthEast();
        mapRadius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(ne, dragEndPos));
        console.log("Map dragged. Distance: " + dragDistance + " meters, Radius: " + mapRadius + " meters");
        $.loadLoot(dragEndPos.lat(), dragEndPos.lng(), mapRadius);
    });


    //Map Zooming
    google.maps.event.addListener(map, "zoom_changed", function (event) {
        var ne,
            mapRadius,
            center;
        ne = map.getBounds().getNorthEast();
        center = map.getCenter();
        mapRadius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(ne, center));
        console.log("Map Zoom changed. Radius: " + mapRadius + " meters");
        $.loadLoot(center.lat(), center.lng(), mapRadius);
    });


    //Load Statistiks aka. "Top10"
    statCount = 10;
    $.loadStatistics(statCount);

    $("#inputRegister").click($.register);

    //Deactivated for Performance Concern
    //$(".nav li a[href^='#']").click(function (e) {
    //    $.smoothScroll(this);
    //});


});