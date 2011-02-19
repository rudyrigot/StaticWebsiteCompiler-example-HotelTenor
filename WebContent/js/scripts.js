/* Vidage/re-remplissage de l'input date */

function vider(input_text, msg){
	if (input_text.val() == msg) {
		input_text.val('');
	}
}
function remplir(input_text, msg){
	if (input_text.val()=='' || input_text.val()==msg){
		input_text.val(msg);
	}
}

$('.date input').focus(function(){vider($(this), 'JJ/MM/AAAA');});
$('.date input').blur(function(){remplir($(this), 'JJ/MM/AAAA');});

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


if ($('#scrollablechambres').length) {
	$('#scrollablechambres').cycle({
		fx: 'scrollLeft',
		pause: 1,
	/*	prev: '#prevchambres',
		next: '#nextchambres', */
		timeout: 10000
	});
}

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

$('.scrollableruban a').mouseover(function(){ onclick="_gaq.push(['_trackEvent', 'Ruban', 'Une icone']);"});

/* ouverture de la modal des mentions legales */
$('#mentions').click(function(){$.modal(
		'<h2>Mentions l&eacute;gales</h2>'+
		'<h3>Informations légales concernant l\'hôtel :</h3>'+
		'<ul>'+
			'<li>Dénomination ou raison sociale : EURL EDITORIAL</li>'+
			'<li>Adresse siège sociale : 12 rue Blanqui 42000 ST ETIENNE</li>'+
			'<li>N° de tel : 04 77 33 79 88</li>'+
			'<li>N° inscription RCS : 381 481 167</li>'+
			'<li>Capital social : 7 774,90 €</li>'+
			'<li>Nom du responsable légal : M. Jean-Louis DESJOYAUX</li>'+
			'<li>Nom du responsable de la rédaction : Mme Annie Meunier</li>'+
		'</ul>'+
		'<h3>Info concernant notre hébergeur, à savoir AMEN</h3>'+
		'<ul>'+
			'<li>Agence des Médias Numérique (AMEN)</li>'+
			'<li>12-14 Rond Point des Champs Elysées - 75008 PARIS</li>'+
			'<li>0892 55 66 77</li>'+
		'</ul>'+
		'<h3>&Eacute;quipe de r&eacute;alisation du site</h3>'+
		'<ul>'+
			'<li><strong>Webdesign, direction artistique&nbsp;:</strong> <a target="_blank" href="http://fr.linkedin.com/pub/sophie-taboni/12/a41/b62" onclick="_gaq.push([\'_trackEvent\', \'Footer\', \'Sophie\']);">Sophie Taboni</a></li>'+
			'<li><strong>Ma&icirc;trise d\'oeuvre, r&eacute;alisation technique&nbsp;:</strong> <a target="_blank" href="http://fr.linkedin.com/in/rudyrigot" onclick="_gaq.push([\'_trackEvent\', \'Footer\', \'Rudy\']);">Rudy Rigot</a></li>'+
			'<li><strong>Ma&icirc;trise d\'ouvrage&nbsp;:</strong> la fabuleuse &eacute;quipe de r&eacute;ception de l\'H&ocirc;tel T&eacute;nor !</li>'+
		'</ul>'+
		'Les visites virtuelles ont pu &ecirc;tre utilis&eacute;es avec la tr&egrave;s aimable autorisation et le professionalisme de <a target="_blank" href="http://www.fredelnet.com/portail/index.php" onclick="_gaq.push([\'_trackEvent\', \'Footer\', \'Fredel\']);">Fredel Multim&eacute;dia</a>.',
		{overlayClose:true});});