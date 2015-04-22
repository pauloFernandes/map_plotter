'use strict';
var availableColors = ['#AA3939', '#2D882D', '#343477', '#AAAA39', '#582A72', '#0C0510'];
var getRandomColor = function() {
  var color = Math.ceil((Math.random() * 99999) % availableColors.length)
  return availableColors[color];
};

var createBoundingBoxElement = function(coordinates, settings) {
  var text = '';
  var strCoordinates = coordinates.reduce(function(prev, next) {
    if (typeof prev != 'string') {
      text += '(' + prev.lat() + ', ' + prev.lng() + ')';
    }

    text += '; (' + next.lat() + ', ' + next.lng() + ')';
    return text;
  });

  var html = '';
  html += '<tr> ';
  html += '  <td>' + strCoordinates + '</td> ';
  html += '  <td> ';
  html += '    <div style="border: 2px solid black; width: 20px; height: 20px; background-color: ' + settings.color + ';"></div> ';
  html += '  </td> ';
  html += '</tr> ';

  $('#bounding-box-info > tbody').append($(html));
};

var createRoutesElement = function(coordinates, settings) {
  var text = '';
  var strCoordinates = coordinates.reduce(function(prev, next) {
    if (typeof prev != 'string') {
      text += '(' + prev.lat() + ', ' + prev.lng() + ')';
    }

    text += '; (' + next.lat() + ', ' + next.lng() + ')';
    return text;
  });

  var html = '';
  html += '<tr> ';
  html += '  <td>' + strCoordinates + '</td> ';
  html += '  <td> ';
  html += '    <div style="border: 2px solid black; width: 20px; height: 20px; background-color: ' + settings.color + ';"></div> ';
  html += '  </td> ';
  html += '  <td>' + coordinates.length + '</td> ';
  html += '</tr> ';

  $('#routes-info > tbody').append($(html));
};

$('#coordinates').tokenfield({
  delimiter: ';'
});

$('#bounding-box').tokenfield({
  delimiter: ';'
});

$('#add-coordinates').click(function() {
  var coordinates = $('#coordinates').val().split('; ').map(function(coordinate) {
    coordinate = coordinate.split(',');
    addMarkerToMap(coordinate[0], coordinate[1]);
    return createPosition(coordinate[0], coordinate[1]);
  });

  var color = getRandomColor();
  addPolyline(coordinates, {color: color});
  moveMapToPosition(coordinates);
  createRoutesElement(coordinates, {color: color});
  $('#coordinates').tokenfield('setTokens', []);
});

$('#add-bounding-box').click(function() {
  var coordinates = $('#bounding-box').val().split('; ').map(function(coordinate) {
    coordinate = coordinate.split(',');
    return createPosition(coordinate[0], coordinate[1]);
  });

  coordinates.push(coordinates[0]);

  var color = getRandomColor();
  addBoundingBox(coordinates, {color: color});
  moveMapToPosition(coordinates);
  createBoundingBoxElement(coordinates, {color: color});
  $('#bounding-box').tokenfield('setTokens', []);
});

$('#search-route').click(function() {
  var origin      = $('#origin').val();
  var destination = $('#destination').val();
  calcRoute(origin, destination, function(steps) {
    var result = steps.map(function(i) {
      return {
        lat: i.lat(),
        lng: i.lng()
      }
    });

    createRoutesElement(steps, {color: null});
    $('#route-steps').val(JSON.stringify(result));
  });
});