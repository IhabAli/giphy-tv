var showTitle = ['Arrow', 'Game of Thrones', 'The Vampire Diaries', 'The Flash', 'SuperNatural','RiverDale','Greys Anatomy','Stranger Things','Shameless','Westworld','Gotham','Code Black','Lost','Gilmore Girls','This is us','How Its Made','How The Universe Works','Through The Wormhole','Jessica Jones','Luke Cage'];
var currentGif; var pausedGif; var animatedGif; var stillGif;

//buttons
function createButtons(){
	$('#TVBtns').empty();
	for(var i = 0; i < showTitle.length; i++){
		var showBtn = $('<button>').text(showTitle[i]).addClass('showBtn').attr({'data-name': showTitle[i]});
		$('#TVBtns').append(showBtn);
	}

	//gifs on click
	$('.showBtn').on('click', function(){
		$('.display').empty();

		var thisShow = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=tv+show+" + thisShow + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//Animation
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });
$('#addShow').on('click', function(){
	var newShow = $('#newShowInput').val().trim();
	showTitle.push(newShow);
	createButtons();
	return false;
});

createButtons();
