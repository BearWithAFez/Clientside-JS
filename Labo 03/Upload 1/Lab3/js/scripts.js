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
        var numEmptyCells = document.getElementById('numEmptyCells');
        var btnCheck = document.getElementById('btnCheck');

        btnCheck.addEventListener('click', function(e) {
            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < rows.length; j++) {

                }
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

        var nrCellsToFill = function() {
            return table.querySelectorAll('td:empty').length;
        };

    });
})();