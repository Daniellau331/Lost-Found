// GLOBAL VARs
var coords, map, map2, myMarker, myMarker2;

// DYNAMIC LOAD MAPS API
// https://developers.google.com/maps/documentation/javascript/tutorial#Loading_the_Maps_API
var script = document.createElement("script");

// UNCOMMENT THIS
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCDVK45xZOTksaRZ3eC4lyQjOy5xGsHOzs&callback=initMap";
script.defer = true;
script.async = true;

function initMap() {
  var myLatlng = new google.maps.LatLng(38.5367859,-121.7553711);
  // SET MAP PROPERTIES
  var mapProp = {
    center: myLatlng,
    // center: new google.maps.LatLng(38.5367859, -121.7553711), // USE USER GPS LOCATION
    zoom: 15 // LARGER IS ZOOM IN
  };

  // INIT MAP
  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  map2 = new google.maps.Map(document.getElementById("googleMap2"), mapProp);

  myMarker = new google.maps.Marker({
    position: myLatlng,   
  });

  myMarker2 = new google.maps.Marker({
    position: myLatlng,
  });

  myMarker.setDraggable(true);
  myMarker.setPosition(map.center);
  myMarker.setMap(map);

  myMarker2.setDraggable(true);
  myMarker2.setPosition(map2.center);
  myMarker2.setMap(map2);

  myMarker.addListener("dragend", function() {
    map.setCenter(myMarker.getPosition());
    let url =
      "/getAddress?lat=" +
      myMarker.getPosition().lat() +
      "&lng=" +
      myMarker.getPosition().lng();
    // console.log(marker.getPosition().lat());
    // console.log(marker.getPosition().lng());
    // console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        document.getElementById("location").value =
          data.results[0].formatted_address;
      });
  });
  
  
}

function search() {
  let url =
    "/searchAddress?input=" +
    document.getElementsByClassName("location").value +
    ",Davis";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById("location").value =
        data.candidates[0].formatted_address;
      marker.setPosition(data.candidates[0].geometry.location);
      map.setCenter(marker.getPosition(data.candidates[0].geometry.location));
    });
}

const search_bar1 = document.getElementById("location");

search_bar1.addEventListener("change", search);

// Append the 'script' element to 'head'
document.head.appendChild(script);
