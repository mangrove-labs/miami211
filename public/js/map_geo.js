
var geo;

function geocode(mapboxAccessToken, query){
	return $.ajax({
		url: 'https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(query) + '.json?access_token=' + mapboxAccessToken,
		context: document.body
	}).fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}


$('#geo').on("click", function(event) {
	console.log('gets here?');
	$(this).prop('disabled', true);
	$(this).trigger("geocode:get");
	return false
})

$(document).on("geocode:get", function (event){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var locationMarker = null;
			if (locationMarker){
		 		// return if there is a locationMarker bug
		  		return;
			}
			// sets default position to your position
			lat = position.coords["latitude"];
			lng = position.coords["longitude"];	
			geo = [lat, lng];
			console.log(geo);
			$('input[name=lat]').val( lat );
			$('input[name=lng]').val( lng );

			var MAPBOX_TOKEN = 'pk.eyJ1IjoiZXJuaWVhdGx5ZCIsImEiOiJNcmFnemM0In0.gP2qLay9LMBD1mCyffesMw';
			geocode( MAPBOX_TOKEN, [lng, lat] ).done( function(data){
				$("#address").val( data.features[0].place_name );
				$(event.target).prop('disabled', false);
			} );
				
		},function(error){
			console.log("Error: ", error)
		},{
			enableHighAccuracy: true
		});
	} else {
		geo = null;
	}
});


getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


$(document).on("distance:display", function (event){
	if (event && $(event.target).attr("data-id") && getUrlParameter('lat') && getUrlParameter('lng')) {

		geo = [ parseFloat(getUrlParameter('lat')), parseFloat(getUrlParameter('lng')) ];
		if (geo) {
//			console.log(geo);
			var from = geo;

			var to = [
				parseFloat($(event.target).attr("data-latitude")), 
				parseFloat($(event.target).attr("data-longitude"))];

			var distance = turf.distance(from, to, "miles");
			$(event.target).find('.distance').text( distance.toFixed(2) + ' miles' );
            $(event.target).attr("data-distance", distance.toFixed(2));
		}

	}
});
