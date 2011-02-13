/* Ruban */
function onAfterRuban(curr, next, opts) {
	var index = opts.currSlide;
	if (index == 0) {
		$('#prevruban').css('visibility', 'hidden');
		$('#nextruban').css('visibility', 'visible');
		opts.fx='scrollLeft';
	}
	else {
		$('#prevruban').css('visibility', 'visible');
		$('#nextruban').css('visibility', 'hidden');
		opts.fx='scrollRight';
	}
}
if ($('#scrollableruban').length) {
	$('#scrollableruban').cycle({
		fx: 'scrollLeft',
		pause: 1,
		prev: '#prevruban',
		next: '#nextruban',
		after: onAfterRuban,
		timeout: 0
	});
}


/* $('#scrollablechambres').cycle({
	fx: 'scrollLeft',
	pause: 1,
	prev: '#prevchambres',
	next: '#nextchambres',
	timeout: 0
}); */

$("#scrollableruban img").tooltip();

function onAfterHome(curr, next, opts) {
	$('.texteimg').fadeOut();
	setTimeout( function() { $('.texte'+next.className).fadeIn(); }, 1000 );
}
if ($('#carrouselhome').length) {
	$('#carrouselhome').cycle({
		fx: 'fade',
		pause: 1,
		prev: '#prevhome',
		next: '#nexthome',
		after: onAfterHome,
		timeout: 5000
	});
}

$(".dateinput").datepicker({
	showOn: "button",
	buttonImage: "img/datepicker.png",
	buttonImageOnly: true
});


/** Carte */
var map;
function initialize() {
	if(jQuery('#map').length){
		var latlng = new google.maps.LatLng(45.439869, 4.389455);
		var myOptions = {
			zoom: 16,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.HYBRID
		};
		map = new google.maps.Map(document.getElementById("map"), myOptions);
		var beachMarker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "Hôtel Ténor**"
		});
	}
}

function itineraireFromHere() {
	var initialLocation;
	
	// Try W3C Geolocation (Preferred)
	if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			itineraire(initialLocation, google.maps.DirectionsTravelMode.DRIVING);
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
	} else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
	
	function handleNoGeolocation(errorFlag) {
		if (errorFlag == true) {
			alert("Le service de géolocalisation a échoué.");
		} else {
			alert("Votre navigateur ne supporte pas la géolocalisation.");
		}
	}
}

function itineraire(origine, voyageMode) {
		alert('Nouvelle map');
		directionsDisplay = new google.maps.DirectionsRenderer();
		var place = new google.maps.LatLng(45.439869, 4.389455);
		var optionsCarte = {
				zoom: 14,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: place
		}
		maCarte = new google.maps.Map(document.getElementById("map"), optionsCarte);
		directionsDisplay.setMap(maCarte);
		var requeteItineraire = {
				origin: origine,
				destination: "Hotel Tenor, Saint-Etienne",
				region: "fr",
				travelMode: voyageMode
		};

		var directionsService = new google.maps.DirectionsService();
		directionsService.route(requeteItineraire, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});
}

$('#station').click(function(){itineraire('Gare Chateaucreux, Saint-Etienne', google.maps.DirectionsTravelMode.WALKING)});
$('#lyon').click(function(){itineraire('Lyon', google.maps.DirectionsTravelMode.DRIVING)});
$('#clermont').click(function(){itineraire('Clermont-Ferrand', google.maps.DirectionsTravelMode.DRIVING)});
$('#here').click(function(){itineraireFromHere();});
$('#mentions').click(function(){$('#mentionslegales').modal({overlayClose:true});});

$('.scrollableruban a').mouseover(function(){ onclick="_gaq.push(['_trackEvent', 'Ruban', 'Une icone']);"});