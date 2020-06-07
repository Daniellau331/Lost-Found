// GLOBAL VARs
var coords, map, map2 marker;

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
  map = new google.maps.Map(document.getElementsById("googleMap"), mapProp);
  map2 = new google.maps.Map(document.getElementsById("googleMap2"), mapProp);
  
  marker = new google.maps.Marker();
  marker.setDraggable(true);
  marker.setPosition(map.center);
  marker.setMap(map);

  
  marker.addListener("dragend", function() {
    map.setCenter(marker.getPosition());
    let url = "/getAddress?lat=" + marker.getPosition().lat() + "&lng=" + marker.getPosition().lng();
    // console.log(marker.getPosition().lat());
    // console.log(marker.getPosition().lng());
    // console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      document.getElementsByClassName('location').value = data.results[0].formatted_address;
    })
  });
};


function search(){
  let url = "/searchAddress?input=" + document.getElementsByClassName('location').value + ",Davis";
  fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      document.getElementsByClassName('location').value = data.candidates[0].formatted_address;
      marker.setPosition(data.candidates[0].geometry.location);
      map.setCenter(marker.getPosition(data.candidates[0].geometry.location));
    })
}


const search_bar = document.getElementById('location');

search_bar.addEventListener('change',search);

// Append the 'script' element to 'head'
document.head.appendChild(script);
