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
  const selectedFile = document.querySelector('#imgUpload').files[0];
  // store it in a FormData object
  const formData = new FormData();
  formData.append('newImage',selectedFile, selectedFile.name);
  
  // build an HTTP request data structure
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    xhr.onloadend = function(e) {
      
    // let newImage = document.querySelector("#cardImg");
      // newImage.src = "https://quickest-like-attraction.glitch.me/images/"+selectedFile.name;
      // newImage.style.display = 'block';
      // document.querySelector('.image').classList.remove('upload');
      // document.querySelector('.btn').textContent = 'Replace Image';
      // sendGetRequest(selectedFile);
  }
  
  // actually send the request
  xhr.send(formData);
  
});
