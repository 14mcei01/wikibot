$(document).ready(function(){
	
 $( "#search" ).click(function() {
	 process();
	  $('#term').val('');
});

$('#term').keyup(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
   process();
   $('#term').val('');
  }
});   
 $( "#clear" ).click(function() {
	
	  $('#msg').html("");
});
 $( "#about" ).click(function() {
	alert("Hi i am Wiki Bot your friend, currently i am in beta mode. I can help you to find answers to your question using wikipedia!! Isn't that cool !!");
});
$( "#help" ).click(function() {
	alert("Just Type your query in chatbox below and you are ready to go !!");
});
function process(){
	var search = document.getElementById("term").value
	 var name ="You";
	 var msg=search;
	 var currentdate = new Date();
	 var hr = currentdate.getHours();
	 var format = "am"
	 if(hr>12){
		 hr = hr -12;
		 format = "pm"
	 }
	 var string ="<div class=\"row\"><div class=\"col-lg-12\"><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"user.png\" height=\"22\" width=\"22\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">"+name+"<span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>"+msg+"</p> </div></div></div></div><hr>";
	  $('#msg').append(string);
	 search = search.toLowerCase().replace(/\b[a-z]/g, function(letter) {
     return letter.toUpperCase();
     });
	 search = search.replace(" ", "+");
	 
	
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&rvprop=content&titles="+search+"&callback=?&redirects=1",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
			
            var markup = data.query.pages;
		
			var mar = Object.keys(markup)[0];
			// var markup = data.query.pages.mars;
		
			var ans = markup[mar]
			console.log(ans)
            var blurb = $('<div></div>').html(ans['extract']);
 
            // remove links as they will not work
            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
 
            // remove any references
            blurb.find('sup').remove();
 
            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
			name = "Wiki";
		console.log(blurb);
			if(mar==-1){
				var string = "<div class=\"row\"> <div class=\"col-lg-13\"><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"sad.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Wiki<span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>Sorry, i was unable to find that. Try providing more information</p></div></div></div></div><hr>";
				$('#msg').append(string);
				$('#msg').focus().val($('#msg'));
			}else{
				var string = "<div class=\"row\"> <div class=\"col-lg-13\"><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"robot.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Wiki<span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>"+blurb.text()+"</p></div></div></div></div><hr>";
				$('#msg').append(string);
				$('#msg').focus().val($('#msg'));
			}
            
        },
        error: function (errorMessage) {
        }
    });
}
});

