$(document).on("ready", function(){
	var mymap = L.map('search-map').setView([25.7617, -80.1918], 12);

	$(window).on("resize", function () { 
		$("#search-map").height($(window).height());
		mymap.invalidateSize();
	}).trigger("resize");

	$("#search-map").height($(window).height());
	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXJuaWVhdGx5ZCIsImEiOiJNcmFnemM0In0.gP2qLay9LMBD1mCyffesMw', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'your.mapbox.project.id',
	    accessToken: 'pk.eyJ1IjoiZXJuaWVhdGx5ZCIsImEiOiJNcmFnemM0In0.gP2qLay9LMBD1mCyffesMw'
	}).addTo(mymap);

});