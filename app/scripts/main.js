'use strict';

var map = {};
var steps = [];
var minSteps = [];
var home = new google.maps.LatLng(-19.9513211,-43.9214686);
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

var initialize = function() {
  var mapProp = {
    center: home,
    zoom:12,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('googleMap'),mapProp);
};

var createPosition = function(lat, lng) {
  return new google.maps.LatLng(lat,lng);
};

var createMarker = function(lat, lng) {
  return new google.maps.Marker({
    position: createPosition(lat, lng)
  });
};

var addMarkerToMap = function(lat, lng) {
  return createMarker(lat, lng).setMap(map);
};

var addBoundingBox = function(positions, settings) {
  var boundingBox = new google.maps.Polygon({
    path:positions,
    strokeColor: settings.color,
    strokeOpacity:0.8,
    strokeWeight:2,
    fillColor: settings.color,
    fillOpacity:0.4
  });

  boundingBox.setMap(map);
};

var addPolyline = function(positions, settings) {
  var line = new google.maps.Polyline({
    path: positions,
    strokeColor: settings.color,
    strokeOpacity: '0.8',
    strokeWeight: 2
  });

  line.setMap(map);
};

var moveMapToPosition = function(positions) {
  var bounds = new google.maps.LatLngBounds();
  positions.forEach(function(pos) {
    bounds.extend(pos);
  });

  map.fitBounds(bounds);
};

var calcRoute = function(origin, destination, callback) {
  directionsDisplay.setMap(map);
  var request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
      
      steps = result.routes[0].overview_path;

      var legsSteps = result.routes[0].legs[0].steps;
      minSteps = legsSteps.map(function(i) {return i.start_point});
      minSteps.push(legsSteps[legsSteps.length -1].end_point);
      
      callback(steps, minSteps);
    }
  });
};


google.maps.event.addDomListener(window, 'load', initialize);