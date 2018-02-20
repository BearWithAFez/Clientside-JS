/**
 * Creating couples excercise of Lab 1-2.B
 *
 * @author Dwight Van der Velpen
 */
 
(function() {
	'use strict';
	 var Astrid = {
		name: 'Astrid Galli',
		balance: 2500,
		friends: ['Bilal Azzouti', 'Crista Bracke', 'Duncan Van Reck']
	};

	var Bilal = {
		name: 'Bilal Azzouti',
		balance: 3000,
		friends: ['An Cornelis', 'Duncan Van Reck']
	};

	var Claude = {
		name: 'Claude Chen',
		balance: -300,
		friends: ['Erwin Smith', 'Astrid Galli', 'Francis Alys']
	};

	var createCouple = function(personA, personB){
		// create a new container with both friend arrays
		var newFriends = personA.friends;
		newFriends = newFriends.concat(personB.friends);

		// filter out duplicates
		newFriends = newFriends.filter(function(item, pos) {
			return newFriends.indexOf(item) == pos;
		});

		// filter out own names
		newFriends = newFriends.filter(function(item, pos) {
			return (item !== personA.name && item !== personB.name);
		});

		// create a new container
		var newPerson = {
			name: personA.name  + ' & ' + personB.name,
			balance: personA.balance + personB.balance,
			friends: newFriends
		};
        
		return newPerson;
	};

	var a = createCouple(Astrid, Bilal);
	print(a.name);
	print(a.balance);
	print(a.friends);
})();