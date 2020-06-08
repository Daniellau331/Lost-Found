document.getElementById("lafLogo").addEventListener("click", function(){
  window.location.href = "home.html";
});


window.onload = function () {
  var url = decodeURI(document.location.href),
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
  for (var i = 0, l = params.length; i < l; i++) {
       tmp = params[i].split('=');
       data[tmp[0]] = tmp[1];
  }
  console.log(data);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
  let month1 = Number(data.date1.split('-')[1]) - 1;
  let month2 = Number(data.date2.split('-')[1]) - 1;
  let day1 = Number(data.date1.split('-')[2]);
  let day2 = Number(data.date2.split('-')[2]);
  document.getElementById('searchResult').innerHTML = monthNames[month1] + " " + day1 + nth(day1) + " - " + monthNames[month2] + " " + day2 + nth(day2) + ", " + data.category1 + ", " + data.location1;
  
  if (data.type == 'all'){
    loadAll(data);
  }else if (data.type == 'finder') {
    loadFinder(data);
  }else if (data.type == 'seeker') {
    loadSeeker(data);
  }else {
    console.log("Unexpected type");
  }
}

function loadFinder(data) {
  let xhr = new XMLHttpRequest();
  let link_query = "?date1="+data.date1 + "&time1="+data.time1+"&date2="+data.date2 + "&time2="+data.time2+"&category="+data.category1;
  console.log(link_query);
  xhr.open("GET", '/finderGet'+ link_query);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 
  xhr.onloadend = function(e) {
    console.log(xhr.responseText);
    // responseText is a string
    let returnData = JSON.parse(xhr.responseText)[0];
    console.log(returnData);
  }
  xhr.send(null);
}

function loadSeeker(data) {
  let xhr = new XMLHttpRequest();
  let link_query = "?date1="+data.date1 + "&time1="+data.time1+"&date2="+data.date2 + "&time2="+data.time2+"&category="+data.category1;
  console.log(link_query);
  xhr.open("GET", '/seekerGet'+ link_query);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 
  xhr.onloadend = function(e) {
    console.log(xhr.responseText);
    // responseText is a string
    let returnData = JSON.parse(xhr.responseText)[0];
    console.log(returnData);
  }
  xhr.send(null);
}

function loadAll(data) {
  let xhr = new XMLHttpRequest();
  let link_query = "?date1="+data.date1 + "&time1="+data.time1+"&date2="+data.date2 + "&time2="+data.time2+"&category="+data.category1;
  console.log(link_query);
  xhr.open("GET", '/allGet'+ link_query);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); 
  xhr.onloadend = function(e) {
    console.log(xhr.responseText);
    // responseText is a string
    let returnData = JSON.parse(xhr.responseText)[0];
    console.log(returnData);
  }
  xhr.send(null);
}