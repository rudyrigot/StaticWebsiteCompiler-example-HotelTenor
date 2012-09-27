function NewWindowTop(mypage, myname, width, height, scroll, centrerad, x, y, resize, serch_value) {

// mypage : url till html sidan som ska visas i java fönstret
// myname : namnet på fönstret
// width : fönstrets bred
// height : fönstrets höjd
// scroll : om det ska vara scroll i fönstret (no - yes)
// centrerad : ska fönstret vara centrerat på skärmen (no - yes)
// x : om inte centrerat, hur långt från högra kanten på skärmen
// y : om inte centrerat, hur långt från långt ner från toppen av skärmen
// resize : om det ska vara resizable i fönstret (no - yes)
// serch_value när man vill skicka parametarr tille ett php eller annat cgi script
if (centrerad == 'no') {
  var wint = y;
  var winl = x;
} else {
  var winl = (screen.width - width) / 2;
  var wint = (screen.height - height) / 2;
}
winprops = 'height='+height+',width='+width+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable='+resize
//win = window.open(mypage+'?searchvalue='+serch_value, myname, winprops)
win = window.open(mypage, myname, winprops)
if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}	
