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
  xhr.open("GET","/sendUploadToAPI");
  console.log("sendUploadToAPI");
  // Add an event listener for when the HTTP response is loaded
  // xhr.addEventListener("load", function() {
  //     if (xhr.status == 200) {  // success
  //       console.log("MESSSSSSAGE"+xhr.responseText);
  //       // showMsg("goodMessage",xhr.responseText);
  //     } else { // failure
  //       // showMsg("badMessage",xhr.responseText);
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
  xhr.send(null);
}



// Auto complete starts
var typeAhead = (function($, window, undefined) {
        var $container = $('.dropdown-menu'),
            $list = $('.dropdown-menu ul'),
            $listItems = $list.find('li'),
            $title = $('.title'),
            $typeahead = $('#js-typeAhead');

        return {
            clearSelectedListItem: function() {
                $('.is-selected').removeClass('is-selected');
            },
            closeMenu: function(el) {
                $(el).closest('.dropdown').toggleClass('closed');
                $container.css('height', 0);
                $list.css( 'top', 30 );
            },
            filterList: function(filterString) {
                var val = new RegExp(filterString, 'gi');

                for(var i=0; i<$listItems.length; i++) {
                    var $item = $($listItems[i]);

                    if( filterString.length > 0 ) {
                        var name = $item.data('name');

                        if( name && !name.match(val)) {
                            $item.addClass('is-hidden');
                        } else {
                            $item.removeClass('is-hidden');
                        }
                        this.selectFirstListItem();
                    } else {
                        $item.removeClass('is-hidden');
                        this.clearSelectedListItem();
                    }
                }
            },
            hideListItem: function($item) {
                $item.addClass('is-hidden');
            },
            openMenu: function(el) {
                $(el).parent().toggleClass('closed');
                $container.css({
                    height: 200
                });
                $('#js-typeAhead').focus();
            },
            selectFirstListItem: function() {
                this.clearSelectedListItem();
                $listItems.not('.is-hidden').eq(0).addClass('is-selected');
            },
            selectListItem: function() {
                $title.html($listItems.filter('.is-selected').html());
                this.closeMenu($list);
            },
            selectListItemAtIndex: function(index) {
                this.clearSelectedListItem();
                $listItems.eq(index).addClass('is-selected');
                this.updateListPosition(index);
            },
            selectNextListItem: function() {
                var index = $listItems.hasClass('is-selected') &&
                            $listItems.filter('.is-selected').index() + 1 ||
                            0;
                this.selectListItemAtIndex(index);
            },
            selectPreviousListItem: function() {
                var index = $listItems.hasClass('is-selected') &&
                            $listItems.filter('.is-selected').index() - 1 ||
                            0;
                this.selectListItemAtIndex(index);
            },
            showListItem: function($item) {
                $item.removeClass('is-hidden');
            },
            updateListPosition: function(index) {
                var rel = $container.outerHeight() - $listItems.eq(index).position().top - 50;

                if( rel < 30 ) {
                    $list.css('top', rel);
                } else if( $list.position().top - $listItems.eq(index).position().top < 30) {
                    $list.css('top', 30)
                }
            },
            registerEvents: function() {
                var self = this;
                $('.dropdown .title').click(function () {
                    if( $container.height() > 0) {
                        self.closeMenu(this);
                    } else {
                        self.openMenu(this);
                    }
                });

                $('.dropdown-menu li').click(function () {
                    if($(this).index() > 0) {
                        $title.html($(this).html());
                        self.closeMenu(this);
                    }
                });


                $typeahead.on('keyup', function(e) {
                    // 40 = down arrow
                    // 38 = up arrow
                    // 8 = backspace
                    if( e.keyCode === 40 ) {
                        self.selectNextListItem();
                    } else if( e.keyCode === 38) {
                        self.selectPreviousListItem();
                    } else if( e.keyCode === 13 ) {
                        self.selectListItem();
                    } else if( e.keyCode >= 65 || e.keyCode === 8 ) {
                        self.filterList( e.target.value );
                    }
                });
            }
        }
    }(jQuery, window, undefined));

    typeAhead.registerEvents();



// Auto complete ends