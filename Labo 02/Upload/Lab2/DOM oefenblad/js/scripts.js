/**
 * Clientside Scripting - Labo 02 - DOM
 * @author Dwight Van der Velpen
 *
 **/

;(function() { 
	'use strict';

	// wait till DOM is loaded
	window.addEventListener('load', function() {
		// *********** reeks 1 *************

		// show in alert
		document.getElementById('buttonA').addEventListener('click', function() {
			alert(document.getElementById('textfield1').value);
		});
		// change text
		document.getElementById('buttonB').addEventListener('click', function() {
			document.getElementById('textfield1').value = 'hallo';
		});

		// disable
		document.getElementById('buttonE').addEventListener('click', function() {
			document.getElementById('button1').disabled = true;
		});
		// click
		document.getElementById('buttonF').addEventListener('click', function() {
			document.getElementById('button1').click();
		});

		// check it
		document.getElementById('buttonG').addEventListener('click', function() {
			document.getElementById('checkbox1').checked = true;
		});
		// swap it
		document.getElementById('buttonH').addEventListener('click', function() {
			document.getElementById('checkbox2').checked = !(document.getElementById('checkbox2').checked);
		});

		// Select index 2
		document.getElementById('buttonI').addEventListener('click', function() {
			document.getElementById('select1').selectedIndex = 2;
		});
		// Alert selected
		document.getElementById('buttonJ').addEventListener('click', function() {
			alert(document.getElementById('select1').options[document.getElementById('select1').selectedIndex].text);
		});

		// ******** reeks 2 *************

		// Change Alt
		document.getElementById('buttonK').addEventListener('click', function() {
			document.getElementById('cursus1').alt = 'cursus rietdekken';
		});
		// Swap sources
		document.getElementById('buttonL').addEventListener('click', function() {
			var srcTemp = document.getElementById('cursus1').src;
			document.getElementById('cursus1').src = document.getElementById('cursus2').src;
			document.getElementById('cursus2').src = srcTemp;
		});
		// set Width
		document.getElementById('buttonM').addEventListener('click', function() {
			document.getElementById('cursus2').width = "160";
		});

		// ********** reeks 3 ************

		// Change value?
		document.getElementById('buttonN').addEventListener('click', function() {
			document.getElementById('place1').innerHTML = 'dit is plaats 1';
		});

		// TODO

		// change collor
		document.getElementById('buttonO').addEventListener('click', function() {
			document.getElementById('select1').selectedIndex = 2;
		});
		// Change Class
		document.getElementById('buttonP').addEventListener('click', function() {
			document.getElementById('select1').selectedIndex = 2;
		});
		// Hide 
		document.getElementById('buttonQ').addEventListener('click', function() {
			document.getElementById('select1').selectedIndex = 2;
		});
		// Swap
		document.getElementById('buttonR').addEventListener('click', function() {
			document.getElementById('select1').selectedIndex = 2;
		});
		// Same height?
		document.getElementById('buttonS').addEventListener('click', function() {
			document.getElementById('select1').selectedIndex = 2;
		});

		// ******** reeks 4 ***********

		// also TODO

		// ******** reeks 5 ***********

		// you guessed it, TODO

	});
})();
