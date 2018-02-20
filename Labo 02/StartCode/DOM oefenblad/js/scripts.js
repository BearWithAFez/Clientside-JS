/**
 * Clientside Scripting - Labo 02 - DOM
 * @author Rogier van der Linde <rogier.vanderlinde@odisee.be>
 *
 **/

;(function() { 
	'use strict';

	// wait till DOM is loaded
	window.addEventListener('load', function() {
		// reeks 1
		document.getElementById('buttonA').addEventListener('click', function() {
			console.log(document.getElementById('textfield1').value);
		});
		document.getElementById('buttonB').addEventListener('click', function() {
			document.getElementById('textfield1').value = 'hallo';
		});

		// reeks 2

		// reeks 3

		// reeks 4

	});
})();
