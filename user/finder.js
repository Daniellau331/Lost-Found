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