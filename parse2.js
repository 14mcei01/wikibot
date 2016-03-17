$(document).ready(function(){
	
	var currentdate = new Date();
tracking();
 $( "#search" ).click(function() {
	 
	 var search = document.getElementById("term").value
	 var name ="You";
	 var msg=search;
	 currentdate = new Date();
	 hr = currentdate.getHours();
	 format = "am"
	 if(hr>12){
		 hr = hr -12;
		 format = "pm"
	 }
	 if(hr==00){
		 hr = 12;
	 }
	 var string ="<div class=\"row\"><div class=\"col-lg-12\" ><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"user.png\" height=\"22\" width=\"22\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">"+name+" "+"<span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>"+msg+"</p> </div></div></div></div><hr>";
	  $('#msg').append(string);
	 process();
	  $('#term').val('');
});

$('#term').keyup(function (e) {
	
 var key = e.which;
 if(key == 13)  // the enter key code
  {
	   var search = document.getElementById("term").value
	  var name ="You";
	 var msg=search;
	currentdate = new Date();
	 hr = currentdate.getHours();
	 format = "am"
	 if(hr>12){
		 hr = hr -12;
		 format = "pm"
	 }
	 if(hr==00){
		 hr = 12;
	 }
	 var string ="<div class=\"row\"><div class=\"col-lg-12\" ><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"user.png\" height=\"22\" width=\"22\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">"+name+" "+"<span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>"+msg+"</p> </div></div></div></div><hr>";
	  $('#msg').append(string);
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
	 $('#loadingmessage').show();
	 var search = document.getElementById("term").value
	  search = search.toLowerCase();
	if (~search.indexOf("forecast")){
		func_forcats(search);
	}
	else if(~search.indexOf("pnr")){
		func_pnr(search);
	}
	else{
		func_search(search);
		
	}	 
}

function func_search(){
	
	var search = arguments[0];
	
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
				var string = "<div class=\"row\" style=\"float:right\"> <div class=\"col-lg-13\"><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"sad.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Wiki <span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>Sorry, i was unable to find that. Try providing more information</p></div></div></div></div><hr>";
				$('#msg').append(string);
				$('#msg').focus().val($('#msg'));
			}else{
				var string = "<div class=\"row\"> <div class=\"col-lg-13\" ><div class=\"media\"  ><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"robot.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Wiki <span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>"+blurb.text()+"</p></div></div></div></div><hr>";
				$('#msg').append(string);
				$('#msg').focus().val($('#msg'));
			}
            
        },
        error: function(jqXHR, exception) {
			alert("hwe");
			var string = "<div class=\"row\"> <div class=\"col-lg-13\"><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"angry.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Wiki <span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>uuhh!! This internet !! I tell you, I gonna Kill him.</p></div></div></div></div><hr>";
				$('#msg').append(string);
				$('#msg').focus().val($('#msg'));
        },
		complete : function(){
			  $('#loadingmessage').hide(); 
		},
    });
}

function func_forcats(){
	
	var city = arguments[0].split(" ");;
	
	 $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q="+city[1]+"&appid=e5471cc3f2f4dd55c3dccf8531037468&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
			
			var  status = "Status : "+data.weather[0].main;
			var  temp_curr = "Current Temprature : "+parseFloat(data.main.temp - 273.15).toFixed(2) +"&deg Celcius";
			var temp_min = "Minimum Temprature : "+(data.main.temp_min - 273.15) + "&deg Celcius";
			var temp_max = "Maximum Temprature : "+(data.main.temp_max - 273.15) + "&deg Celcius";
			var clouds = "Cloudiness :"+(data.clouds.all)+" %";
			var text_msg = status+" <br>"+temp_curr+"<br>"+clouds;//+"<br>"+temp_min+"<br>"+temp_max;
			 var wiki_str = "<div class=\"row\"> <div class=\"col-lg-13\" ><div class=\"media\"  ><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"robot.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Wiki <span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>"+text_msg+"</p></div></div></div></div><hr>";
			$('#msg').append(wiki_str);
			
		},
		error: function(jqXHR, exception) {
			alert("hwe");
			var string = "<div class=\"row\"> <div class=\"col-lg-13\"><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"angry.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Wiki <span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>uuhh!! This internet !! I tell you, I gonna Kill him.</p></div></div></div></div><hr>";
				$('#msg').append(string);
				$('#msg').focus().val($('#msg'));
        },
		complete : function(){
			  $('#loadingmessage').hide(); 
		},
    });
}

function func_pnr(){
	var pnr = arguments[0].split(" ");
	
	$.ajax({
        type: "GET",
        url: "http://api.railwayapi.com/pnr_status/pnr/"+pnr[1]+"/apikey/ndkab3924/",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
			
			var  train_name = "Train Name : "+data.train_name;
			var  tarin_no = "Train No : "+data.train_num;
			var pnr_no = "Pnr : "+data.pnr;
			var chart_status = "Chart Prepared : "+data.chart_prepared;
			var passenger_pnr_status = "";
			 for(var i=0;i<data.passengers.length;i++){
				 passenger_pnr_status = passenger_pnr_status + "Pasenger "+(i+1)+" : "+data.passengers.current_status +" <br>";
			 }
			
			//var clouds = "Cloudiness :"+(data.clouds.all)+" %";
			var text_msg = train_name+" <br>"+tarin_no+"<br>"+pnr_no+"<br>"+chart_status+"<br>"+passenger_pnr_status;
			 var wiki_str = "<div class=\"row\"> <div class=\"col-lg-13\" ><div class=\"media\"  ><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"robot.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Rail Bot <span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>"+text_msg+"</p></div></div></div></div><hr>";
			$('#msg').append(wiki_str);
			console.log(data);
		},
		error: function(jqXHR, exception) {
			
			var string = "<div class=\"row\"> <div class=\"col-lg-13\"><div class=\"media\"><a class=\"pull-left\" href=\"#\"><img class=\"media-object img-circle\" src=\"angry.png\" height=\"32\" width=\"32\" alt=\"\"></a><div class=\"media-body\"><h4 class=\"media-heading\">Wiki <span class=\"small pull-right\">"+hr + ":" + currentdate.getMinutes() +":"+format+"</span></h4><p>uuhh!! This IRCTC wale !! I tell you, I gonna Kill them.</p></div></div></div></div><hr>";
				$('#msg').append(string);
				$('#msg').focus().val($('#msg'));
        },
		complete : function(){
			  $('#loadingmessage').hide(); 
		},
    });
}
function tracking(){
	 $.ajax({
        type: "GET",
        url: "http://easysecure.blogspot.in",
		async: false,
		success: function(data){
      alert("hi");
   }
});
