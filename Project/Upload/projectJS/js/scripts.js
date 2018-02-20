;
(function($) {
	'use strict'  

	$(document).ready(function() {
		/**** Shortcuts ****/
		var $conversation = $('.main__conversation');
		var $email = $('#newcomment__email');
		var $text = $('#newcomment__text');

		var conversationId = 1;
		var myGiphyApiKey = 'ecXkky3y8otjP6JCvzfzd7ETvHEBS0H4';
		var messages = [];
		var gravatars = [];

		// Empty conversation
		$conversation.empty();      

		// Gravatar fetch
		var updateGravatar = function(data){
			console.log('Fetching gravatars');

			for(var i in data.emails){
				var entry = data.emails[i];
				// Only new gravatars!
				if(gravatars[entry] !== undefined) continue;

				// Create object
				gravatars[entry] = {
					hash: '',
					gravatar: null
				};

				// Create hash
				gravatars[entry].hash = '' + CryptoJS.MD5(entry.toLowerCase().trim());

				// Get gravatar				
				$.ajax({
					url:'https://www.gravatar.com/' + gravatars[entry].hash +'.json',
					type: 'HEAD',
					dataType: 'jsonp',
					hash: gravatars[entry].hash,
					mail: entry,
					error:function(err){
						console.log('Failed to get gravatar...');
						console.log(err);

						// Insert into array
						for(var j in data.emails){
							var x = data.emails[j];
							if(gravatars[x].hash === this.hash) {
								gravatars[x].gravatar = {
									photos: [{value: 'https://www.gravatar.com/avatar/' + this.hash}],
									name: {formatted: this.mail}
								};
								break;
							}
						};
					},
					success:function(fetch){
						// Debug
						console.log(fetch.entry[0].name.formatted + ' successfully loaded!');

						// Insert into array
						gravatars[this.mail].gravatar = fetch.entry[0];
					}
				});
			};
		};

		// Email Validator
		var validateEmail = function(email){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		};

		// Conversation fetcher
		var updateConversation = function(id){
			console.log('Fetching conversation '+id+'...');
			$.ajax({
				url: 'api.php',
				type: 'GET',
				dataType: 'json',
				data: {
					action: 'getconversation',
					conversation_id: id
				},
				success: function(data) {
					console.log('Fetch successfull!');

					updateGravatar(data);

					var afterGravatar = setInterval(function(){
						var gravOk = true;

						// Check if all gravatars are loaded
						for(var grav in gravatars){
							gravOk = gravOk && (gravatars[grav].gravatar !== null);
						}

						// If so, then insert into convo
						if(gravOk) {
							clearInterval(afterGravatar);

							// Create a message for each entry in the convo; and add it to the convo Div
							data.comments.forEach(function(entry) {
								if(messages[entry.id] === undefined){
									$("<div class='comment invisible'><div class='owner'><img src='"+gravatars[entry.email].gravatar.photos[0].value+"' alt='"+entry.email+"' title='"+gravatars[entry.email].gravatar.name.formatted+"'></div><div class='content'>"+entry.text+"</div></div>")
									.appendTo($conversation);							
									messages[entry.id] = entry.text;
								}
							});

							// Show them one by one
							console.log('Making messages visible...')
							var showInterval = setInterval(function(){
								// Shorthand
								var $toShow = $('.comment.invisible');

								// Show it
								$toShow.first().toggleClass('invisible', false);

								// Stop when all are shown
								if($toShow.length === 1) {
									console.log('All messages visible!')
									clearInterval(showInterval);
									// Show end of convo
									$conversation.animate({ scrollTop: $conversation.prop("scrollHeight")}, 3000); 
								}
							}, 250);       

							// Enable Tippy
							tippy('[title]', {
								placement: 'top',
								animation: 'shift-toward',
								interactive: true,
								inertia: true,
								flip: false,
								arrow: true,
								arrowType: 'round'
							});

							// Giphy event
							$('.content').on('dblclick', function(e){
								var selection = '';
								
								// Find selection
								if (window.getSelection) {
									selection = window.getSelection();
								} else if (document.selection) {
									selection = document.selection.createRange();
								}

								if(selection.toString() === '\n') return;

								console.log('Trying Giphy');

								$.ajax({
									url: 'http://api.giphy.com/v1/gifs/search',
									type: 'GET',
									dataType: 'json',
									keyword: selection.toString(),
									data: {
										q: selection.toString(),
										fmt: 'json',
										limit: 3,
										api_key: myGiphyApiKey
									},
									success: function(data) {
										if (data.data.length < 3) return;
										// Edit title
										$('#giphy #title').text('Giphy results for ' + this.keyword + '!');
										// Edit imgs
										$('#giphy img').each(function( index ) {
											$(this).attr('src', data.data[index].images.original.url);
										});
										// Show it
										$.featherlight($('#giphy')).open();
									}
								});
							});
						}
					}, 100);
				},
				error: function(err) {
					console.log('Fetch failed!');
					console.log(err);
				}
			});
		};
		updateConversation(conversationId);

		/**** Add new comment ****/
		$('#newcomment__add').on('click', function(e){
			// Form-checking
			var allOk = false;
			
			var emailOk = validateEmail($email.val().trim().toLowerCase());
			var textOk = $text.val().trim().length !== 0;

			if(emailOk && textOk){
				allOk = true;
			}

			// GUI
			$text.toggleClass('invalid' ,!textOk);
			$email.toggleClass('invalid' ,!emailOk);

			// If okay, ajax call
			if(allOk){
				console.log('Inserting message into Database...');
				$.ajax({
					url: 'api.php',
					type: 'GET',
					dataType: 'json',
					data: {
						action: 'addcomment',
						conversation_id: conversationId,
						email: $email.val().trim(),
						text: $text.val().trim()
					},
					success: function(data) {
						// Debug
						console.log('Insertion successfull!');
						console.log(data);

						// Update convo
						updateConversation(conversationId);
						// Scroll up
						$('html, body').animate({
							scrollTop: $conversation.offset().top - 5
						}, 1000);
						// Empty the Form
						$text.val('');
					},
					error: function(err) {
						// Debug
						console.log('Insertion failed!');
						console.log(err);
					}
				});
			} else {
				// If not, scroll up
				$('html, body').animate({
					scrollTop: $(".main__divider").offset().top
				}, 1000);
			}
		});

		/**** Select gif ****/
		$('#giphy img').on('click', function(e){
			// append it to the conversation
			$("<div class='comment'><div class='owner'></div><div class='content'><img src='"+e.target.currentSrc+"' alt=''></div></div>")
			.appendTo($conversation);
			// Quick and dirty off focus
			$('.featherlight').trigger('click');
		});
	});
})(jQuery);