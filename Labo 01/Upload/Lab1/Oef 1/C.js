/**
 * "Reading arguments and parsing" excercise of Lab 1-1.C
 *
 * @author Dwight Van der Velpen
 */

// Variable to work with
var avg = 0;

// Add all arguments as numbers to the variable
for(var i = 0; i < arguments.length; i++){
	avg += parseFloat(arguments[i]);
}

// Calculate the average 
avg /= arguments.length;

// Print the average
print('The average is:');
print(avg);
	