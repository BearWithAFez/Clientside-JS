/**
 * Clientside Scripting - Labo 03 - DOM
 * @author Dwight Van der Velpen
 *
 **/

;
(function() {
	'use strict';

	// wait till DOM is loaded
	window.addEventListener('load', function() {
		// Shortcuts
		var table = document.getElementById('sudoku');
		var rows = table.querySelectorAll('tr');
		var cells = table.querySelectorAll('td');
		var x = table.querySelectorAll('td.invalid').length;
		var numEmptyCells = document.getElementById('numEmptyCells');
		var btnCheck = document.getElementById('btnCheck');

		btnCheck.addEventListener('click', function(e) {
			// result container
			var hor_status = [];
			var ver_status = [];

			// Reset all cell classnames.            
			for (var i = 0; i < cells.length; i++) {
				cells[i].classList.remove('invalid');
			}

			// Rule checking
			var horCntZero, horCntOne, horStrkZero, horStrkOne, verCntZero, verCntOne, verStrkZero, verStrkOne;
			horCntZero = horCntOne = horStrkZero = horStrkOne = verCntZero = verCntOne = verStrkZero = verStrkOne = 0;

			for (var i = 0; i < cells.length + 1; i++) {
				// Over-Complicating shit. (vertical jmping)
				var j = ((i * rows.length) % cells.length) + parseInt((i * rows.length) / cells.length);

				// new line
				if (i % rows.length === 0) {
					// Count detection Hor & Ver
					if ((horCntZero !== rows.length / 2) && (horCntOne + horCntZero === rows.length)) hor_status[parseInt(i / rows.length) - 1] = false;
					if ((verCntZero !== rows.length / 2) && (verCntOne + verCntZero === rows.length)) ver_status[parseInt(i / rows.length) - 1] = false;
					if (i === cells.length) break;
					// reset
					horCntZero = horCntOne = horStrkZero = horStrkOne = verCntZero = verCntOne = verStrkZero = verStrkOne = 0;
				}

				// val check (hor)
				if (cells[i].innerHTML === '1') {
					horCntOne++;
					horStrkOne++;
					horStrkZero = 0;
				} else if (cells[i].innerHTML === '0') {
					horCntZero++;
					horStrkZero++;
					horStrkOne = 0;
				} else {
					horStrkZero = horStrkOne = 0;
				}

				// val check (ver)
				if (cells[j].innerHTML === '1') {
					verCntOne++;
					verStrkOne++;
					verStrkZero = 0;
				} else if (cells[j].innerHTML === '0') {
					verCntZero++;
					verStrkZero++;
					verStrkOne = 0;
				} else {
					verStrkZero = verStrkOne = 0;
				}

				// Streak detection
				if (horStrkOne === rows.length / 2 || horStrkZero === rows.length / 2) hor_status[parseInt(i / rows.length)] = true;
				if (verStrkOne === rows.length / 2 || verStrkZero === rows.length / 2) ver_status[parseInt(i / rows.length)] = true;
			}

			// setting invalid
			for (var i = 0; i < hor_status.length; i++) {
				// Undefined entry ==> skip!
				if (hor_status[i] === undefined) continue;

				for (var j = 0; j < rows.length; j++) cells[j + i * 6].classList.add('invalid');
			}

			for (var i = 0; i < ver_status.length; i++) {
				// Undefined entry ==> skip!
				if (ver_status[i] === undefined) continue;
				for (var j = 0; j < rows.length; j++) cells[i + j * 6].classList.add('invalid');
			}

			// Endgame?
			if ((nrCellsInvalid() === 0) && (nrCellsToFill() === 0)) {
				for (var i = 0; i < cells.length; i++) cells[i].contentEditable = false;
				table.style.backgroundColor = 'lightgreen';
				btnCheck.disabled = true;
				alert('You did it! Sudoku complete!!');
			}
		});

		// Event: try to fill in the sudoku
		table.addEventListener('keyup', function(e) {
			// Freeze!
			e.stopPropagation();
			e.preventDefault();

			// Input checking
			if (e.key === '0' || e.key === '1') {
				e.target.innerHTML = e.key;
				e.target.blur();
			} else {
				e.target.innerHTML = '';
			}

			// Edit to fill in Cells
			numEmptyCells.innerHTML = nrCellsToFill();
		});

		var nrCellsInvalid = function() {
			return table.querySelectorAll('td.invalid').length;
		};

		var nrCellsToFill = function() {
			return table.querySelectorAll('td:empty').length;
		};
	});
})();