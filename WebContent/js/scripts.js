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
$('#scrollableruban').cycle({
	fx: 'scrollLeft',
	pause: 1,
	prev: '#prevruban',
	next: '#nextruban',
	after: onAfterRuban,
	timeout: 0
});


$('#scrollablechambres').cycle({
	fx: 'scrollLeft',
	pause: 1,
	prev: '#prevchambres',
	next: '#nextchambres',
//	after: onAfterRuban,
	timeout: 0
});

$("#scrollableruban img").tooltip();

function onAfterHome(curr, next, opts) {
	$('.texteimg').fadeOut();
	setTimeout( function() { $('.texte'+next.className).fadeIn(); }, 1000 );
}
$('#carrouselhome').cycle({
	fx: 'fade',
	pause: 1,
	prev: '#prevhome',
	next: '#nexthome',
	after: onAfterHome,
	timeout: 5000
});

$(".dateinput").datepicker({
	showOn: "button",
	buttonImage: "img/datepicker.png",
	buttonImageOnly: true
});