// GLOBAL VARs
var coords, map, marker, infowindow;

// DYNAMIC LOAD MAPS API
// https://developers.google.com/maps/documentation/javascript/tutorial#Loading_the_Maps_API
var script = document.createElement("script");

// UNCOMMENT THIS
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCDVK45xZOTksaRZ3eC4lyQjOy5xGsHOzs&callback=initMap";
script.defer = true;
script.async = true;

function initMap() {
  // SET MAP PROPERTIES
  var mapProp = {
    center: new google.maps.LatLng(38.5367859, -121.7553711), // USE USER GPS LOCATION
    zoom: 15 // LARGER IS ZOOM IN
  };

  // INIT MAP
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  marker = new google.maps.Marker();
  marker.setDraggable(true);
  marker.setPosition(map.center);
  marker.setMap(map);

  
  marker.addListener("dragend", function() {
    map.setCenter(marker.getPosition());
  });
}

// Append the 'script' element to 'head'
document.head.appendChild(script);
