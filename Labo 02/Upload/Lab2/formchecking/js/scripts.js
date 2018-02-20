/*
 * Main scripts
 *
 * @author Rogier van der Linde <rogier@bitmatters.be>
 */

;(function() { 
	'use strict';

	// wait till DOM is loaded
	window.addEventListener('load', function() {
		// add novalidate to form
		document.getElementById('form1').setAttribute('novalidate', 'novalidate');

		// intercept document submit
		document.getElementById('form1').addEventListener('submit', function(e) {
			// halt event
			e.preventDefault();
			e.stopPropagation();

			// form checking
			var allOk = true;

			// error messages shortcuts
			var errStreet = document.getElementById('errStreet');
			var errZip = document.getElementById('errZip');
			var errCity = document.getElementById('errCity');
			var errName = document.getElementById('errName');
			var errCountry = document.getElementById('errCountry');
			var errInterests = document.getElementById('errInterests');
			var errShare = document.getElementById('errShare');

			// input shortcuts
			var qstStreet = document.getElementById('qstStreet');
			var qstZip = document.getElementById('qstZip');
			var qstCity = document.getElementById('qstCity');
			var qstName = document.getElementById('qstName');
			var qstCountry = document.getElementById('qstCountry');var cbxsInterests = document.querySelectorAll('.qstn7 .label--checkbox input[type="checkbox"]');
			var checkedCbxsInterests = document.querySelectorAll('.qstn7 .label--checkbox input[type="checkbox"]:checked');
			// ****
			var qstEmail = document.getElementById('qstEmail');
			var rdbtnsShare = document.querySelectorAll('.qstn8 .label--radio input[type="radio"]');
			var checkedRdbtnsShare = document.querySelectorAll('.qstn8 .label--radio input[type="radio"]:checked');

			// hide all error messages
			var errMessages = document.querySelectorAll('.message--error');
			for (var i = 0; i < errMessages.length; i++) {
				errMessages[i].style.display = 'none';
			}

			// check street and number
			if (qstStreet.value == '') {
				qstStreet.className = qstStreet.className.replace(/\bvalid\b/,'') + " invalid";
				allOk = false;
				errStreet.innerHTML = 'gelieve een straat en nummer in te vullen';	
				errStreet.style.display = 'block';		
			} else {
				qstStreet.className = qstStreet.className.replace(/\binvalid\b/,'') + " valid";
			}

			// check zip
			if (qstZip.value == '') {
				allOk = false;
				qstZip.className = qstZip.className.replace(/\bvalid\b/,'') + " invalid";
				errZip.innerHTML = 'gelieve een postcode in te vullen';	
				errZip.style.display = 'block';			
			} else {
				qstZip.className = qstZip.className.replace(/\binvalid\b/,'') + " valid";
			}

			// check name
			if (qstName.value == '') {
				allOk = false;
				qstName.className = qstName.className.replace(/\bvalid\b/,'') + " invalid";
				errName.innerHTML = 'gelieve een naam in te vullen';	
				errName.style.display = 'block';			
			} else {
				qstName.className = qstName.className.replace(/\binvalid\b/,'') + " valid";
			}

			// check city
			if (qstCity.value == '') {
				allOk = false;
				qstCity.className = qstCity.className.replace(/\bvalid\b/,'') + " invalid";
				errCity.innerHTML = 'gelieve een gemeente in te vullen';	
				errCity.style.display = 'block';			
			} else {
				qstCity.className = qstCity.className.replace(/\binvalid\b/,'') + " valid";
			}

			// check country
			if (qstCountry.selectedIndex == 0) {
				allOk = false;
				qstCountry.className = qstCountry.className.replace(/\bvalid\b/,'') + " invalid";
				errCountry.innerHTML = 'gelieve een Land in te vullen';	
				errCountry.style.display = 'block';			
			} else {
				qstCountry.className = qstCountry.className.replace(/\binvalid\b/,'') + " valid";
			}

			// Check interests
			// reset checkboxes
			for (i = 0; i < cbxsInterests.length; ++i) {
				cbxsInterests[i].className = cbxsInterests[i].className.replace(/\binvalid\b/,'');
				cbxsInterests[i].className = cbxsInterests[i].className.replace(/\bvalid\b/,'');	
			}
			if(checkedCbxsInterests.length < 2){
				allOk = false;
				errInterests.innerHTML = 'gelieve 2 of meer interesses te selecteren';	
				errInterests.style.display = 'block';
				for (i = 0; i < 2; ++i) {
  					cbxsInterests[i].className = cbxsInterests[i].className.replace(/\bvalid\b/,'') + " invalid";
  				}
			}
			for (i = 0; i < checkedCbxsInterests.length; ++i) {
				checkedCbxsInterests[i].className = checkedCbxsInterests[i].className.replace(/\binvalid\b/,'') + " valid";
			}

			// draw conclusion
			if (allOk) {
				// show thank you				
				document.getElementById('form1').style.display = "none";
				document.getElementById('thankyou').style.display = "block";				
			} else {
				// show summary
				window.scrollTo(0, 0);
				document.getElementById('summary').style.display = "block";
			}

		});

		// ****** 1 ****** show extra text field
		document.getElementById('qstInterests_other').addEventListener('click', function(e){
			document.getElementById('qstInterests_inp_other').style.display = (document.getElementById('qstInterests_other').checked) ? "block" : "none";			
		});
	});

})();	
