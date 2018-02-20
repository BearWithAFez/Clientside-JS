/*
 * Sudoku script
 * Self invoking function version
 *
 * @author Rogier van der Linde <rogier.vanderlinde@odisee.be>
 */

 // encapsulate script
 (function(id) {
 	'use strict';

	// variables
	var table;
	var rows;
	var allcells;

	// sanatize cell value
    var setValue = function(cell) {
		var newVal = parseInt(cell.textContent, 10);
		if (isNaN(newVal) || newVal < 1 || newVal > 9) newVal = '';
		cell.textContent = newVal;
    };

    // check the board for errors and adjust numbers
    var checkBoard = function() {
    	// remove all cell errors
		for (var i = 0; i < allcells.length; i++) {
			allcells[i].classList.remove('invalid');						
		}

		// check rows
    	var numRows = rows.length;
		for (var i = 0; i < numRows; i++) {
			// get row cells
			var rowcells = rows[i].querySelectorAll('td');

			// check row
			for (var j = 0; j < rowcells.length; j++) {
				// get cell 1
				var cell1 = rowcells[j];

				// ignore empty cells
				if (cell1.textContent == '') continue;

				// test next cells in the same row
				for (var k = j + 1; k < rowcells.length; k++) {
					// get cell 2
					var cell2 = rowcells[k];

					// same value?
					if (cell1.textContent == cell2.textContent) {
						cell1.className = 'invalid';
						cell2.className = 'invalid';
					}
				}

			}
		}

		// check columns
    	var numCols = rows[0].querySelectorAll('td').length;
		for (var i = 0; i < numCols; i++) {
			// get col cells
			var colcells = table.querySelectorAll('td:nth-of-type(' + (i + 1) + ')');

			// check column
			for (var j = 0; j < colcells.length; j++) {
				// get cell 1
				var cell1 = colcells[j];

				// ignore empty cells
				if (cell1.textContent == '') continue;

				// test next cells in the same row
				for (var k = j + 1; k < colcells.length; k++) {
					// get cell 2
					var cell2 = colcells[k];

					// same value?
					if (cell1.textContent == cell2.textContent) {
						cell1.className = 'invalid';
						cell2.className = 'invalid';
					}
				}

			}
		}

		// TODO: check cubes
		// ...


		// adjust number of empty cells
		var numEmptyCells = 0;
		for (var i = 0; i < allcells.length; i++) {
			if (allcells[i].textContent === '') numEmptyCells++;
		}
		document.querySelector('#numEmptyCells').textContent = numEmptyCells;

		// adjust number of errors
		var numErrors = table.querySelectorAll('td.invalid').length;
		document.querySelector('#numErrors').textContent = numErrors;

		// done?
		if (numEmptyCells === 0 && numErrors === 0) {
			for (var i = 0; i < allcells.length; i++) {
				allcells[i].removeAttribute('contenteditable');
			}
			querySelector('#numErrors').textContent = 'Gefeliciteerd!';
		}
    };

    // bind all events
    window.addEventListener('load', function() {
    	// init vars
		table = document.querySelector('#' + id);
		rows = table.querySelectorAll('tr');
		allcells = table.querySelectorAll('td');

		// listen to cell value changes
		table.addEventListener('keyup', function(e) {
			// cell edited
			var cell = e.target;
			setValue(cell);

			// blur unless delete or backspace was pressed
			if (e.keyCode != 8 && e.keyCode != 46) {
				cell.blur();
			}

			// check the board
			checkBoard();

			// prevent any default action
			e.preventDefault();
			e.stopPropagation();
		});

    });

})('gameboard');