var counter = 0;
var timeleft = 90

function setup() {
	noCanvas();

	var timer = select('#timer');

	timer.html(timeleft - counter);

	setInterval(timeIt, 1000);

	function timeIr() {
		counter++;
		timer.html(counter);
	}