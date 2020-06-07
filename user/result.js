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
  let month1 = data.date1.split('-')[1];
  let month2 = data.date2.split('-')[1];
  let day1 = data.date1.split('-')[1];
  let day2 = data.date2.split('-')[1];
  document.getElementById('searchResult').innerHTML = data.date1 + "-" + data.date2 + "," + data.category1 + "," + data.location1;
}