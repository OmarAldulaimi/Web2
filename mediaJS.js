//media kod

window.onload = getImage();
window.onload = getVideo();
window.onload = getAudio();


document.getElementById("selector").addEventListener("change", function(){
    var val = this.value;
    if(val == "photo"){
       $("#fileChooser").attr("accept", "image/*");
    }else if(val == "video"){
        $("#fileChooser").attr("accept", "video/*");
    }else if(val == "audio"){
        $("#fileChooser").attr("accept", "audio/*");
    }
}, false);

document.getElementById("selectorMedia").addEventListener("change", function(){
    var val = this.value;
    if(val == "photo"){
		$(".searchAudio").remove();
		$(".searchVid").remove();
		$("#divVideo").addClass("hidden");
		$("#divAudio").addClass("hidden");
		$("#divImage").removeClass("hidden");
		getImage();
		
    }else if(val == "video"){
		$(".searchPic").remove();
		$(".searchAudio").remove();
		$("#divImage").addClass("hidden");
		$("#divAudio").addClass("hidden");
		$("#divVideo").removeClass("hidden");
		getVideo();
		
    }else if(val == "audio"){
        $(".searchPic").remove();
		$(".searchVid").remove();
		$("#divImage").addClass("hidden");
		$("#divVideo").addClass("hidden");
		$("#divAudio").removeClass("hidden");
		getAudio();
		
    } else if(val == "all"){
		$("#divVideo").removeClass("hidden");
		$("#divImage").removeClass("hidden");
		$("#divAudio").removeClass("hidden");
		getVideo();
		getImage();
		getAudio();
	}
}, false);

$(document).ready(function() {
    $("#myForm").on("submit", function(e){
		
        $("#progressText").text("Laddar upp...");
        e.preventDefault();
        $("#myForm").ajaxSubmit({
            success: function(data) {
				var obj = JSON.parse(data);
                if (obj.success == true){
                    $("#progressText").text(obj.message);
                    $("#myForm").trigger("reset");
                } else {
                    $("#progressText").text("Fel " + obj.message);
                }
            },
            error: function(){
                $("#progressText").text("Fel!!!");
            }
        });
		
    });
});

function getImage(){
	$(".searchPic").remove();
    $.ajax({
        url: "server.php?action=getMedia&type=photo",
        dataType: "JSON"
    }).done(function(data){
        var search = data.files;
        var url =  "http://ddwap.mah.se/af5277/";

        for(file in search){
            var title = search[file].title;
            var photo = search[file].path;
            var clone = $("#searchPicDiv").clone().appendTo("#divImage");
			clone.addClass("searchPic");
            clone.find("h2").text(title);
            clone.find("img").attr("src",url+photo);
			clone.show();
        }

    }).fail(function(data){
    });
};

function getVideo(){
	$(".searchVid").remove();
    $.ajax({
        url: "server.php?action=getMedia&type=video",
        dataType: "JSON"
    }).done(function(data){
        var search = data.files;
        var url =  "http://ddwap.mah.se/af5277/";

        for(file in search){
            var title = search[file].title;
            var video = search[file].path;
            var clone = $("#searchVidDiv").clone().appendTo("#divVideo");
			clone.addClass("searchVid");
            clone.find("h2").text(title);
            clone.find("video").attr("src",url + video);
			clone.show();
        }

    }).fail(function(data){
    });
};

function getAudio(){
	$(".searchAudio").remove();
    $.ajax({
        url: "server.php?action=getMedia&type=audio",
        dataType: "JSON"
    }).done(function(data){
        var search = data.files;
        var url =  "http://ddwap.mah.se/af5277/";

        for(file in search){
            var title = search[file].title;
            var audio = search[file].path;
            var clone = $("#searchAudioDiv").clone().appendTo("#divAudio");
			clone.addClass("searchAudio");
            clone.find("h2").text(title);
            clone.find("audio").attr("src",url + audio);
			clone.show();
        }

    }).fail(function(data){
    });
};