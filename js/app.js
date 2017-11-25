//api vqpH3QwgVVGGcY9RTYorPjP9R5cC9nZKniaSbhtT

document.addEventListener("DOMContentLoaded", function() {
    
    //scroll down
    $("#scroll").on('click', function(e){
        e.preventDefault();
        
      var target = $("#pos1");
      $('html, body').animate({scrollTop: $(target).offset().top}, 1000);
  });
    //scroll to top
    $("#scrollTop").on('click', function(e){
        e.preventDefault();
        
      var target = $("#top");
      $('html, body').animate({scrollTop: $(target).offset().top}, 1000);
  });
  
    //zmiana diva pasek po scrollowaniu
  $(document).on('scroll', function(){ //zmiana diva po scrollowaniu
    var startPosition = 0;
    var afterScrollPosition = $(this).scrollTop();
	    if (afterScrollPosition > startPosition) {
	        $('#pasek1,#pasek2').css({
            'width' :' 80%',
            'background' :'#5200cc' 
          });
	    } else {
	       $('#pasek1,#pasek2').css({
            'width' :' 30%',
            'background' :'#DC3C3C'
           });
	    }
  })
    

 //kod AJAX JSON   //SEKCJA 1
var urlPicOfDay = "https://api.nasa.gov/planetary/apod?api_key=vqpH3QwgVVGGcY9RTYorPjP9R5cC9nZKniaSbhtT";
var urlMars = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=vqpH3QwgVVGGcY9RTYorPjP9R5cC9nZKniaSbhtT";
    
//tworzenie funkcji która wstawi do html dane z jsona
function insertPic(image) {
 
    var div = $('.picOfTheDay');
    var picture = $('<img class="imgMain" src='+image+'>');
    div.append(picture);
}

 //ładowanie danych z pliku json
function loadPic() {
    var $ajax = $.ajax({
        url: urlPicOfDay,
        method: 'GET', //metoda GET, czyli pobierz
        });
    $ajax.done(function(response){
        console.log(response.url);//sprawdzam w konsoli zawartosc obiektu jsona
        insertPic(response.url);
        });
    $ajax.fail(function(err){
        console.log(err);
        })
}
    
//SEKCJA 2
function insertPics(photos) {
        
    var counter = 0;
    var loadMore = $('.loadMore');
    var btn = $('<button>Load more</button>');
    loadMore.append(btn);
        
//wyświetlanie sie pierwszych 6ciu zdjęc
    for(var i = 0; i < 6; i++) {
        var mars = $('.marsPictures');
        var pictures = $('<img class="marsPics" src='+photos[i].img_src+'>');
        mars.append(pictures);
            
            // POP UP
        pictures.on('click', function() {
             var thisImgSrc = $(this).attr("src");
			 var imgDiv = $('<div class="imgDiv">').css({background: "url(" + thisImgSrc + ") no-repeat center", "background-size": "cover"});
			
             var buttonClose = $('<button class="buttonClose">').html("&#10007");
			 var fullScreenElement = $('<div class="fullScreen">');
			 imgDiv.prepend(buttonClose);	
             fullScreenElement.prepend(imgDiv);		
			 $("body").prepend(fullScreenElement);		
			 
            $(".buttonClose").click(function() {
				$(this).parent().parent().remove();
			});
		});  //zamkniecie funkcji pop up
        } //zamkniecie petli for
          
//po 1 kliknieciu pojawia sie kolejne 6 zdjec
        
   var start = 0;
   var all = 6;
   btn.on('click', function(){   
      counter++;
      if(counter === 0) {
         start = start;
         all = all;
     }
     else{
         start = start + 6;
         all = all + 6;
    }    
        
    for(var i = start; i < all; i++) {
        var mars = $('.marsPictures');
        var pictures = $('<img class="marsPics" src='+photos[i].img_src+'>');
        mars.append(pictures);
            
            // POP UP
        pictures.on('click', function() {
                
		var thisImgSrc = $(this).attr("src");
		var imgDiv = $('<div class="imgDiv">').css({background: "url(" + thisImgSrc + ") no-repeat center", "background-size": "cover"});
			
        var buttonClose = $('<button class="buttonClose">').html("&#10007");
		var fullScreenElement = $('<div class="fullScreen">');
		imgDiv.prepend(buttonClose);
			
        fullScreenElement.prepend(imgDiv);
		
		$("body").prepend(fullScreenElement);
			
		$(".buttonClose").click(function() {
		$(this).parent().parent().remove();
        });
        });  //zamkniecie funkcji pop up
    } //zamkniecie petli for
    }) //zamkniecie klikniecia buttona
} //zamkniecie funkcji insert pics

 //ładowanie danych z pliku json
    function loadPics() {
        var $ajax = $.ajax({
            url: urlMars,
            method: 'GET', //metoda GET, czyli pobierz
        });
        $ajax.done(function(response){
           console.log(response.photos[1]);
            console.log(response.photos[0].img_src);//sprawdzam w konsoli zawartosc obiektu jsona
            insertPics(response.photos);
        });
        $ajax.fail(function(err){
            console.log(err);
        })
    }

    loadPic();
    loadPics();
    

		
    
})

