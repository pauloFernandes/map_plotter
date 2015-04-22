var map     = {};
var home = new google.maps.LatLng(-19.9513211,-43.9214686,17);
var initialize = function() {
  var mapProp = {
    center: home,
    zoom:10,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
};

google.maps.event.addDomListener(window, 'load', initialize);

var createPosition = function(lat, lng) {
  return position = new google.maps.LatLng(lat,lng);
};

var createMarker = function(lat, lng) {
  return new google.maps.Marker({
    position: createPosition(lat, lng)
  });
};

var addMarkerToMap = function(lat, lng) {
  return createMarker(lat, lng).setMap(map);
};

var addBoundingBox = function(positions) {
  var boundingBox = new google.maps.Polygon({
    path:positions,
    strokeColor:"#0000FF",
    strokeOpacity:0.8,
    strokeWeight:2,
    fillColor:"#0000FF",
    fillOpacity:0.4
  });

  boundingBox.setMap(map);
};