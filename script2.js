if (window.innerWidth > 480){
	$('#main-menu').show();
	$("#btn-menu").hide();
}else{
	$('#main-menu').hide();
	$("#btn-menu").show();
}
window.addEventListener("resize", function(){
	if (window.innerWidth > 480){
		$('#main-menu').show();
		$("#btn-menu").hide();
        
	}else{
		$('#main-menu').hide();
		$("#btn-menu").show();
	}
}, true);





$("#btn-search").on("click", function(){
	$("#movie-result").show();
	var movieTitle = ($("input:text").val());
	$.ajax({
		url: "http://www.omdbapi.com/?s=" + movieTitle,
		dataType: "JSON"
	}).done(function(data){
		if (data.Response == "False"){
			var p1 =  $("<p></p>").addClass("text-success").text(data.Error);
			$("#filmList").append(p1);
		} else {
			var movies = data.Search;
				var movieList = $("#filmList");
	movieList.empty();
	for(var i = 0; i < movies.length; i++){
		var h = $("<h></h>").text(movies[i].Title + " - " + movies[i].Year); 
		var li = $("<li></li>").addClass("list-group-item list-group-item-primary"); 
		var p =  $("<p></p>");
		var btn =  $("<button></button>").addClass("btn btn-primary").text("Spara som din favorit film").attr('id', movies[i].Title).click(addToMyFavorite);
		p.append(btn);
		li.append(h);
		li.append(p);
		movieList.append(li);
	}
		}
	}).fail(function(data){
		var p =  $("<p></p>").addClass("text-success").text("Fel!!");
		$("#filmList").append(p);
	});
});
function addToMyFavorite(){
	var movie = $(this).attr('id');
	localStorage.favorite = movie;
	$("#favoriteFilm").text(movie);
}





