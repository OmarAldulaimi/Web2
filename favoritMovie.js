
if (localStorage.getItem("favorite")!= null){
	$("#favoriteFilm").text(localStorage.getItem("favorite"));
}

$("#btn-menu").on("click", function(){
	if ($('#main-menu').css('display') == 'none') {
		$('#main-menu').show();
	} else {
		$('#main-menu').hide();
	}
});