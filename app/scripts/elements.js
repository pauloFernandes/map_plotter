$("#coordinates").tokenfield({
  delimiter: ';'
});

$("#bounding-box").tokenfield({
  delimiter: ';'
});

$("#add-coordinates").click(function() {
  $("#coordinates").val().split("; ").forEach(function(coordinate) {
    coordinate = coordinate.split(",");
    addMarkerToMap(coordinate[0], coordinate[1]);
  });
});

$("#add-bounding-box").click(function() {
  var coordinates = $("#bounding-box").val().split("; ").map(function(coordinate) {
    coordinate = coordinate.split(",");
    return createPosition(coordinate[0], coordinate[1]);
  });

  coordinates.push(coordinates[0]);
  addBoundingBox(coordinates);
});