document.getElementById("nextBtn").addEventListener("click", function(){
  let firstSearch = document.getElementById("firstSearch");
  let secondSearch = document.getElementById("secondSearch");
  firstSearch.className = "hidden";
  secondSearch.className = "show";
  return false;
});