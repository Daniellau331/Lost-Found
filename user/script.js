document.getElementById("nextBtn").addEventListener("click", function(){
  let firstSearch = document.getElementById("firstSearch");
  let secondSearch = document.getElementById("secondSearch");
  firstSearch.className = "hidden";
  secondSearch.className = "show";
  return false;
});

document.getElementById("searchBar").addEventListener("click", function(){
  let input = document.getElementById("input");
  let search = document.getElementById("search");
  input.className = "hidden";
  search.className = "show";
});

document.getElementById("attachment").addEventListener("change", function(){
  // get the file with the file dialog box
  const selectedFile = document.getElementById("attachment").files[0];
  // store it in a FormData object
  const formData = new FormData();
  formData.append('newImage',selectedFile, selectedFile.name);
  
  // build an HTTP request data structure
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);
  xhr.onloadend = function(e) {
    console.log("POST: upload");
    console.log(xhr.responseText);
    sendGetRequest(selectedFile);
  }
  
  // actually send the request
  xhr.send(formData);
});


// sends an AJAX request asking the server 
function sendGetRequest(selectedFile) {
  let xhr = new XMLHttpRequest;
  // it's a GET request, it goes to URL /seneUploadToAPI
  xhr.open("GET","sendUploadToAPI");
  
  // Add an event listener for when the HTTP response is loaded
  // xhr.addEventListener("load", function() {
  //     if (xhr.status == 200) {  // success
  //       console.log("MESSSSSSAGE"+xhr.responseText);
  //       showMsg("goodMessage",xhr.responseText);
  //     } else { // failure
  //       showMsg("badMessage",xhr.responseText);
  //     }
  // });
  xhr.onloadend = function(e){
    // let newImage = document.querySelector("#cardImg");
    // newImage.src = "http://ecs162.org:3000/images/zroyu/"+selectedFile.name;
    // newImage.style.display = 'block';
    // document.querySelector('.image').classList.remove('upload');
    // document.querySelector('.btn').textContent = 'Replace Image';
  }
  
  // Actually send request to server
  xhr.send();
}