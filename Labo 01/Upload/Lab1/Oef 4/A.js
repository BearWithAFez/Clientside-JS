/**
 * Sprite Constructor excercise of Lab 1-4.A
 *
 * @author Dwight Van der Velpen
 */

(function() {
	'use strict';
	 
	// define sprite constructor
	var Sprite = function(encoded) {
		// encoded
		this.encoded = encoded;

		// grid
		this.grid = [];

		// init function: convert encoded to 2D grid of 1 and 0
		this.init = function() {
			// loop each character
			for (var i = 0; i < this.encoded.length; i++) {
				// get ascii code
				var code = this.encoded[i].charCodeAt(0);

				// XOR 69
				code = code ^ 69;

				// pad zeros
				var row = ('00000000' + code.toString(2));
				row = row.substr(row.length - 7).split('');

				// push row to grid
 				this.grid.push(row);
			}
		}

		// toString function: return string representation
		// using char0 for 0 and char1 for 1, e.g. '░' and '█'
		this.toString = function(char0, char1) {
			// to return
			var returnable = '';

			// loop trough grid line by line
			for (var i = 0; i < this.grid.length; i++) {
				// line characters
				var line = '';
				for (var j = 0; j < this.grid[i].length; j++) {
					//fill in line with the equivalent char
				 	line += (this.grid[i][j] === '1')? char1 : char0;
				 }
				 // add to "to return"
				 returnable += line + '\n';
			}
			return returnable;
		}

		// start init
		this.init();
	}

	// execute
	var sprite = new Sprite('[r959z[');
	print(sprite.toString(' ', '█'));
})();